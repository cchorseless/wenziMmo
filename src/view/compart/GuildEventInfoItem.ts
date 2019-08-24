/**Created by the LayaAirIDE*/
module view.compart {
	export class GuildEventInfoItem extends ui.compart.GuildEventInfoItemUI {
		constructor() {
			super();
		}
		public setData(item: ProtoCmd.stGuildEventBase) {
			this.lbl_time.text = '' + item.dwEventTime;
			this.div_des.innerHTML = '' + item.szEventText;
		}
	}
}