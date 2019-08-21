/**Created by the LayaAirIDE*/
module view.dialog {
	export class FriendDialog extends ui.dialog.FriendDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.btn_friendClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}