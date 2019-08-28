/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildShopPanel extends ui.guild.GuildShopPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			for (let i = 0; i < 4; i++) {
				this['panel_guildShop0' + i].vScrollBarSkin = '';
				this['vbox_guildShop0' + i]['sortItem'] = (items) => { };
			}
			this.tab_guildShop.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_guildShop.selectedIndex = index;
			}, null, false);

		}

		public addEvent(): void {
			//返回上一层界面
			this.btn_guildShopReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			});
			
		}

		/**
		 * 拉取商店数据
		 * @param index 商店子类型。从1开始 
		 */
		public updateUIList(index = 1) {
			let pkt = new ProtoCmd.QuestClientData();
			let data = [EnumData.ShopType.SHOP_TYPE_GUILD_HOT, index];
			pkt.setString(ProtoCmd.SHOP_UpdateItemList, data);
			lcp.send(pkt);
		}
	}
}
