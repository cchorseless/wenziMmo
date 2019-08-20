/**Created by the LayaAirIDE*/
module view.dialog{
	export class GuildDetailDialog extends ui.dialog.GuildDetailDialogUI{
		constructor(){
			super();
			this.setDate();
		}
		public setDate(): void {
			this.btn_guildDetailClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}