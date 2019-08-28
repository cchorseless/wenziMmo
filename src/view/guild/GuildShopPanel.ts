/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildShopPanel extends ui.guild.GuildShopPanelUI {
		constructor() {
			super();
			this.addEvent();
		}
		public setData(): void {
			for (let i = 0; i < 4; i++) {
				this['panel_guildShop0' + i].vScrollBarSkin = '';
				this['vbox_guildShop0' + i]['sortItem'] = (items) => { };
			}
			this.tab_guildShop.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_guildShop.selectedIndex = index;
				this.updateUIList(index);
			}, null, false);
			// 帮会贡献
			this.lbl_gongXian.text = '' + GameApp.MainPlayer.wealth.guildDedication;
			this.updateUIList();
		}

		public addEvent(): void {
			//返回上一层界面
			this.btn_guildShopReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			});
			this.addLcpEvent();
		}

		public addLcpEvent(): void {
			// 监听刷新商店
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList, this, (msgID, jsonData: ProtoCmd.itf_Shop_RefreshResult) => {
				// 背包热销回调
				if (msgID == EnumData.ShopType.SHOP_TYPE_GUILD) {
					let vbox: Laya.VBox = this['vbox_guildShop0' + this.tab_guildShop.selectedIndex];
					vbox.removeChildren();
					let allkeys = Object.keys(jsonData.items);
					for (let key of allkeys) {
						let sellItemInfo: ProtoCmd.itf_Shop_ShopItem = jsonData.items[key];
						// 商店类型
						sellItemInfo.type = EnumData.ShopType.SHOP_TYPE_GUILD;
						// 商店子类型
						sellItemInfo.subtype = this.tab_guildShop.selectedIndex + 1;
						// 商品条目索引
						sellItemInfo.index = key;
						let ui_item = new view.compart.ShopItemV0Item();
						ui_item.setData(sellItemInfo, EnumData.ShopBuyPanelType.SHOP_BUY_GUILD_PANEL);
						// 添加道具
						if (vbox.numChildren == 0) {
							let hbox = new Laya.HBox();
							hbox.height = ui_item.height;
							hbox.space = 10;
							vbox.addChild(hbox);
						};
						let lastHbox: Laya.HBox = vbox.getChildAt(vbox.numChildren - 1) as Laya.HBox;
						if (lastHbox.numChildren < 4) {
							lastHbox.addChild(ui_item);
						}
						else {
							let hbox = new Laya.HBox();
							hbox.height = ui_item.height;
							hbox.space = 10;
							hbox.addChild(ui_item);
							vbox.addChild(hbox);
						}
					}
				}
			});
		}

		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.SHOP_UpdateItemList, this);
			PopUpManager.Dispose(this);
		}

		/**
		 * 拉取商店数据
		 * @param index 商店子类型。从1开始 
		 */
		public updateUIList(index = 0) {
			let vbox: Laya.VBox = this['vbox_guildShop0' + index];
			if (vbox.numChildren > 0) {
				return
			}
			let pkt = new ProtoCmd.QuestClientData();
			let data = [EnumData.ShopType.SHOP_TYPE_GUILD, index + 1];
			pkt.setString(ProtoCmd.SHOP_UpdateItemList, data);
			lcp.send(pkt);
		}
	}
}
