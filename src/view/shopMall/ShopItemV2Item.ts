/**Created by the LayaAirIDE*/
module view.shopMall {
	export class ShopItemV2Item extends ui.shopMall.ShopItemV2ItemUI {
		constructor() {
			super();
		}
		public item;
		public setData(data): ShopItemV2Item {
			this.item = data;
			for (let i = 1; i < 4; i++) {
				this['box_' + i].visible = false;
			}
			for (let single of data) {
				this['box_' + single.index].visible = true;
				//折扣
				this['img_zheKou' + single.index].visible = false;
				if (single.item.discount > 0) {
					this['img_zheKou' + single.index].visible = true;
					this['img_zheKou' + single.index].skin = 'image/common/img_' + single.item.discount + 'zhe.png';
				}
				//限购
				this['lbl_xiangou' + single.index].visible = false;
				this['img_item' + single.index].height = 152;
				this['img_item' + single.index].y = 28;
				if (single.item.limitcnt > 0) {
					this['lbl_xiangou' + single.index].visible = true;
					this['lbl_xiangou' + single.index].text = '限购' + single.item.limitcnt + '次';
					this['img_item' + single.index].height = 176;
					this['img_item' + single.index].y = 6;
				}
				//物品
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = single.item.itemid;
				itemInfo.dwCount = single.item.num;
				itemInfo.dwBinding = single.item.binding;
				this['ui_daoju' + single.index].setData(itemInfo)
				//物品名称
				let name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + single.item.itemid)
				this['lbl_name' + single.index].text = '' + name;
				//物品价格
				this['lbl_price' + single.index].text = '' + single.item.price;
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
					let itemType = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMTYPE('' + this.item[j].item.itemid);
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
					itemInfoDialog.setData(this.item[j].item, EnumData.ShopBuyPanelType.SHOP_BUY_GUILD_PANEL).show(true);
				})
			}

		}
	}
}