/**Created by the LayaAirIDE*/
module view.dialog {
	export class GuildDonateDialog extends ui.dialog.GuildDonateDialogUI {
		constructor() {
			super();
			this.setDate();
		}
		public setDate(): void {
			this.panel_guildDonate.vScrollBarSkin = '';
			this.vbox_guildDonate['sortItem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_guildDonate.addChild(new view.compart.GuildDonateItem());
			}
			this.btn_guildDonateClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}