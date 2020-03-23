/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_Up_NeedItem extends ui.wuXue.WuXue_Up_NeedItemUI {
		constructor() {
			super();
		}
		public setData(id, needNum, hasNum) {
			let name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(id);
			this.lab_name.text = name;
			// 物品ICON
			this.img_icon.skin = PathUtil.getItemIconPath(SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(id));
			// 底图
			this.img_bg.skin = PathUtil.getItemQualityFramePath(SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(id));

			let span = hasNum - needNum;
			if (span >= 0) {
				this.lab_num.color = '#38ad32';
			} else {
				this.lab_num.color = '#bf4747';
			}
			this.lab_num.text = needNum + '/' + LangConfig.getBigNumberDes(hasNum);

		}
	}
}