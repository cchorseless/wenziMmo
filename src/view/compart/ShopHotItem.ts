/**Created by the LayaAirIDE*/
module view.compart {
	export class ShopHotItem extends ui.compart.ShopHotItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.itf_Shop_ShopItem
		public setData(item: ProtoCmd.itf_Shop_ShopItem): void {
			this.item = item;
			// 折扣
			this.lbl_cutDes.text = '' + item.discount + '折';
			// 价格
			this.lbl_price.text = '' + item.price;
			// 货币类型
			this.img_coin.skin = 'image/common/icon_common_jinbi01.png';
			// 道具数量
			this.ui_item.lbl_count.text = '' + item.num;
			// 道具ICON
			this.ui_item.img_item.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID('' + item.itemid) + '.png';
			// 是否绑定
			this.ui_item.img_lock.visible = Boolean(item.binding);
			// 道具底图
			this.ui_item.img_bg.skin = 'image/common/daoju/quality_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY('' + item.itemid) + '.png';
			this.addEvent()
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				let itemType = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMTYPE('' + this.item.itemid);
				let itemInfoDialog;
				// 根据物品类型显示不同界面
				switch (itemType) {
					// 材料
					case EnumData.ItemTypeDef.ITEM_TYPE_NORMAL:
						itemInfoDialog = new view.dialog.ShopBuyItemV0Dialog();
						break;
					// 装备
					case EnumData.ItemTypeDef.ITEM_TYPE_EQUIP:
						itemInfoDialog = new view.dialog.ShopBuyItemV0Dialog();
						break;
					// 消耗品
					case EnumData.ItemTypeDef.ITEM_TYPE_DRUG:
					case EnumData.ItemTypeDef.ITEM_TYPE_SKILL:
					case EnumData.ItemTypeDef.ITEM_TYPE_MAZE:
					case EnumData.ItemTypeDef.ITEM_TYPE_SCROLL:
						itemInfoDialog = new view.dialog.ShopBuyItemV0Dialog();
						break;
					// 任务物品
					case EnumData.ItemTypeDef.ITEM_TYPE_TASK:
						itemInfoDialog = new view.dialog.ShopBuyItemV0Dialog();
						break;
					// 默认
					default:
						itemInfoDialog = new view.dialog.ShopBuyItemV0Dialog();
						break;
				}
				itemInfoDialog.setData(this.item).show(true);
			})
		}
	}
}