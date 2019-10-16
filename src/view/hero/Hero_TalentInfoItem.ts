/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_TalentInfoItem extends ui.hero.Hero_TalentInfoItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.panel_talent.vScrollBarSkin = '';
			this.vbox_talent['sortItem'] = items => { };
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_heroAllGeniusLvl, null, null, this, (jsonData) => {
				let keys = Object.keys(jsonData.lvltab);
				for (let key of keys) {
					let data = jsonData.lvltab[key];
					this.vbox_talent.addChild(new view.hero.Hero_TalentInfoFloorItem().setData(key,data))
				}
			})
			lcp.send(pkt);
			this.addEvent();
		}
		public addEvent(): void {

		}
	}
}