/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildRankPanel extends ui.guild.GuildRankPanelUI {
		constructor() {
			super();
		}
		public setData(): void {

			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => { }, null, false);
		}
	}
}