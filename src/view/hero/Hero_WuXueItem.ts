/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_WuXueItem extends ui.hero.Hero_WuXueItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_heroJingMaiPanel, null, null, this, (jsonData) => {
			})
			lcp.send(pkt);
		}
	}
}