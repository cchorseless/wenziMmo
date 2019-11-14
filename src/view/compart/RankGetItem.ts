/**Created by the LayaAirIDE*/
module view.rank {
	export class RankGetItem extends ui.rank.RankGetItemUI {
		constructor() {
			super();
		}
		public data;
		public setData(data): RankGetItem {
			this.data = data;
			this.init_rankReward();
			return this;
		}
		public init_rankReward(): void {
			//排名
			let rank = parseInt(this.data[1]);
			if (rank == 1 ||rank==2 ||rank== 3) {
				this.lbl_rank.text = '第' + rank + '名';
			} else {
				let ranks = this.data[1].split('|');
				this.lbl_rank.text = ranks[0] + '-' + ranks[1];
			}
			//奖励
			let id = this.data[2].split('|');
			let num = this.data[3].split('|');
			for (let i in id) {
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID =id[i];
				itemInfo.dwCount=num[i];
				let j=parseInt(i)+1;
				this['ui_item'+j].setData(itemInfo,EnumData.ItemInfoModel.SHOW_IN_MAIL);
			}
		}
	}
}