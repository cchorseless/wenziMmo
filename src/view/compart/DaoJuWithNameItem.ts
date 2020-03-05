/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJuWithNameItem extends ui.compart.DaoJuWithNameItemUI {
		constructor() {
			super();
		}

		public setData(item: ProtoCmd.ItemBase, mode = EnumData.ItemInfoModel.SHOW_IN_MAIL,type=0): void {
			this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + item.dwBaseID).split('_')[0];
			this.lbl_itemName.color = ColorUtils.nameColor[SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY('' + item.dwBaseID)];
			// this.lbl_itemName.color
			this.ui_item.setData(item, mode);
		}
		public removeSelf() {
			let _item: ProtoCmd.ItemBase = this.ui_item.item;
			if (_item) {
				_item.clear();
				this.lbl_itemName.text = '';
			}
			return super.removeSelf();
		}
	}
}