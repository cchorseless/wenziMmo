/**Created by the LayaAirIDE*/
module view.main {
	export class Main_SkillWithName extends ui.main.Main_SkillWithNameUI {
		constructor() {
			super();
		}
		public setData(configID: string): void {
			let wuXing = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEXTRAPROP(configID);
			let icon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(configID);
			// let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(configID);
			let lv = SheetConfig.mydb_magic_tbl.getInstance(null).LEVEL(configID);
			this.lab_lv.text = lv + '';
			let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(configID);
			let stage = SheetConfig.mydb_magic_tbl.getInstance(null).LEVEL(configID);
			let nameStr =  SheetConfig.mydb_magic_tbl.getInstance(null).NAME(configID);
			let name = nameStr.split('_')[0]
			this.html_name.style.fontSize =20;
			this.html_name.style.fontFamily = 'STkaiti';
			this.html_name.style.align = 'center'; 
			switch (quality) {
				case 1:
					this.img_skill_bg.skin = 'image/common/daoju/quality_1.png';
					if ((stage - 1) == 0) {
						this.html_name.innerHTML = "<span style='color:#4b674b;'>" + name + "</span>";
					} else {
						this.html_name.innerHTML = "<span style='color:#4b674b;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#4b674b'>" + (stage - 1) + "</span>";
					}
					break;
				case 2:
					this.img_skill_bg.skin = 'image/common/daoju/quality_2.png';
					if ((stage - 1) == 0) {
						this.html_name.innerHTML = "<span style='color:#4f5575;'>" + name + "</span>";
					} else {
						this.html_name.innerHTML = "<span style='color:#4f5575;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#4f5575'>" + (stage - 1) + "</span>";
					}
					break;
				case 3:
					this.img_skill_bg.skin = 'image/common/daoju/quality_3.png';
					if ((stage - 1) == 0) {
						this.html_name.innerHTML = "<span style='color:#6e4b70;'>" + name + "</span>";
					} else {
						this.html_name.innerHTML = "<span style='color:#6e4b70;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#6e4b70'>" + (stage - 1) + "</span>";
					}
					break;
				case 4:
					this.img_skill_bg.skin = 'image/common/daoju/quality_4.png';
					if ((stage - 1) == 0) {
						this.html_name.innerHTML = "<span style='color:#9f6b39;'>" + name + "</span>";
					} else {
						this.html_name.innerHTML = "<span style='color:#9f6b39;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#9f6b39'>" + (stage - 1) + "</span>";
					}
					break;
				case 5:
					this.img_skill_bg.skin = 'image/common/daoju/quality_6.png';
					if ((stage - 1) == 0) {
						this.html_name.innerHTML = "<span style='color:#8f3535;'>" + name + "</span>";
					} else {
						this.html_name.innerHTML = "<span style='color:#8f3535;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#8f3535'>" + (stage - 1) + "</span>";
					}
					break;
			}


			this.img_skill_Icon.skin = PathUtil.getSkillIconPath(icon);
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