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
		public removeSelf() {
			let _item: ProtoCmd.ItemBase = this.ui_item.item;
			if (_item) {
				_item.clear();
			}
			return super.removeSelf();
		}
	}
}