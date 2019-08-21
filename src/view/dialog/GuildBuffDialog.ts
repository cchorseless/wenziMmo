/**Created by the LayaAirIDE*/
module view.dialog {
	export class GuildBuffDialog extends ui.dialog.GuildBuffDialogUI {
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