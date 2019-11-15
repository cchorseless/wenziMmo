/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_logoItem extends ui.wuXue.WuXue_logoItemUI {
		constructor() {
			super();
		}
		public showligth(boo:boolean){
			this.img_light.visible = boo;
		}
		public setData(configID: string): void {
			let wuXing = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEXTRAPROP(configID);
			let icon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(configID);
			let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(configID);
			this.img_skill_bg.skin = "image/common/skill/icon_jnzd_xiao" + quality + ".png"
			this.img_skill_Icon.skin = "image/common/skill/skill_icon_" + icon + ".png"
			this.img_shuxing.skin = "image/common/skill/icon_wx_" + wuXing + ".png"
		}



	}
}