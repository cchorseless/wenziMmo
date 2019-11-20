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
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				if (this['vbox_shop' + (index + 1)] == null || this['vbox_shop' + (index + 1)].length == 0) {
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
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_TUIJIAN, this, (jsonData) => {
				let keys = Object.keys(jsonData.items)
				for (let key of keys) {
					let data = jsonData.items[key];
					let shang = parseInt(key) % 3;
					let shopItem = new view.shopMall.ShopItemV2Item();
					let index;
					switch (shang) {
						case 0:
							index = 3;
							shopItem.setData(data, index);
							break;
						case 1:
							index = 1;
							this.vbox_shop1.addChild(shopItem.setData(data, index));
							break;
						case 2:
							index = 2;
							shopItem.setData(data, index);
							break;
					}
				}

			});
			//礼券
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_YUANBAOLOCK, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {

			});
			//技能
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_SKILL, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {


			});
			//荣誉
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_HONOR, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {

			});
			//限购
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_LIMITED, this, (jsonData: ProtoCmd.itf_Shop_RefreshResult) => {


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
			} else {
				this.aa();
			}

		}

	}
}