/**Created by the LayaAirIDE*/
module view.compart {
	export class SkillItemWithName extends ui.compart.SkillItemWithNameUI {
		constructor() {
			super();
		}
		public setData(id, lvl): SkillItemWithName {

			let skillId = parseInt(id) * 100 + parseInt(lvl);
			let icon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(skillId);
			// 技能icon
			this.img_skill.skin = PathUtil.getSkillIconPath(icon);
			// 技能名称
			let _skillName = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(skillId).split('_')[0];
			this.lbl_name.text = '' + _skillName;
			// 技能品质
			let SKILLQUALITY = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(skillId);
			
			return this;
		}
	}
}