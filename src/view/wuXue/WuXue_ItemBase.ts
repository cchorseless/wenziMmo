/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_ItemBase extends ui.wuXue.WuXue_ItemBaseUI {
		constructor() {
			super();
		}
		public setData(configID) {
			let icon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(configID);
			let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(configID);
			this.img_bg.skin = "image/common/skill/icon_jnzd_xiao" + quality + ".png"
			this.img_icon.skin = "image/common/skill/skill_icon_" + icon + ".png"
		}
	}
}