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
			this.init_applyData();
			this.addLcpEvent();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.onClosed)
		}
		/**
		 * 好友申请列表
		 */
		public init_applyData(): void {
			let keys = Object.keys(GameApp.MainPlayer.friendApplyInfo);
			this.vbox_apply.removeChildren();
			if (keys.length > 0) {
				for (let key of keys) {
					let data = GameApp.MainPlayer.friendApplyInfo[key];
					this.vbox_apply.addChild(new view.friend.FriendInfoItem().init_friendApply(data))
				}
			}
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.FD_APPLY_UPDATA, this, () => {
				this.init_applyData();
			})
		}
		public onClosed(): void {
			GameApp.LListener.offCaller(ProtoCmd.FD_APPLY_UPDATA, this);
			this.close();
		}
	}
}