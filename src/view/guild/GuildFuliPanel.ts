/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildFuliPanel extends ui.guild.GuildFuliPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_guildFuli.vScrollBarSkin = '';
			this.vbox_guildFuli['sortItem'] = (items) => { };

			for (let i = 0; i < 10; i++) {
				this.vbox_guildFuli.addChild(new view.compart.GuildFuliItem());
			}
			this.btn_guildFuliReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this, true, 4);
			});
		}
	}
}