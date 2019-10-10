/**Created by the LayaAirIDE*/
module view.rank {
	export class RankPlayerItem extends ui.rank.RankPlayerItemUI {
		constructor() {
			super();
		}
		public setData(item: ProtoCmd.stRankInfo): RankPlayerItem {
			//排行榜玩家姓名
			this.ui_head.lbl_name.text = '' + item.szname;
			//排行榜玩家头像
			if (item.sex == 1) {
				this.ui_head.img_head.skin = 'image/common/icon_nan0' + item.job+'.png';
			} else {
				this.ui_head.img_head.skin = 'image/common/icon_nv0' + item.job+'.png';
			}
			//排行榜玩家排名
			this.lbl_count.text = '' + item.nNowRankNum;
			//排行榜玩家帮会
			if (item.guildName) {
				this.lbl_guildName.text = '' + item.guildName;
			}
			else {
				this.lbl_guildName.text = '暂未加入帮会';
			}
			//排行榜玩家等级
			this.lbl_lvl.text = '' + item.level;
			return this;
		}
	}
}