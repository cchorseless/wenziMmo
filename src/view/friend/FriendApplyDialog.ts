/**Created by the LayaAirIDE*/
module view.friend {
	export class FriendApplyDialog extends ui.friend.FriendApplyDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.panel_apply.vScrollBarSkin = '';
			this.vbox_apply['sortItem'] = (items) => { };
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}