/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildSelectItem extends ui.guild.GuildSelectItemUI {
		constructor() {
			super();
		}
		public type;
		public guildInfo;
		/**
		 * 
		 * @param guildInfo 行会信息
		 * @param type 行会类型0收徒1闭关
		 */
		public setData(guildInfo: ProtoCmd.stGuildDBBase, type): GuildSelectItem {
			this.guildInfo = guildInfo;
			this.type = type;
			this.lbl_guildName.text = guildInfo.szName;
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				if (this.type == 1) {
					new view.guild.GuildSelectInfoDialog().setData(this.guildInfo).popup();
				}
			})
		}
	}
}