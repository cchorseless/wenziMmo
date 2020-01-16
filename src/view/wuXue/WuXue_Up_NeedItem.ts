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
			this.img_icon.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(id) + '.png';
			// 底图
			this.img_bg.skin = 'image/common/daoju/quality_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(id) + '.png';

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