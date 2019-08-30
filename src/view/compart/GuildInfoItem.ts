/**Created by the LayaAirIDE*/
module view.compart {
	export class GuildInfoItem extends ui.compart.GuildInfoItemUI {
		constructor() {
			super();
		}

		public item: ProtoCmd.stSingleGuildinfoBase;
		public setData(item: ProtoCmd.stSingleGuildinfoBase): GuildInfoItem {
			this.item = item;
			// 行会名字
			this.lbl_guildName.text = '' + this.item.szName;
			// 行会等级
			this.lbl_lv.text = '' + this.item.dwLevel;
			// 人数
			this.lbl_playerCount.text = '' + item.curPlayerCount + '/' + item.dwMaxPlayerCount;
			// 行会排名
			this.lbl_rank.text = '' + item.dwRank;

			this.addEvent();
			return this;
		}

		public addEvent(): void {
			// this.btn_getInfo.on (Laya.UIEvent.CLICK,this, )

		}
	}
}