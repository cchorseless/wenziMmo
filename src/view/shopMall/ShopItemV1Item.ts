/**Created by the LayaAirIDE*/
module view.shopMall {
	export class ShopItemV1Item extends ui.shopMall.ShopItemV1ItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.itf_Shop_ShopItem;
		public setData(item: ProtoCmd.itf_Shop_ShopItem): void {
			this.item = item;
			// 折扣
			if (item.discount > 0) { this.img_zheKou.skin = 'image/common/img_' + item.discount + 'zhe.png'; }
			else {
				this.img_zheKou.visible = false;
				this.box_daZhe.visible = false;
			}
			// 价格
			this.lbl_price.text = '' + Math.ceil(item.price * item.discount / 10);
			// 原价
			this.lbl_oldPrice.text = '' + item.price;
			// 货币类型
			this.img_coin.skin = 'image/main/icon_coin_' + item.pricetype + '.png';
			// 道具数量
			this.ui_item.lbl_count.text = '' + item.num;
			// 道具ICON
			this.ui_item.img_item.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID('' + item.itemid) + '.png';
			// 是否绑定
			this.ui_item.img_lock.visible = Boolean(item.binding);
			// 道具底图
			this.ui_item.img_bg.skin = 'image/common/daoju/quality_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY('' + item.itemid) + '.png';
			// 是否可以购买
			// this.disabled = (item.limitcnt <= item.curcnt);
			this.hasSale.visible = !(item.limitcnt <= item.curcnt);
			this.isSellOut.visible = (item.limitcnt <= item.curcnt);
			this.ui_item.disabled = (item.limitcnt <= item.curcnt);
			this.addEvent()
		}
		public addEvent(): void {
			this.ui_item.on(Laya.UIEvent.CLICK, this, () => {
				let itemType = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMTYPE('' + this.item.itemid);
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
				itemInfoDialog.setData(this.item, EnumData.ShopBuyPanelType.SHOP_BUY_HOT_PANEL).show(true);
			})
		}
	}
}