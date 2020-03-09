/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_logoItem extends ui.wuXue.WuXue_logoItemUI {
		constructor() {
			super();
		}
		public showligth(boo: boolean) {
			this.img_light.visible = boo;
		}
		public init(){
			this.img_skill_bg.skin ='';
			this.img_skillType.skin = '';
			this.img_skill_Icon.skin = '';
			this.img_shuxing.skin = '';
		}
		public setData(configID: string): void {
			let wuXing = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEXTRAPROP(configID);
			let icon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(configID);
			console.log('技能icon编号',icon)
			// let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(configID);
			let lv = SheetConfig.mydb_magic_tbl.getInstance(null).LEVEL(configID);
			this.lab_lv.text = lv + '';
			let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(configID);
			this.img_skill_bg.skin = 'image/common/fight/frane_jineng_' + quality+'.png'
			

			this.img_skill_Icon.skin = "image/common/skill/skill_icon_" + icon + ".png"
			let type = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLTYPE(configID);
			this.img_skillType.skin = "image/common/wuxue/img_" + type + ".png"
			if (wuXing > 0) {
				this.img_shuxing.visible = true;
				this.img_shuxing.skin = "image/common/wuxue/img_taolu" + (wuXing - 1) + ".png"
			} else {
				this.img_shuxing.visible = false;
			}

		}




	}
}