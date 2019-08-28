/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildStorePanel extends ui.guild.GuildStorePanelUI {
		constructor() {
			super();
			this.addEvent()
		}
		public setData(): void {
			this.panel_guildStore.vScrollBarSkin = this.panel_bag.vScrollBarSkin = '';
			this.vbox_guildStore['sortItem'] = this.vbox_bag['sortItem'] = (items) => { };
			this.updateGongXianLbl();
			for (let i = 0; i < 4; i++) {
				this.vbox_bag.addChild(new view.compart.DaoJuGroupItem());
				this.vbox_guildStore.addChild(new view.compart.DaoJuGroupItem());
			}
			for (let key in GameApp.GameEngine.bagItemDB) {
				let equipItem: ProtoCmd.ItemBase = GameApp.GameEngine.bagItemDB[key];
				let juanXianExp = SheetConfig.mydb_item_base_tbl.getInstance(null).CONTRIBUTIONVALUE('' + equipItem.dwBaseID);//捐献帮会贡献
				// 是装备且未绑定且在背包内且帮贡大于0
				if (!equipItem.dwBinding &&
					equipItem.itemType == EnumData.ItemTypeDef.ITEM_TYPE_EQUIP
					&& equipItem.location.btLocation == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE
					&& juanXianExp > 0) {
					let ui = new view.compart.DaoJuItem();
					ui.setData(equipItem, EnumData.ItemInfoModel.SHOW_IN_GUILD_BAG);
					this.addItem(ui, true);
				}
			}
			this.initUI();
			this.updateHotShop();
		}


		public initUI(): void {
			// 请求仓库数据
			let pkt = new ProtoCmd.stViewGuildPackage();
			pkt.setValue('dwStoreId', 0);
			lcp.send(pkt);
		}

		/**
		 *拉取商店信息
		 */
		public updateHotShop(): void {
			// todo 与背包内可能有冲突 需要回包加标识
			let pkt = new ProtoCmd.QuestClientData();
			let data = [EnumData.ShopType.SHOP_TYPE_GUILD_HOT, EnumData.ShopSubType.SHOP_SUBTYPE_NONE];
			pkt.setString(ProtoCmd.SHOP_UpdateItemList, data);
			lcp.send(pkt);
		}
		/**
		 * 刷新热卖商店
		 */
		public refreshHotShop(): void {
			if (GameApp.MainPlayer.wealth.guildDedication < parseInt(this.lbl_refreshPrice.text)) {
				TipsManage.showTips('帮贡不足');
				return
			}
			let pkt = new ProtoCmd.QuestClientData();
			let data = [EnumData.ShopType.SHOP_TYPE_GUILD_HOT]
			pkt.setString(ProtoCmd.SHOP_HOT_REFRESH, data);
			lcp.send(pkt);
		}
		public addEvent(): void {
			this.btn_guildStoreReturn.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			});
			// 刷新商店
			this.btn_refreshItem.on(Laya.UIEvent.CLICK, this, this.refreshHotShop);
			this.addLcpEvent();
		}

		public addLcpEvent(): void {
			// 拉取仓库的时候 可能返回多个包
			GameApp.LListener.on(ProtoCmd.Packet.eventName(ProtoCmd.stViewGuildPackageRet), this, this.updateCangKu);
			// 更新帮贡
			GameApp.LListener.on(LcpEvent.UPDATE_UI_GUILDSCORE, this, this.updateGongXianLbl);
			// 监听刷新商店
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList, this, (msgID, jsonData: ProtoCmd.itf_Shop_RefreshResult) => {
				// 公会热销回调
				if (msgID === EnumData.ShopType.SHOP_TYPE_GUILD_HOT) {
					this.vbox_sellHot.removeChildren();
					// 刷新价格
					this.lbl_refreshPrice.text = '' + jsonData.refreshprice;
					// 刷新货币
					this.img_coinPic.skin = 'image/main/icon_coin_' + jsonData.pricetype + '.png';
					let allkeys = Object.keys(jsonData.items);
					for (let key of allkeys) {
						let sellItemInfo: ProtoCmd.itf_Shop_ShopItem = jsonData.items[key];
						console.log(sellItemInfo);
						// 商店类型
						sellItemInfo.type = EnumData.ShopType.SHOP_TYPE_GUILD_HOT;
						// 商店子类型
						sellItemInfo.subtype = EnumData.ShopSubType.SHOP_SUBTYPE_NONE;
						// 商品条目索引
						sellItemInfo.index = key;
						console.log(sellItemInfo);
						let ui_item = new view.compart.ShopHotItem();
						ui_item.setData(sellItemInfo);
						this.vbox_sellHot.addChild(ui_item);
					}
				}
			})
		}

		public Dispose(): void {
			// 仓库协议包
			GameApp.LListener.offCaller(ProtoCmd.Packet.eventName(ProtoCmd.stViewGuildPackageRet), this);
			// 更新帮会积分
			GameApp.LListener.offCaller(LcpEvent.UPDATE_UI_GUILDSCORE, this);
			// 更新热卖商店
			GameApp.LListener.offCaller(ProtoCmd.SHOP_UpdateItemList, this);
			PopUpManager.Dispose(this);
		}
		// 更新仓库
		public updateCangKu(data): void {
			let cbPkt = new ProtoCmd.stViewGuildPackageRet(data);
			let dwStoretype = cbPkt.getValue('dwStoretype');
			for (let _item of cbPkt.items) {
				let ui = new view.compart.DaoJuItem();
				let item = new ProtoCmd.ItemBase();
				item.clone(_item.data);
				ui.setData(item, EnumData.ItemInfoModel.SHOW_IN_GUILD_CANGKU);
				this.addItem(ui, false);
			}
			switch (dwStoretype) {
				// 发包结束
				case 2:
				case 3:
					// 仓库数量标识
					this.updateCangKuCount();
					break;
			}
			cbPkt.clear();
			cbPkt = null;
		}
		// 帮派贡献
		public updateGongXianLbl(): void {
			this.lbl_bangGong.text = '' + GameApp.MainPlayer.wealth.guildDedication;
		}
		/**
		 * 添加道具
		 * @param item 
		 * @param model 
		 */
		public addItem(item: view.compart.DaoJuItem, model: boolean) {
			let vbox: Laya.VBox;
			// 添加到公会背包中
			if (model) {
				vbox = this.vbox_bag;
			}
			// 添加公会仓库中
			else {
				vbox = this.vbox_guildStore;
			}

			for (let child of vbox._childs) {
				if (!(child as view.compart.DaoJuGroupItem).checkIsFull()) {
					child.addItem(item);
					break;
				}
			}
			// 添加格子
			if (item.parent == null) {
				let groupItem = new view.compart.DaoJuGroupItem();
				groupItem.addItem(item);
				vbox.addChild(groupItem);
			}
		}
		/**
		 * 更新仓库内数量
		 */
		public updateCangKuCount(): void {
			let vbox = this.vbox_guildStore;
			let count = 0;
			for (let child of vbox._childs) {
				count += child.getItemCount();
			}
			this.lbl_count.text = '' + count;
		}

	}
}