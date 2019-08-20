/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildShopPanel extends ui.guild.GuildShopPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_guildShop.vScrollBarSkin = '';
			this.vbox_guildShop['sortItem'] = (items) => { };
			for (let j = 0; j < 5; j++) {
				this.vbox_guildShop.addChild(new view.compart.ShopDaojuBuyItem());
			}
			this.btn_guildShopReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this, true, 4);
			});
		}
	}
}
