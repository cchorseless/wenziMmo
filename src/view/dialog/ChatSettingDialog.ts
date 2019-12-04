/**Created by the LayaAirIDE*/
module view.dialog {
	export class ChatSettingDialog extends ui.dialog.ChatSettingDialogUI {
		public tempData = null;
		constructor() {
			super();
			this.tempData = GameApp.MainPlayer.chatStatus;
			this.addEvent();
			this.setData();
		}
		public setData() {
			for (let i in this.tempData) {
				this['btn_' + i].selected = this.tempData[i].status
			}
		}
		public addEvent() {
			this.btn_2.on(Laya.UIEvent.CLICK, this, function () {
				this.changeStatus(2)
			})
			this.btn_3.on(Laya.UIEvent.CLICK, this, function () {
				this.changeStatus(3)
			})
			this.btn_4.on(Laya.UIEvent.CLICK, this, function () {
				this.changeStatus(4)
			})
			this.btn_5.on(Laya.UIEvent.CLICK, this, function () {
				this.changeStatus(5)
			})
			this.btn_8.on(Laya.UIEvent.CLICK, this, function () {
				this.changeStatus(8)
			})
			this.btn_confirm.on(Laya.UIEvent.CLICK, this, function () {
				GameApp.MainPlayer.chatStatus = this.tempData;
				laya.net.LocalStorage.setJSON("chat_Set", GameApp.MainPlayer.chatStatus)
				this.close();
			})
		}
		public changeStatus(id) {
			this.tempData[id].status = !this.tempData[id].status;
			this.setData();
			//  laya.net.LocalStorage.setJSON("chat_Set",GameApp.MainPlayer.chatStatus)
		}
	}
}