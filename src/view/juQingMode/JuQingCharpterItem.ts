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
			this.lbl_charpterNo.text = '第' + data.index + '章';
			// 解锁条件
			let player = GameApp.MainPlayer;
			// 选中状态
			this.btn_view.selected = (data.zjid == player.charpterID);
			// 未解锁
			if (player.zslevel * 1000 + player.level < data.zslvl * 1000 + data.lvl) {
				let des = '';
				if (data.zslvl > 0) {
					des = '' + data.zslvl + '转';
				}
				this.lbl_conDes.text = des + data.lvl + '级解锁';
			}
			// 解锁
			else {
				if (player.talkID >= data.enddbid) {
					this.lbl_conDes.text = '已完成';
				}
				else if (player.talkID < data.startdbid) {
					this.lbl_conDes.text = '未开启';
				}
				else {
					this.lbl_conDes.text = '进行中';
					this.lbl_conDes.color = '#a2cbb1';
				}

			}
			this.addEvent()
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_view, Laya.UIEvent.CLICK, this, () => {
				this.btn_view.selected = true;
				PanelManage.JuQingMode.changeCharpter(this);
			})

		}
	}
}