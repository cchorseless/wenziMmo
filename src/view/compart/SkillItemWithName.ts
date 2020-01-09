/**Created by the LayaAirIDE*/
module view.compart {
	export class SkillItemWithName extends ui.common.SkillItemWithNameUI {
		constructor() {
			super();
		}
		public setData(id,lvl): SkillItemWithName {
			//技能icon
			// let icon=SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(''+id);
			// this.img_skill.skin='image/common/skill/skill_icon_'+icon+'.png';
			//技能名称
			// let name=SheetConfig.mydb_magic_tbl.getInstance(null).NAME(''+id);
			// this.lbl_name.text=''+name;
			return this;
		}
	}
}