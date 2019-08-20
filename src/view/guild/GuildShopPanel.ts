/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildShopPanel extends ui.guild.GuildShopPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			//item0界面
			this.panel_guildShop00.vScrollBarSkin = '';
			this.vbox_guildShop00['sortItem'] = (items) => { };
			for (let j = 0; j < 5; j++) {
				this.vbox_guildShop00.addChild(new view.compart.ShopDaojuBuyItem());
			};
			//item1界面
			this.panel_guildShop01.vScrollBarSkin = '';
			this.vbox_guildShop01['sortItem'] = (items) => { };
			for (let j = 0; j < 5; j++) {
				this.vbox_guildShop01.addChild(new view.compart.ShopDaojuBuyItem());
			};
			//item2界面
			this.panel_guildShop02.vScrollBarSkin = '';
			this.vbox_guildShop02['sortItem'] = (items) => { };

			for (let j = 0; j < 5; j++) {
				this.vbox_guildShop02.addChild(new view.compart.ShopDaojuBuyItem());
			}
			//item3界面
			this.panel_guildShop03.vScrollBarSkin = '';
			this.vbox_guildShop03['sortItem'] = (items) => { };
			for (let j = 0; j < 5; j++) {
				this.vbox_guildShop03.addChild(new view.compart.ShopDaojuBuyItem());
			}
			this.tab_guildShop.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_guildShop.selectedIndex = index;
			}, null, false);
			//返回上一层界面
			this.btn_guildShopReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this, true, 4);
			});
		}
	}
}
