/**Created by the LayaAirIDE*/
module view.friend {
	export class FriendDialog extends ui.friend.FriendDialogUI {
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