/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_logoItem extends ui.wuXue.WuXue_logoItemUI {
		constructor() {
			super();
		}
		public showligth(boo: boolean) {
			this.img_light.visible = boo;
		}
		public setData(configID: string): void {
			let wuXing = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEXTRAPROP(configID);
			let icon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(configID);
			// let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(configID);
			let lv = SheetConfig.mydb_magic_tbl.getInstance(null).LEVEL(configID);
			this.lab_lv.text = lv + '';
			let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(configID);
			switch (quality) {
				case 1:
					this.img_skill_bg.skin = 'image/common/daoju/quality_1.png'
					break;
				case 2:
					this.img_skill_bg.skin = 'image/common/daoju/quality_2.png'
					break;
				case 3:
					this.img_skill_bg.skin = 'image/common/daoju/quality_3.png'
					break;
				case 4:
					this.img_skill_bg.skin = 'image/common/daoju/quality_4.png'
					break;
				case 5:
					this.img_skill_bg.skin = 'image/common/daoju/quality_6.png'
					break;
			}
			

			// this.img_skill_Icon.skin = "image/common/skill/skill_icon_" + icon + ".png"
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