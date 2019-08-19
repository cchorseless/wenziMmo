/**Created by the LayaAirIDE*/
module view.dialog {
	export class GuildOutDialog extends ui.dialog.GuildOutDialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data): void {

		}
		public addEvent(): void {
			this.btn_guildOutClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			this.btn_quit.on(Laya.UIEvent.CLICK, this, () => {

				
			})
		}
	}
}