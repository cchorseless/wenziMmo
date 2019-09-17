/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJuWithNameItem extends ui.compart.DaoJuWithNameItemUI {
		constructor() {
			super();
		}

		public setData(item: ProtoCmd.ItemBase): void {
			this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + item.dwBaseID);
			this.ui_item.setData(item, EnumData.ItemInfoModel.SHOW_IN_MAIL);
		}


		public initUI(item: ProtoCmd.itf_ItemInfo): void {
			this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + item.index);
			// // 去除响应事件
			// this.ui_item.model = EnumData.ItemInfoModel.SHOW_NONE;
			// // 是否绑定
			// this.ui_item.img_lock.visible = Boolean(item.binding);
			// // 物品ICON
			// this.ui_item.img_item.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID('' + item.index) + '.png';
			// // 底图
			// this.ui_item.img_bg.skin = 'image/common/daoju/quality_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY('' + item.index) + '.png';
			// // 物品数量
			// if (item.num && item.num > 1) {
			// 	this.ui_item.lbl_count.text = '' + item.num;
			// }
			// else {
			// 	this.ui_item.lbl_count.text = '';
			// }
		}
	}
}