/**Created by the LayaAirIDE*/
module view.compart {
	export class JuQingTitleItem extends ui.compart.JuQingTitleItemUI {
		constructor() {
			super();
		}
		public dataItem;
		/**
		 * 
		 * @param data 章节数据
		 */
		public setData(data: ProtoCmd.itf_JUQING_CHARPTERINFO): void {
			let numArray = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三']
			this.dataItem = data;
			this.lbl_charpterName.text = data.name;
			this.lbl_charpterNo.text = '第' + numArray[parseInt(data.index)] + '章';
			// 解锁条件
			let player = GameApp.MainPlayer;
			// 未解锁
			if (player.zslevel * 1000 + player.level < data.zslvl * 1000 + data.lvl) {
				let des = '';
				if (data.zslvl > 0) {
					des = '' + data.zslvl + '转';
				}
				this.lbl_charpterName.text = des + data.lvl + '级解锁';
				this.disabled = true;
			}
			// 解锁
			else {
				if (player.talkID >= data.enddbid) {
					this.lbl_conDes.color = '#0f6809';
					this.lbl_conDes.text = '已完成';
					this.box_view.mouseEnabled = true;
					this.img_bg.visible = false;
				}
				else if (player.talkID < data.startdbid) {
					this.lbl_conDes.color = '#63491a';
					this.lbl_conDes.text = '未解锁';
					this.box_view.mouseEnabled = false;
					this.img_bg.visible = true;
				}
				else {
					this.lbl_conDes.color = '#a53232';
					this.lbl_conDes.text = '进行中';
					this.box_view.mouseEnabled = false;
					this.img_bg.visible = false;
				}
				this.disabled = false;
			};
			// 点亮全部ITEM
			this.btn_bg.selected = (GameApp.MainPlayer.charpterID == data.zjid);
			this.addEvent();
		}


		public addEvent(): void {
			EventManage.onWithEffect(this.box_view, Laya.UIEvent.CLICK, this, () => {
				if (this.btn_bg.selected) { return };
				for (let _item of this.parent._childs) {
					_item.btn_bg.selected = false;
				}
				this.btn_bg.selected = true;
				PanelManage.FuBenMain.updateMainFuBenInfo(this.dataItem.zjid);
			})
		}
	}
}