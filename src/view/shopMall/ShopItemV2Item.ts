/**Created by the LayaAirIDE*/
module view.shopMall {
	export class ShopItemV2Item extends ui.shopMall.ShopItemV2ItemUI {
		constructor() {
			super();
		}
		public item = [];
		public setData(data, shoptype, i): ShopItemV2Item {
			for (let part of data) {
				this.item.push({
					binding: part.item.binding, curcnt: part.item.curcnt, discount: part.item.discount, itemid: part.item.itemid,
					limitcnt: part.item.limitcnt, num: part.item.num, price: part.item.price, pricetype: part.item.pricetype,
					show: part.item.show, type: shoptype, subtype: 0, index: i
				});
			}

			for (let i = 1; i < 4; i++) {
				this['box_' + i].visible = false;
			}
			for (let single of data) {
				this['box_' + single.index].visible = true;
				//折扣
				this['img_zheKou' + single.index].visible = false;
				if (single.item.discount > 0) {
					this['img_zheKou' + single.index].visible = true;
					this['lbl_zhe' + single.index].text = single.item.discount;
				}
				//限购
				this['lbl_xiangou' + single.index].visible = false;
				if (shoptype == EnumData.ShopType.SHOP_TYPE_LIMITED) {
					this['lbl_xiangou' + single.index].visible = true;
					this['lbl_xiangou' + single.index].text = '限购' + single.item.limitcnt + '次';
					this['img_bg' + single.index].height = 214;
					this['lbl_price' + single.index].y = 183;
					this['img_huobi' + single.index].y = 177;
				} else {
					this['img_bg' + single.index].height = 200;
					this['lbl_price' + single.index].y = 169;
					this['img_huobi' + single.index].y = 163;	
				}
				//物品
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = single.item.itemid;
				itemInfo.dwCount = single.item.num;
				itemInfo.dwBinding = single.item.binding;
				this['ui_daoju' + single.index].setData(itemInfo)
				//物品名称
				let name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + single.item.itemid).split('-')
				this['lbl_name' + single.index].text = '' + name[0];
				if (name[1]) {
					this['lbl_use' + single.index].visible = true;
					this['lbl_use' + single.index].text = '' + name[1];
				} else {
					this['lbl_use' + single.index].visible = false;
				}
				//物品打折后价格
				let nowPrice = Math.ceil(single.item.price * single.item.discount / 10)
				this['lbl_price' + single.index].text = '' + nowPrice;
				//物品货币类型
				this['img_huobi' + single.index].skin = LangConfig.getCoinImagePicSkin(single.item.pricetype);
			}
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			for (let i = 1; i < 4; i++) {
				let j = i - 1;
				this['box_' + i].on(Laya.UIEvent.CLICK, this, () => {
					let itemType = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMTYPE('' + this.item[j].itemid);
					let itemInfoDialog: view.shopMall.ShopBuyItemV0Dialog | view.shopMall.ShopBuyItemV1Dialog;
					// 根据物品类型显示不同界面
					switch (itemType) {
						// 材料
						case EnumData.ItemTypeDef.ITEM_TYPE_NORMAL:
							itemInfoDialog = new view.shopMall.ShopBuyItemV0Dialog();
							break;
						// 装备
						case EnumData.ItemTypeDef.ITEM_TYPE_EQUIP:
							itemInfoDialog = new view.shopMall.ShopBuyItemV1Dialog();
							break;
						// 消耗品
						case EnumData.ItemTypeDef.ITEM_TYPE_DRUG:
						case EnumData.ItemTypeDef.ITEM_TYPE_SKILL:
						case EnumData.ItemTypeDef.ITEM_TYPE_MAZE:
						case EnumData.ItemTypeDef.ITEM_TYPE_SCROLL:
							itemInfoDialog = new view.shopMall.ShopBuyItemV0Dialog();
							break;
						// 任务物品
						case EnumData.ItemTypeDef.ITEM_TYPE_TASK:
							itemInfoDialog = new view.shopMall.ShopBuyItemV0Dialog();
							break;
						// 默认
						default:
							itemInfoDialog = new view.shopMall.ShopBuyItemV0Dialog();
							break;
					}
					itemInfoDialog.setData(this.item[j], EnumData.ShopBuyPanelType.SHOP_BUY_GUILD_PANEL).show(true);
				})
			}

		}
	}
}