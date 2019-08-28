/**Created by the LayaAirIDE*/
module view.compart {
	export class FriendInfoItem extends ui.compart.FriendInfoItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.stRelationInfoBase;
		public setData(item: ProtoCmd.stRelationInfoBase): FriendInfoItem {
			this.item = item;
			this.addEvent();
			return this
		}
		public addEvent(): void {

		}
	}
}