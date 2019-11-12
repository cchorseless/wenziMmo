/**Created by the LayaAirIDE*/
module view.shopMall {
	export class ShopMall_MainPanel extends ui.shopMall.ShopMall_MainPanelUI {
		constructor() {
			super();
		}

		public allType = [EnumData.ShopType.SHOP_TYPE_TUIJIAN,
		EnumData.ShopType.SHOP_TYPE_YUANBAOLOCK,
		EnumData.ShopType.SHOP_TYPE_SKILL,
		EnumData.ShopType.SHOP_TYPE_HONOR,
		EnumData.ShopType.SHOP_TYPE_LIMITED,
		EnumData.ShopType.SHOP_TYPE_MYSTERY
		]
		public setData(): void {
			this.panel_shop.hScrollBarSkin = '';
			this.lbl_rongyu.text = '' + GameApp.MainPlayer.wealth.honorNum;
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				if (this['list_shop' + (index + 1)] == null || this['list_shop' + (index + 1)].length == 0) {
					this.updateHotShop(this.allType[index]);
				}
				this.viw_shop.selectedIndex = index;
			}, null, false);
			this.addEvent();
			this.updateHotShop(EnumData.ShopType.SHOP_TYPE_TUIJIAN);
		}
		public aa() {
			GameApp.LListener.on(ProtoCmd.Active9, this, (data) => {
				this.shop6.removeChildren()
				let o = new view.activity.Active_Mysteryshop()
				o.setData(data)
				this.shop6.addChild(o);
			})
			let pkt9 = new ProtoCmd.QuestClientData().setString(ProtoCmd.Active9, null)
			lcp.send(pkt9);
		}
		public addEvent(): void {
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this)
			});
			this.btn_Recharge.on(Laya.UIEvent.CLICK, this, () => {
				let o = new view.recharge_vip.Recharge_VipDialog();
				o.setData(1);
				o.popup(true);
			});

			this.addLcpEvent();

		}
		public addLcpEvent(): void {
			// 热销
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_TUIJIAN, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {
				this.list_shop1.vScrollBarSkin = '';
				let keys = Object.keys(jsonData.items)
				this.list_shop1.array = [];
				for (let i = 1; i < keys.length + 1; i++) {
					if (jsonData.items[i]) {
						jsonData.items[i].index = '' + i;
						if (jsonData.items[i].show == 1) {
							this.list_shop1.array.push(jsonData.items[i])
						}
					}
				}
				this.list_shop1.itemRender = view.shopMall.ShopItemV2Item;
				this.list_shop1.renderHandler = Laya.Handler.create(this, (cell: view.shopMall.ShopItemV2Item, index) => {
					cell.setData(cell.dataSource);
				}, null, false)
			});
			//礼券
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_YUANBAOLOCK, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {

				this.list_shop2.vScrollBarSkin = '';
				let keys = Object.keys(jsonData.items)
				this.list_shop2.array = [];
				for (let i = 1; i < keys.length + 1; i++) {
					if (jsonData.items[i]) {
						jsonData.items[i].index = '' + i;
						if (jsonData.items[i].show == 1) {
							this.list_shop2.array.push(jsonData.items[i])
						}
					}
				}
				this.list_shop2.itemRender = view.shopMall.ShopItemV2Item;
				this.list_shop2.renderHandler = Laya.Handler.create(this, (cell: view.shopMall.ShopItemV2Item, index) => {
					cell.setData(cell.dataSource);
				}, null, false)
			});
			//技能
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_SKILL, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {

				this.list_shop3.vScrollBarSkin = '';
				let keys = Object.keys(jsonData.items)
				this.list_shop3.array = [];
				for (let i = 1; i < keys.length + 1; i++) {
					if (jsonData.items[i]) {
						jsonData.items[i].index = '' + i;
						if (jsonData.items[i].show == 1) {
							this.list_shop3.array.push(jsonData.items[i])
						}
					}
				}
				this.list_shop3.itemRender = view.shopMall.ShopItemV2Item;
				this.list_shop3.renderHandler = Laya.Handler.create(this, (cell: view.shopMall.ShopItemV2Item, index) => {
					cell.setData(cell.dataSource);
				}, null, false)
			});
			//荣誉
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_HONOR, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {

				this.list_shop4.vScrollBarSkin = '';
				let keys = Object.keys(jsonData.items)
				this.list_shop4.array = [];
				for (let i = 1; i < keys.length + 1; i++) {
					if (jsonData.items[i]) {
						jsonData.items[i].index = '' + i;
						if (jsonData.items[i].show == 1) {
							this.list_shop4.array.push(jsonData.items[i])
						}
					}
				}
				this.list_shop4.itemRender = view.shopMall.ShopItemV2Item;
				this.list_shop4.renderHandler = Laya.Handler.create(this, (cell: view.shopMall.ShopItemV2Item, index) => {
					cell.setData(cell.dataSource);
				}, null, false);
			});
			//限购
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_LIMITED, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {

				this.list_shop5.vScrollBarSkin = '';
				let keys = Object.keys(jsonData.items)
				this.list_shop5.array = [];
				for (let i = 1; i < keys.length + 1; i++) {
					if (jsonData.items[i]) {
						jsonData.items[i].index = '' + i;
						if (jsonData.items[i].show == 1) {
							this.list_shop5.array.push(jsonData.items[i])
						}
					}
				}
				this.list_shop5.itemRender = view.shopMall.ShopItemV2Item;
				this.list_shop5.renderHandler = Laya.Handler.create(this, (cell: view.shopMall.ShopItemV2Item, index) => {
					cell.setData(cell.dataSource);
				}, null, false)
				console.log('=====》商城商城', jsonData)
			});


		}


		public Dispose(): void {
			for (let _type of this.allType) {
				GameApp.LListener.offCaller(ProtoCmd.SHOP_UpdateItemList + '_' + _type, this);
			}
			GameApp.LListener.offCaller(ProtoCmd.Active9, this);
			PopUpManager.Dispose(this);
		}

		/**
	  	 *拉取商店信息
	  	 */
		public updateHotShop(type): void {
			if (type != EnumData.ShopType.SHOP_TYPE_MYSTERY) {
				let pkt = new ProtoCmd.QuestClientData();
				let data = [type, EnumData.ShopSubType.SHOP_SUBTYPE_NONE];
				pkt.setString(ProtoCmd.SHOP_UpdateItemList, data, type);
				lcp.send(pkt);
			}else{
				this.aa();
			}

		}

	}
}