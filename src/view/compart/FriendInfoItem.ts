/**Created by the LayaAirIDE*/
module view.compart {
	export class FriendInfoItem extends ui.compart.FriendInfoItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.stRelationInfoBase;
		public setData(item: ProtoCmd.stRelationInfoBase): FriendInfoItem {
			this.item = item;
			this.lbl_name.text=''+item.szName;
			this.lbl_lvl.text=''+item.level;
			this.lbl_guild.text=''+item.guildName;
			this.addEvent();
			return this
		}
		public addEvent(): void {

		}
	}
}