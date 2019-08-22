/**Created by the LayaAirIDE*/
module view.compart {
	export class FriendNearbyItem extends ui.compart.FriendNearbyItemUI {
		constructor() {
			super();
		}
		public item: GameObject.Player;
		public setData(item: GameObject.Player): FriendNearbyItem {
			this.item = item;
			this.lbl_playerName.text=''+this.item.objName;
			this.lbl_playerRank.text=''+this.item.level;
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_nearby.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.FriendNearbyDialog().setData(this.item).popup();
			});
		}
	}
}