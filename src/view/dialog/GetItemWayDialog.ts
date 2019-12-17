/**Created by the LayaAirIDE*/
module view.dialog {
	export class GetItemWayDialog extends ui.dialog.GetItemWayDialogUI {
		constructor() {
			super();
		}
		public setData(id): GetItemWayDialog {
			//道具
			let itemInfo = new ProtoCmd.ItemBase();
			itemInfo.dwBaseID = id;
			this.ui_item.setData(itemInfo);
			//名字
			this.lbl_name.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + id);
			this.lbl_lvl.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED('' + id) + '级';
			let sex = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMSEX('' + id);
			switch (sex) {
				case 0:
					this.lbl_sex.text = '不限';
					break;
				case 1:
					this.lbl_sex.text = '男';
					break;
				case 2:
					this.lbl_sex.text = '女';
					break;
			}
			this.lbl_des.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMBGDES('' + id);
			return this;
		}
	}
}