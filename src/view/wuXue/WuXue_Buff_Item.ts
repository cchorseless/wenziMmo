/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_Buff_Item extends ui.wuXue.WuXue_Buff_ItemUI {
		constructor() {
			super();
		}
		public setData(id, skillConfigID) {
			let icon = SheetConfig.mydb_magicbuff_tbl.getInstance(null).BUFFSMALLICON(id);
			// "image/common/iconbuff/buff_2005.png"
			this.img_BuffIcon.skin ='image/common/iconbuff/buff_'+icon+'.png';
			let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(skillConfigID);
			this.img_bg.skin = PathUtil.getSkillIconFramePath(quality);
			



		}
	}
}