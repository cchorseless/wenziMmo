/**Created by the LayaAirIDE*/
module view.compart {
	export class SkillItemWithName extends ui.compart.SkillItemWithNameUI {
		constructor() {
			super();
		}
		public setData(id, lvl): SkillItemWithName {
			let data = SheetConfig.mydb_magic_tbl.getInstance(null).getAllData(parseInt(id));
			//技能icon
			this.img_skill.skin = 'image/common/skill/skill_icon_' + data[55] + '.png';
			//技能名称
			this.lbl_name.text=''+data[2];
			return this;
		}
	}
}