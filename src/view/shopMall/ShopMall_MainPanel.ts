/**Created by the LayaAirIDE*/
module view.shopMall {
	export class ShopMall_MainPanel extends ui.shopMall.ShopMall_MainPanelUI {
		public labels = ['热销', '礼券', '技能', '荣誉', '限购']
		/**
		 * All动态活动ID
		 */
		public activityState = [EnumData.activityType.ShenMi_Open]
		public data = []
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
			this.panel_shop1.vScrollBarSkin = '';
			this.vbox_shop1['sortItem'] = (items) => { };
			this.panel_shop2.vScrollBarSkin = '';
			this.vbox_shop2['sortItem'] = (items) => { };
			this.panel_shop3.vScrollBarSkin = '';
			this.vbox_shop3['sortItem'] = (items) => { };
			this.panel_shop4.vScrollBarSkin = '';
			this.vbox_shop4['sortItem'] = (items) => { };
			this.panel_shop5.vScrollBarSkin = '';
			this.vbox_shop5['sortItem'] = (items) => { };
			this.lbl_rongyu.text = '' + GameApp.MainPlayer.wealth.honorNum;
			for (let o in GameApp.GameEngine.activityStatus) {
				if (GameApp.GameEngine.activityStatus[o].id == this.activityState[0]) {
					this.data.push(GameApp.GameEngine.activityStatus[o])
				}
			}
			if (this.data.length > 0) {
				for (let i = 0; i < this.data.length; i++) {
					this.labels.push(this.data[i].name)
				}
			}
			let tablabel: string;
			tablabel = this.labels.join(',')
			this.tab_top.labels = tablabel;

			this.addEvent();
			this.updateHotShop(EnumData.ShopType.SHOP_TYPE_TUIJIAN, 0);
		}
		public addEvent(): void {
			//返回菜单
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this)
			});
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.updateHotShop(this.allType[index], index);

			}, null, false);
			//充值
			this.btn_Recharge.on(Laya.UIEvent.CLICK, this, () => {
				let o = new view.recharge_vip.Recharge_VipDialog();
				o.setData(0);
				o.popup(true);
			});

			this.addLcpEvent();

		}
		public addLcpEvent(): void {
			// 热销
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_TUIJIAN, this, (jsonData) => {
				let shop = 1;
				this.init_shopEvent(jsonData, shop);

			});
			//礼券
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_YUANBAOLOCK, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {
				let shop = 2;
				this.init_shopEvent(jsonData, shop);
			});
			//技能
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_SKILL, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {
				let shop = 3;
				this.init_shopEvent(jsonData, shop);
			});
			//荣誉
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_HONOR, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {
				let shop = 4;
				this.init_shopEvent(jsonData, shop);
			});
			//限购
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_LIMITED, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {
				let shop = 5;
				this.init_shopEvent(jsonData, shop);
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
		public updateHotShop(type, id): void {
			let index = id;
			this.viw_shop.selectedIndex = id;
			//荣誉货币只在index=3时显示
			if (index == 3) {
				this.img_rongyu.visible = true;
			} else {
				this.img_rongyu.visible = false;
			}
			if (index < 5) {
				if (this['vbox_shop' + (index + 1)]._childs == [] || this['vbox_shop' + (index + 1)]._childs == 0) {
					let pkt = new ProtoCmd.QuestClientData();
					let data = [type, EnumData.ShopSubType.SHOP_SUBTYPE_NONE];
					pkt.setString(ProtoCmd.SHOP_UpdateItemList, data, type);
					lcp.send(pkt);
				}
			} else {
				//神秘商店
				this.init_secretShopEvent();
			}
		}
		/**
		 * 
		 * @param jsonData 商店信息
		 * @param shop 商店类型
		 */
		public init_shopEvent(jsonData, shop): void {
			let shoptype;
			if (shop == 5) {
				shoptype = EnumData.ShopType.SHOP_TYPE_LIMITED;
			} else {
				shoptype = shop;
			}
			//商品的总数
			let allItem = 0;
			for (let j = 1; jsonData.items[j]; j++) {
				if (jsonData.items[j].num) {
					allItem += 1;
				}
			}
			//货架层数
			let shang = Math.floor(allItem / 3);
			//一层货架摆不满时的余数
			let shu = allItem % 3;
			this['vbox_shop' + shop].removeChildren();
			let index;
			let shopArray = [];
			let sum = 0;
			for (let i = 1; i < (allItem + 1); i++) {
				let data = jsonData.items[i];
				let yu = i % 3;
				switch (yu) {
					case 0:
						index = 3;
						shopArray.push({ item: data, index: index });
						break;
					case 1:
						index = 1;
						sum += 1;
						shopArray.push({ item: data, index: index });
						break;
					case 2:
						index = 2;
						shopArray.push({ item: data, index: index });
						break;
				}
				if (sum <= shang) {
					if (index == 3) {
						this['vbox_shop' + shop].addChild(new view.shopMall.ShopItemV2Item().setData(shopArray,shoptype,i));
						shopArray = [];
					}
				}
				else {
					if (index == shu) {
						this['vbox_shop' + shop].addChild(new view.shopMall.ShopItemV2Item().setData(shopArray,shoptype,i));
						shopArray = [];
					}
				}
			}
		}
		/**
		 * 神秘商店
		 */
		public init_secretShopEvent(): void {
			GameApp.LListener.on(ProtoCmd.Active9, this, (data) => {
				this.shop6.removeChildren()
				this.shop6.addChild(new view.activity.Active_Mysteryshop().setData(data));
			})
			let pkt9 = new ProtoCmd.QuestClientData().setString(ProtoCmd.Active9)
			lcp.send(pkt9);
		}
	}
}