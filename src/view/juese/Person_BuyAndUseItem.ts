/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_BuyAndUseItem extends ui.juese.Person_BuyAndUseItemUI {
		constructor() {
			super();

		}
		//物品id
		public id;
		public shopData;
		public item;
		public type;
		public num = 0;
		public setData(id, type): Person_BuyAndUseItem {
			//0罡气1资质
			this.type = type;
			this.id = id;
			this.init_updata();
			this.init_updataGangqi();
			this.init_shop();
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			//购买使用
			this.btn_buyAndUse.on(Laya.UIEvent.CLICK, this, () => {
				this.num = 1;
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
				for (let key in this.shopData) {
					if (this.shopData[key].itemid == this.id) {
						let data = this.shopData[key];
						//物品打折后价格
						this.lbl_value.text = '' + Math.ceil(data.price * data.discount / 10);
						//物品货币类型
						this.img_money.skin = LangConfig.getCoinImagePicSkin(data.pricetype);
					}
				}
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
				//只能通过按钮的回调才使用和刷新
				if (this.num == 1) {
					this.init_use();
					//经验已满，买了没使用成功，刷新按钮
					this.init_updata();
				}
			});
		}
		/**
	  * 角色罡气使用物品
	  */
		public init_use(): void {
			this.num = 0;
			if (this.type == 0) {
				// 使用罡气
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.JS_advancePlayerWing, [this.id, 1])
				lcp.send(pkt);
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
							this.init_updata();
							if(this.type==1){
								PanelManage.JueSe.ui_talent.init_laqu();
							}
						}
						else {
							TipsManage.showTips('道具使用失败');
						}
					})
				}
			}
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.SHOP_UpdateItemList + '_' + EnumData.ShopType.SHOP_TYPE_TUIJIAN, this);
			GameApp.LListener.offCaller(ProtoCmd.JS_updata_GangqiUse, this);
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
		public init_updataGangqi(): void {
			GameApp.LListener.on(ProtoCmd.JS_updata_GangqiUse, this, () => {
				this.init_updata();
			})
		}
	}
}