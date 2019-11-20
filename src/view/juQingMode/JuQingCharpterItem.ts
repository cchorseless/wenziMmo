/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQingCharpterItem extends ui.juQingMode.JuQingCharpterItemUI {
		constructor() {
			super();
		}
		public charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO;
		/**
		 * 
		 * @param data 章节数据
		 */
		public setData(data: ProtoCmd.itf_JUQING_CHARPTERINFO): void {
			this.charpterInfo = data;
			this.lbl_charpterName.text = data.name;
			this.lbl_charpterNo.text = '第' + GameUtil.SectionToChinese(parseInt(data.index),0) + '章';
			this.updateUI();
			this.addEvent()
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_view, Laya.UIEvent.CLICK, this, () => {
				this.btn_view.selected = true;
				PanelManage.JuQingMode.changeCharpter(this);
			})
		}
		public updateUI(): void {
			// 解锁条件
			let player = GameApp.MainPlayer;
			// 未解锁
			if (player.zslevel * 1000 + player.level < this.charpterInfo.zslvl * 1000 + this.charpterInfo.lvl) {
				let des = '';
				if (this.charpterInfo.zslvl > 0) {
					des = '' + this.charpterInfo.zslvl + '转';
				}
				this.lbl_conDes.text = des + this.charpterInfo.lvl + '级解锁';
			}
			// 解锁
			else {
				if (player.talkID >= this.charpterInfo.enddbid) {
					this.lbl_conDes.text = '已完成';
					this.lbl_conDes.color = '#0e6707';
					this.mouseEnabled = true;
					this.btn_view.skin = 'image/juQingMode/bottom_zhangjie.png';
					this.lbl_charpterNo.color = '#ffeeb1';
					this.lbl_charpterName.color = '#000000';
				}
				else if (player.talkID < this.charpterInfo.startdbid) {
					this.lbl_conDes.text = '未解锁';
					this.lbl_conDes.color = '#672a06';
					this.btn_view.mouseEnabled = false;
					this.btn_view.skin = 'image/juQingMode/bottom_zhangjie2.png';
					this.lbl_charpterNo.color = '#c9a78b';
					this.lbl_charpterName.color = 'a53232';
				}
				else {
					this.lbl_conDes.text = '进行中';
					this.lbl_conDes.color = '#a53232';
					this.mouseEnabled = true;
					this.btn_view.skin = 'image/juQingMode/bottom_zhangjie.png';
					this.lbl_charpterNo.color = '#ffeeb1';
					this.lbl_charpterName.color = '#000000';
				}

			}
			// 选中状态
			this.btn_view.selected = (this.charpterInfo.zjid == player.charpterID);
		}
	}
}