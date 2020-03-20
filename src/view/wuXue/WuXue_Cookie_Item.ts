/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_Cookie_Item extends ui.wuXue.WuXue_Cookie_ItemUI {
		constructor() {
			super();
		}
		public setData(id, num) {
			let itemname = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(id);
			this.img_bg.skin = PathUtil.getItemQualityFramePath(SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(id));
			let icon = SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(id);
			this.img_icon.skin = PathUtil.getItemIconPath(icon);
			this.lab_name.text = itemname;
			this.lab_num.text = LangConfig.getBigNumberDes(num);
		}
	}
}