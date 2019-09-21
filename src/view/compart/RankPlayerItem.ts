/**Created by the LayaAirIDE*/
module view.compart {
	export class RankPlayerItem extends ui.compart.RankPlayerItemUI {
		constructor() {
			super();
		}
		public setData(item: any): RankPlayerItem {
			this.lbl_name.text = '' + item.szName;
			this.lbl_count.text = '' + item.nNowRankNum;
			return this;
		}
	}
}