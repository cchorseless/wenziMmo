/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_Buff_Item extends ui.wuXue.WuXue_Buff_ItemUI {
		constructor() {
			super();
		}
		public setData(id, skillConfigID) {
			let icon = SheetConfig.mydb_magicbuff_tbl.getInstance(null).BUFFSMALLICON(id);
			this.img_BuffIcon.skin =PathUtil.getIconBuffPath(icon);
			let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(skillConfigID);
			this.img_bg.skin = PathUtil.getSkillIconFramePath(quality);
			



		}
	}
}