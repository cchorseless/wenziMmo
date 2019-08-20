/**Created by the LayaAirIDE*/
module view.compart {
	export class GuildMemberRankItem extends ui.compart.GuildMemberRankItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.stSingleGuildMemberInfoBase;
		public setData(item: ProtoCmd.stSingleGuildMemberInfoBase): void {
			this.item = item;




		}

	}
}