/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildDetailDialog extends ui.guild.GuildDetailDialogUI {
		constructor() {
			super();
			this.setDate();
		}
		public setDate(): void {
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_guildDetailClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}