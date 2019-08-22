/**Created by the LayaAirIDE*/
module view.dialog {
	export class FriendBlackListDialog extends ui.dialog.FriendBlackListDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.btn_blackListClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}