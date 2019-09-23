/**Created by the LayaAirIDE*/
module view.compart {
	export class RankPlayerItem extends ui.compart.RankPlayerItemUI {
		constructor() {
			super();
		}
		public setData(item: any): RankPlayerItem {
			this.lbl_name.text = '' + item.szname;
			this.lbl_count.text = '' + item.nNowRankNum;
			this.lbl_guildName.text = '' + item.guildName;
			this.lbl_lvl.text = '' + item.level;
			return this;
		}
	}
}