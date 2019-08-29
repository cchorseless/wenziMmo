/**Created by the LayaAirIDE*/
module view.compart {
	export class GuildInfoItem extends ui.compart.GuildInfoItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.stSingleGuildinfoBase;
		public setData(item: ProtoCmd.stSingleGuildinfoBase): GuildInfoItem {
			this.item = item;
			


			this.addEvent();
			return this;
		}

		public addEvent(): void {

		}
	}
}