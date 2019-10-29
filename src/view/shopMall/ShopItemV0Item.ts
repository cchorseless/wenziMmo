/**Created by the LayaAirIDE*/
module view.shopMall {
	export class ShopItemV0Item extends ui.shopMall.ShopItemV0ItemUI {
		constructor() {
			super();
		}
		public item;
		public model;
		public setData(item: ProtoCmd.itf_Shop_ShopItem, model: EnumData.ShopBuyPanelType): void {
			this.item = item;
			this.model = model;
			// 道具ID
			let dwBaseID = '' + item.itemid;
			// 物品名称
			this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(dwBaseID);
			// 消耗货币图片
			this.img_coinPic.skin = 'image/main/icon_coin_' + item.pricetype + '.png';
			// 货币价格
			this.lbl_price.text = '' + Math.ceil(item.price * item.discount / 10);
			// 限购数量
			this.lbl_xianGou.text = '限购:' + item.curcnt + '/' + item.limitcnt;
			this.lbl_xianGou.visible = (item.limitcnt > 0);
			let _itemBase = new ProtoCmd.ItemBase();
			// 物品ID
			_itemBase.dwBaseID = item.itemid;
			// 是否绑定
			_itemBase.dwBinding = item.binding;
			// 物品数量
			_itemBase.dwCount = item.num;
			this.ui_item.setData(_itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
			this.addEvent();
		}

		public addEvent(): void {
			this.btn_buy.on(Laya.UIEvent.CLICK, this, this.buyShopItem);
		}

		public buyShopItem(): void {
			// 限购判定
			if (this.item.limitcnt > 0 && this.item.limitcnt == this.item.curcnt) {
				TipsManage.showTips('无法购买');
				return
			}
			let itemType = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMTYPE('' + this.item.itemid);
			// let itemInfoDialog: view.dialog.ShopBuyItemV0Dialog | view.dialog.ShopBuyItemV1Dialog;
			// // 根据物品类型显示不同界面
			// switch (itemType) {
			// 	// 材料
			// 	case EnumData.ItemTypeDef.ITEM_TYPE_NORMAL:
			// 		itemInfoDialog = new view.dialog.ShopBuyItemV0Dialog();
			// 		break;
			// 	// 装备
			// 	case EnumData.ItemTypeDef.ITEM_TYPE_EQUIP:
			// 		itemInfoDialog = new view.dialog.ShopBuyItemV1Dialog();
			// 		break;
			// 	// 消耗品
			// 	case EnumData.ItemTypeDef.ITEM_TYPE_DRUG:
			// 	case EnumData.ItemTypeDef.ITEM_TYPE_SKILL:
			// 	case EnumData.ItemTypeDef.ITEM_TYPE_MAZE:
			// 	case EnumData.ItemTypeDef.ITEM_TYPE_SCROLL:
			// 		itemInfoDialog = new view.dialog.ShopBuyItemV0Dialog();
			// 		break;
			// 	// 任务物品
			// 	case EnumData.ItemTypeDef.ITEM_TYPE_TASK:
			// 		itemInfoDialog = new view.dialog.ShopBuyItemV0Dialog();
			// 		break;
			// 	// 默认
			// 	default:
			// 		itemInfoDialog = new view.dialog.ShopBuyItemV0Dialog();
			// 		break;
			// }
			// itemInfoDialog.setData(this.item, this.model).show(true);
		}
	}
}