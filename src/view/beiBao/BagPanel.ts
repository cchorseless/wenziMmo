/**Created by the LayaAirIDE*/
module view.beiBao {
	export class BagPanel extends ui.beiBao.BagPanelUI {
		constructor() {
			super();
			// 添加事件
			this.addEvent();
			GameApp.GameEngine.mainPlayer.playerORHero = 0;
		}
		public setData(): void {
			// 初始化背包
			for (let i = 0; i < 4; i++) {
				this['panel_bag' + i].vScrollBarSkin = '';
				this['vbox_bag' + i]['sortItem'] = (items) => { };
				for (let j = 0; j < 6; j++) {
					this['vbox_bag' + i].addChild(new view.compart.DaoJuGroupItem());
				}
			}
			// 背包tab
			this.tab_bag.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_bag.selectedIndex = index
			}, null, false)
			// 左边热卖商店
			this.panel_sellHot.vScrollBarSkin = '';
			this.vbox_sellHot['sortItem'] = (items) => { };
			// 初始化背包
			this.initUI();
			// 拉取热销商店数据
			this.updateHotShop()

		}

		public initUI(): void {
			// 初始化背包内界面
			let allKey_bag = Object.keys(GameApp.GameEngine.bagItemDB);
			for (let key of allKey_bag) {
				this.addItem(EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE, GameApp.GameEngine.bagItemDB[key]);
			}
			// 初始化界面
			this.openPanel('btn_bag');
		}

		public addEvent(): void {
			this.addLcpEvent();
			// 返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel()
			});
			// 背包
			this.btn_bag.on(Laya.UIEvent.CLICK, this, this.openPanel, ['btn_bag']);
			// 摆摊
			this.btn_baiTan.on(Laya.UIEvent.CLICK, this, this.openPanel, ['btn_baiTan']);
			// 仓库
			this.btn_cangKu.on(Laya.UIEvent.CLICK, this, this.openPanel, ['btn_cangKu']);
			// 回收
			this.btn_huiShou.on(Laya.UIEvent.CLICK, this, this.openPanel, ['btn_huiShou']);
			// 小说模式
			this.btn_modeChange.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});
			// 打开商店
			this.btn_shop.on(Laya.UIEvent.CLICK, this, () => {

			});
			// 刷新商店
			this.btn_refreshItem.on(Laya.UIEvent.CLICK, this, this.refreshHotShop);
			this.ui_equipInfo.tab_0.on(Laya.UIEvent.CLICK, this, () => {
				GameApp.GameEngine.mainPlayer.playerORHero = this.ui_equipInfo.tab_0.selectedIndex;
			});
			this.ui_equipInfo.btn_lvBuff.on(Laya.UIEvent.CLICK, this, () => {
				let o = new view.juese.Person_Equip_SoulContentDialog()
				o.setData(0)
				o.popup();
			});
		}

		public addLcpEvent(): void {
			// 监听刷新商店
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_BAG_HOT, this,
				(jsonData: ProtoCmd.itf_Shop_RefreshResult) => {
					this.vbox_sellHot.removeChildren();
					// 刷新价格
					this.lbl_refreshPrice.text = '' + jsonData.refreshprice;
					// 刷新货币
					this.img_coinPic.skin = 'image/main/icon_coin_' + jsonData.pricetype + '.png';
					let allkeys = Object.keys(jsonData.items);
					console.log(jsonData);
					for (let key of allkeys) {
						let sellItemInfo: ProtoCmd.itf_Shop_ShopItem = jsonData.items[key];
						// 商店类型
						sellItemInfo.type = EnumData.ShopType.SHOP_TYPE_BAG_HOT;
						// 商店子类型
						sellItemInfo.subtype = EnumData.ShopSubType.SHOP_SUBTYPE_NONE;
						// 商品条目索引
						sellItemInfo.index = key;
						let ui_item = new view.shopMall.ShopItemV1Item();
						ui_item.setData(sellItemInfo);
						this.vbox_sellHot.addChild(ui_item);

					}
				});
		}


		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_BAG_HOT, this);
			PopUpManager.Dispose(this);
		}

		public openPanel(msg): void {
			let btn_tmp: Laya.Button = this[msg];
			if (btn_tmp.selected) { return };
			// 按钮变颜色
			let allBtn = ['btn_bag', 'btn_huiShou', 'btn_cangKu', 'btn_baiTan'];
			for (let btnName of allBtn) {
				this[btnName].selected = (btnName == msg);
			}
			// 按钮对应索引
			let index = allBtn.indexOf(msg);
			// 绑定物品不能交易
			let allKey = Object.keys(GameApp.GameEngine.bagItemDB);
			for (let key of allKey) {
				let ui_item: view.compart.DaoJuItem = GameApp.GameEngine.bagItemDB[key].ui_item;
				ui_item && ui_item.canGoToSell(msg === "btn_baiTan");
			}
			// 显示界面
			this.viw_BagViewChange.selectedIndex = 0;
			this.viw_bagBottom.selectedIndex = index;
			this.lbl_bagLogolbl.text = ['背包', '回收', '仓库', '摆摊'][index];
			(this.viw_bagBottom.getChildAt(index) as any).setData();
		}

		/**
		 * 显示交易行
		 */
		public showJiaoYiHang(): void {
			this.viw_BagViewChange.selectedIndex = 1;
			this.ui_jiaoyihang.setData();
			this.lbl_bagLogolbl.text = '交易行';
			this.btn_baiTan.selected = false;
		}


		/**
		 * 添加物品
		 * @param obj 
		 */
		public addItem(type: EnumData.PACKAGE_TYPE, obj: ProtoCmd.ItemBase): void {
			if (this.destroyed) return;
			// 配置表ID
			let dwBaseID = '' + obj.dwBaseID;
			// 物品数量
			let dwCount = obj.dwCount;
			// 物品类型
			let itemType = obj.itemType
			// 物品位置
			let local_index = obj.location.btLocation;
			switch (type) {
				// 背包
				case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE:
					// 判断位置是否是背包
					if (local_index != EnumData.PACKAGE_TYPE.ITEMCELLTYPE_PACKAGE) {
						return;
					}
					let vbox_bag;
					switch (itemType) {
						// 装备
						case EnumData.ItemTypeDef.ITEM_TYPE_EQUIP:
							vbox_bag = this.vbox_bag0;
							this.tab_bag.selectedIndex = this.viw_bag.selectedIndex = 0;
							break;
						// 材料
						case EnumData.ItemTypeDef.ITEM_TYPE_NORMAL:
							vbox_bag = this.vbox_bag1;
							this.tab_bag.selectedIndex = this.viw_bag.selectedIndex = 1;
							break;
						// 消耗品
						case EnumData.ItemTypeDef.ITEM_TYPE_DRUG:
						case EnumData.ItemTypeDef.ITEM_TYPE_SKILL:
						case EnumData.ItemTypeDef.ITEM_TYPE_MAZE:
						case EnumData.ItemTypeDef.ITEM_TYPE_SCROLL:
							vbox_bag = this.vbox_bag2;
							this.tab_bag.selectedIndex = this.viw_bag.selectedIndex = 2;
							break;
						// 任务物品
						case EnumData.ItemTypeDef.ITEM_TYPE_TASK:
							vbox_bag = this.vbox_bag3;
							this.tab_bag.selectedIndex = this.viw_bag.selectedIndex = 3;
							break;
					}
					if (vbox_bag) {
						for (let child of vbox_bag._childs) {
							if (!(child as view.compart.DaoJuGroupItem).checkIsFull()) {
								let item = new view.compart.DaoJuItem();
								item.setData(obj, EnumData.ItemInfoModel.SHOW_IN_BAG);
								child.addItem(item);
								break;
							}
						}
					}
					break;
				// 仓库
				case EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE:
					// 判断位置是否是背包
					if (local_index != EnumData.PACKAGE_TYPE.ITEMCELLTYPE_STORE) {
						return;
					}
					this.ui_cangKu.addItem(obj);
					break;

			}
		}

		/**
		 *拉取商店信息
		 */
		public updateHotShop(): void {
			let pkt = new ProtoCmd.QuestClientData();
			let data = [EnumData.ShopType.SHOP_TYPE_BAG_HOT, EnumData.ShopSubType.SHOP_SUBTYPE_NONE];
			pkt.setString(ProtoCmd.SHOP_UpdateItemList, data, EnumData.ShopType.SHOP_TYPE_BAG_HOT);
			lcp.send(pkt);
		}

		/**
		 * 刷新热卖商店
		 */
		public refreshHotShop(): void {
			if (GameApp.MainPlayer.wealth.yuanBao < parseInt(this.lbl_refreshPrice.text)) {
				TipsManage.showTips('元宝不足');
				return
			}
			let pkt = new ProtoCmd.QuestClientData();
			let data = [EnumData.ShopType.SHOP_TYPE_BAG_HOT]
			pkt.setString(ProtoCmd.SHOP_HOT_REFRESH, data, EnumData.ShopType.SHOP_TYPE_BAG_HOT);
			lcp.send(pkt);
		}

		/**
		 * 更新摊位信息
		 */
		public updateTanWei(): void {
			if (!this.destroyed) {
				this.ui_tanWei.updateTanWeiUI();
			}
		}
		/**
		 * 更新仓库
		 */
		public updateCangKuInfo(): void {
			if (!this.destroyed) {
				this.ui_cangKu.updateCangKuUI()
			}
		}

		/**
		 * 检查摊位是否满了
		 */
		public checkTanWeiIsFull(): boolean {
			if (this.ui_tanWei && this.ui_tanWei.vbox_sell.numChildren >= SheetConfig.canshuSheet.getInstance(null).DATA('JYH_MAXIMUM_SALES')[0]) {
				return false
			}
			return true
		}

	}
}