/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_Cookie_Item extends ui.wuXue.WuXue_Cookie_ItemUI {
		constructor() {
			super();
		}
		public setData(id, num) {
			let itemname = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(id);
			this.img_bg.skin = 'image/common/daoju/quality_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(id) + '.png';
			let icon = SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(id);
			this.img_icon.skin = 'image/common/daoju/itemicon_' + icon + '.png';
			this.lab_name.text = itemname;
			this.lab_num.text = LangConfig.getBigNumberDes(num);
		}
	}
}