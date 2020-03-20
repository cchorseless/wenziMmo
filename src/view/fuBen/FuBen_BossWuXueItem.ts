/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_BossWuXueItem extends ui.fuBen.FuBen_BossWuXueItemUI {
		constructor() {
			super();
		}
		public setData(skillID) {
			Log.trace(skillID);
			let icon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(skillID);
			let name = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(skillID);
			this.img_icon.skin = PathUtil.getSkillIconPath(icon);
			this.lab_name.text = name.split('_')[0];
		}

		public addEvent() {

		}
	}
}