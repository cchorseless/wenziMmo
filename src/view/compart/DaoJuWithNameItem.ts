/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJuWithNameItem extends ui.compart.DaoJuWithNameItemUI {
		constructor() {
			super();
		}

		public setData(item: ProtoCmd.itf_ItemInfo): void {
			this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + item.itemid);
			this.ui_item.initUI(item, EnumData.ItemInfoModel.SHOW_IN_MAIL);
		}
		
	}
}