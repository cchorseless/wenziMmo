/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildEventInfoItem extends ui.guild.GuildEventInfoItemUI {
		constructor() {
			super();
		}
		public setData(item: ProtoCmd.stGuildEventBase) {
			this.lbl_time.text = '' + item.dwEventTime;
			this.div_des.style.fontSize = 25;
			this.div_des.innerHTML = '' + item.szEventText;
		}
	}
}