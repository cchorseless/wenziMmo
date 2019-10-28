/**Created by the LayaAirIDE*/
module view.shopMall {
	export class ShopMall_MainPanel extends ui.shopMall.ShopMall_MainPanelUI {
		constructor() {
			super();
		}
		//商店类型
		private type;
		public hasInit = false;
		public array=[];
		public setData(): void {
			if (this.hasInit) { 
				return }
			this.hasInit = true;
			//商店类型
			this.type = EnumData.ShopType.SHOP_TYPE_TUIJIAN;
			this.panel_shop.hScrollBarSkin = '';
			this.lbl_rongyu.text=''+GameApp.MainPlayer.wealth.honorNum;
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_shop.selectedIndex = index;
				this.updateHotShop();
			}, null, false);
			this.addEvent();
			this.updateHotShop();
			this.addLcpEvent();
		}
		public addEvent(): void {
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this)
			})
		}
		public addLcpEvent(): void {
			// 热销
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_TUIJIAN, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {
				this.list_shop1.vScrollBarSkin = '';
				let keys = Object.keys(jsonData.items)
				this.list_shop1.array = [];
				for (let i = 1; i < keys.length+1; i++) {
					if (jsonData.items[i]) {
						if (jsonData.items[i].show == 1) {
							this.list_shop1.array.push(jsonData.items[i])
						}
					}
				}
				this.list_shop1.itemRender = view.shopMall.ShopMall_DaojuItem;
				this.list_shop1.renderHandler = Laya.Handler.create(this, (cell: view.shopMall.ShopMall_DaojuItem, index) => {
					cell.setData(cell.dataSource);
				}, null, false)
			});
			//礼券
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_YUANBAOLOCK, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {
				this.list_shop2.vScrollBarSkin = '';
				let keys = Object.keys(jsonData.items)
				this.list_shop2.array = [];
				for (let i = 1; i < keys.length+1; i++) {
					if (jsonData.items[i]) {
						if (jsonData.items[i].show == 1) {
							this.list_shop2.array.push(jsonData.items[i])
						}
					}
				}
				this.list_shop2.itemRender = view.shopMall.ShopMall_DaojuItem;
				this.list_shop2.renderHandler = Laya.Handler.create(this, (cell: view.shopMall.ShopMall_DaojuItem, index) => {
					cell.setData(cell.dataSource);
				}, null, false)
			});
			//技能
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_SKILL, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {
				this.list_shop3.vScrollBarSkin = '';
				let keys = Object.keys(jsonData.items)
				this.list_shop3.array = [];
				for (let i = 1; i < keys.length+1; i++) {
					if (jsonData.items[i]) {
						if (jsonData.items[i].show == 1) {
							this.list_shop3.array.push(jsonData.items[i])
						}
					}
				}
				this.list_shop3.itemRender = view.shopMall.ShopMall_DaojuItem;
				this.list_shop3.renderHandler = Laya.Handler.create(this, (cell: view.shopMall.ShopMall_DaojuItem, index) => {
					cell.setData(cell.dataSource);
				}, null, false)
			});
			//荣誉
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_HONOR, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {
				this.list_shop4.vScrollBarSkin = '';
				let keys = Object.keys(jsonData.items)
				this.list_shop4.array = [];
				for (let i = 1; i < keys.length+1; i++) {
					if (jsonData.items[i]) {
						if (jsonData.items[i].show == 1) {
							this.list_shop4.array.push(jsonData.items[i])
						}
					}
				}
				this.list_shop4.itemRender = view.shopMall.ShopMall_DaojuItem;
				this.list_shop4.renderHandler = Laya.Handler.create(this, (cell: view.shopMall.ShopMall_DaojuItem, index) => {
					cell.setData(cell.dataSource);
				}, null, false)
			});
			//限购
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_LIMITED, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {
				this.list_shop5.vScrollBarSkin = '';
				let keys = Object.keys(jsonData.items)
				this.list_shop5.array = [];
				for (let i = 1; i < keys.length+1; i++) {
					if (jsonData.items[i]) {
						if (jsonData.items[i].show == 1) {
							this.list_shop5.array.push(jsonData.items[i])
						}
					}
				}
				this.list_shop5.itemRender = view.shopMall.ShopMall_DaojuItem;
				this.list_shop5.renderHandler = Laya.Handler.create(this, (cell: view.shopMall.ShopMall_DaojuItem, index) => {
					cell.setData(cell.dataSource);
				}, null, false)
				console.log('=====》商城商城', jsonData)
			});


		}


		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.SHOP_UpdateItemList + '_' + this.type, this);
			PopUpManager.Dispose(this);
		}
		/**
	  *拉取商店信息
	  */
		public updateHotShop(): void {
			switch (this.tab_top.selectedIndex) {
				//热销
				case 0:
					this.type = EnumData.ShopType.SHOP_TYPE_TUIJIAN;
					break;
				//礼券
				case 1:
					this.type = EnumData.ShopType.SHOP_TYPE_YUANBAOLOCK;
					break;
				//技能
				case 2:
					this.type = EnumData.ShopType.SHOP_TYPE_SKILL;
					break;
				//荣誉
				case 3:
					this.type = EnumData.ShopType.SHOP_TYPE_HONOR;
					break;
				//限购
				case 4:
					this.type = EnumData.ShopType.SHOP_TYPE_LIMITED;
					break;
			}
			let pkt = new ProtoCmd.QuestClientData();
			let data = [this.type, EnumData.ShopSubType.SHOP_SUBTYPE_NONE];
			pkt.setString(ProtoCmd.SHOP_UpdateItemList, data, this.type);
			lcp.send(pkt);
		}
	}
}