/**Created by the LayaAirIDE*/
module view.shopMall {
	export class ShopItemV2Item extends ui.shopMall.ShopItemV2ItemUI {
		constructor() {
			super();
		}
		public item;
		public setData(item: ProtoCmd.itf_Shop_RefreshResult): void {
			this.item = item;
			//物品
			let itemInfo = new ProtoCmd.ItemBase;
			itemInfo.dwBaseID = item.itemid;
			itemInfo.dwCount = item.num;
			itemInfo.dwBinding = item.binding;
			this.ui_daoju.setData(itemInfo)
			//物品名称
			let name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + item.itemid)
			this.lbl_name.text = '' + name;
			//物品价格
			this.lbl_price.text = '' + item.price;
			//物品货币类型
			switch (item.pricetype) {
				case EnumData.CoinType.COIN_TYPE_YUANBAO:
					this.img_huobi.skin = 'image/main/icon_coin_' +item.pricetype+ '.png';
					break;
				case EnumData.CoinType.COIN_TYPE_YUANBAOLOCK:
					this.img_huobi.skin =  'image/main/icon_coin_' +item.pricetype+ '.png';
					break;
				case EnumData.CoinType.COIN_TYPE_GOLD:
					this.img_huobi.skin =  'image/main/icon_coin_' +item.pricetype+ '.png';
					break;
				case EnumData.CoinType.COIN_TYPE_HONOR:
					this.img_huobi.skin = 'image/main/icon_coin_' + item.pricetype+'.png';
					break;
				case EnumData.CoinType.COIN_TYPE_GUILDSORCE:
					this.img_huobi.skin =  'image/main/icon_coin_' +item.pricetype+ '.png';
					break;

			}
			this.addEvent(item.itemid);
		}
		public addEvent(id): void {
			// this.on(Laya.UIEvent.CLICK, this, () => {
			// 	let itemType = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMTYPE('' + id);
			// 	let itemInfoDialog: view.dialog.ShopBuyItemV0Dialog | view.dialog.ShopBuyItemV1Dialog;
			// 	// 根据物品类型显示不同界面
			// 	switch (itemType) {
			// 		// 材料
			// 		case EnumData.ItemTypeDef.ITEM_TYPE_NORMAL:
			// 			itemInfoDialog = new view.dialog.ShopBuyItemV0Dialog();
			// 			break;
			// 		// 装备
			// 		case EnumData.ItemTypeDef.ITEM_TYPE_EQUIP:
			// 			itemInfoDialog = new view.dialog.ShopBuyItemV1Dialog();
			// 			break;
			// 		// 消耗品
			// 		case EnumData.ItemTypeDef.ITEM_TYPE_DRUG:
			// 		case EnumData.ItemTypeDef.ITEM_TYPE_SKILL:
			// 		case EnumData.ItemTypeDef.ITEM_TYPE_MAZE:
			// 		case EnumData.ItemTypeDef.ITEM_TYPE_SCROLL:
			// 			itemInfoDialog = new view.dialog.ShopBuyItemV0Dialog();
			// 			break;
			// 		// 任务物品
			// 		case EnumData.ItemTypeDef.ITEM_TYPE_TASK:
			// 			itemInfoDialog = new view.dialog.ShopBuyItemV0Dialog();
			// 			break;
			// 		// 默认
			// 		default:
			// 			itemInfoDialog = new view.dialog.ShopBuyItemV0Dialog();
			// 			break;
			// 	}
			// 	itemInfoDialog.setData(this.item, EnumData.ShopBuyPanelType.SHOP_BUY_HOT_PANEL).show(true);
			// })
		}
	}
}