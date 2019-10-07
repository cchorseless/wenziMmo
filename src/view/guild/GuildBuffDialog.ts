/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildBuffDialog extends ui.guild.GuildBuffDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.btn_guildBuffClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}