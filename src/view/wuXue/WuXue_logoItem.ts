/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_logoItem extends ui.wuXue.WuXue_logoItemUI {
		constructor() {
			super();
		}
		public showligth(boo: boolean) {
			this.img_light.visible = boo;
		}
		public init() {
			this.img_skill_bg.skin = '';
			this.img_skillType.skin = '';
			this.img_skill_Icon.skin = '';
			this.img_shuxing.skin = '';
		}
		public setData(configID: string): void {
			let icon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(configID);
			let lv = SheetConfig.mydb_magic_tbl.getInstance(null).LEVEL(configID);
			this.lab_lv.text = lv + '';
			let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(configID);
			this.img_skill_bg.skin = 'image/common/fight/frane_jineng_' + quality + '.png'
			this.img_skill_Icon.skin = PathUtil.getSkillIconPath(icon);
			let type = SheetConfig.mydb_magic_tbl.getInstance(null).INJURY_TYPE(configID);
			// 技能 伤害类型
			this.img_skillType.skin = "image/common/wuxue/img_" + type + ".png";
			// 技能类型
			let SKILLTYPE = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLTYPE(configID);
			this.img_shuxing.skin = "image/common/wuxue/img_taolu" + SKILLTYPE + ".png"


		}

		public addEvent() {

		}


	}
}