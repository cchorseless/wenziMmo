/**Created by the LayaAirIDE*/
module view.dialog {
	export class GuildDonateDialog extends ui.dialog.GuildDonateDialogUI {
		constructor() {
			super();
			this.setDate();
		}
		public setDate(): void {
			this.btn_guildDonateClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}