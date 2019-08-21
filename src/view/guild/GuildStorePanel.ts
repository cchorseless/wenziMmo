/**Created by the LayaAirIDE*/
module view.guild{
	export class GuildStorePanel extends ui.guild.GuildStorePanelUI{
		constructor(){
			super();
		}
		public setData(): void {
			this.panel_guildStore.vScrollBarSkin = '';
			this.vbox_guildStore['sortItem'] = (items) => { };

			for (let i = 0; i < 10; i++) {
				this.vbox_guildStore.addChild(new view.compart.GuildStoreItem());
			}
			this.btn_guildStoreReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this, true, 4);
			});
		}
	}
}