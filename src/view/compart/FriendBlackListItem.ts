/**Created by the LayaAirIDE*/
module view.compart {
	export class FriendBlackListItem extends ui.compart.FriendBlackListItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public setData(): void {

		}
		public addEvent(): void {
			this.btn_blackList.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.FriendBlackListDialog().popup();
			});
		}
	}
}