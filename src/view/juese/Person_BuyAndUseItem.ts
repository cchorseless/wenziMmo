/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_BuyAndUseItem extends ui.juese.Person_BuyAndUseItemUI {
		constructor() {
			super();
			this.init_shop();
			this.addEvent();
		}
		//物品id
		public id;
		public shopData;
		public item;
		public type;
		public setData(id, type): Person_BuyAndUseItem {
			//0罡气1普通物品
			this.type = type;
			this.id = id;
			this.init_updata();
			return this;
		}
		public addEvent(): void {
			//购买使用
			this.btn_buyAndUse.on(Laya.UIEvent.CLICK, this, () => {
				this.init_buyRet();
				this.init_buy();
			})
			//使用
			this.btn_use.on(Laya.UIEvent.CLICK, this, () => {
				this.init_use();
			})
		}
		/**
		 * 热销商店
		 */
		public init_shop(): void {
			let pkt = new ProtoCmd.QuestClientData();
			let data = [EnumData.ShopType.SHOP_TYPE_TUIJIAN, EnumData.ShopSubType.SHOP_SUBTYPE_NONE];
			pkt.setString(ProtoCmd.SHOP_UpdateItemList, data, EnumData.ShopType.SHOP_TYPE_TUIJIAN, this, (jsonData) => {
				this.shopData = jsonData.items;
			});
			lcp.send(pkt)
		}
		public init_buy(): void {
			for (let key in this.shopData) {
				if (this.shopData[key].itemid == this.id) {
					let data = this.shopData[key];
					this.item = [EnumData.ShopType.SHOP_TYPE_TUIJIAN, 0, key, 1];
				}
			}
			if (this.item != undefined) {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.SHOP_BuyItem, this.item);
				lcp.send(pkt);

			}
		}
		//购买回调
		public init_buyRet(): void {
			GameApp.LListener.on(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_TUIJIAN, this, (jsonData) => {
				this.init_use();
				this.init_updata();
			});
		}
		/**
	  * 角色罡气使用物品
	  */
		public init_use(): void {
			if (this.type == 0) {
				// 使用罡气
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.JS_advancePlayerWing, [this.id, 1])
				lcp.send(pkt);
				this.init_updata();
			} else {
				//使用物品
				let data = GameUtil.findItemInfoInBag(this.id, GameApp.GameEngine.bagItemDB);
				if (data) {
					let pkt = new ProtoCmd.CretGetUseItem();
					pkt.setValue('i64id', data.i64ItemID);
					pkt.setValue('dwCretOwnerTempId', GameApp.MainPlayer.tempId);
					lcp.send(pkt, this, (data) => {
						let pktCB = new ProtoCmd.CretGetUseItemRet(data);
						let btErrorCode = pktCB.getValue('btErrorCode');
						if (btErrorCode == 0) {
							TipsManage.showTips('道具使用成功');
						}
						else {
							TipsManage.showTips('道具使用失败');
						}
					})
				}
				this.init_updata();
			}
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_TUIJIAN, this);
			super.destroy(isbool);
		}
		public init_updata(): void {
			let itemInfo = new ProtoCmd.ItemBase();
			let num = GameUtil.findItemInBag(this.id, GameApp.GameEngine.bagItemDB);
			itemInfo.dwBaseID = parseInt(this.id);
			if (num) {
				itemInfo.dwCount = num;
				this.btn_use.visible = true;
				this.btn_buyAndUse.visible = false;
			} else {
				this.btn_use.visible = false;
				this.btn_buyAndUse.visible = true;
			}
			this.ui_item.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
			//物品名称
			this.lbl_name.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + this.id);
		}
	}
}