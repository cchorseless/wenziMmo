/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_logoWithNameItem extends ui.wuXue.WuXue_logoWithNameItemUI {
		constructor() {
			super();
		}

		public configID;
		public setData(skillID) {
			this.configID = skillID;
			this.html_name.visible = true;
			this.ui_item.visible = true;
			this.img_quality.visible = true;
			let stage = SheetConfig.mydb_magic_tbl.getInstance(null).LEVEL(this.configID);
			this.html_name.style.align = 'center';
			this.html_name.style.fontFamily = 'STKaiti';
			this.html_name.style.fontSize = 20;

			let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(this.configID);
			if (!quality) {
				quality = 1;
			}
			let name = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(this.configID);
			name = name.split('_')[0];
			switch (quality) {
				case 1:
					if ((stage - 1) == 0) {
						this.html_name.innerHTML = "<span style='color:#4b674b;'>" + name + "</span>"
					} else {
						this.html_name.innerHTML = "<span style='color:#4b674b;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#4b674b'>+" + (stage - 1) + "</span>"
					}
					break;
				case 2:
					if ((stage - 1) == 0) {
						this.html_name.innerHTML = "<span style='color:#4f5575;'>" + name + "</span>"
					} else {
						this.html_name.innerHTML = "<span style='color:#4f5575;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#4f5575'>+" + (stage - 1) + "</span>"
					}
					break;
				case 3:
					if ((stage - 1) == 0) {
						this.html_name.innerHTML = "<span style='color:#6e4b70;'>" + name + "</span>"
					} else {
						this.html_name.innerHTML = "<span style='color:#6e4b70;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#6e4b70'>+" + (stage - 1) + "</span>"
					}
					break;
				case 4:
					if ((stage - 1) == 0) {
						this.html_name.innerHTML = "<span style='color:#9f6b39;'>" + name + "</span>"
					} else {
						this.html_name.innerHTML = "<span style='color:#9f6b39;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#9f6b39'>+" + (stage - 1) + "</span>"
					}
					break;
				case 5:
					if ((stage - 1) == 0) {
						this.html_name.innerHTML = "<span style='color:#8f3535;'>" + name + "</span>"
					} else {
						this.html_name.innerHTML = "<span style='color:#8f3535;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#8f3535'>+" + (stage - 1) + "</span>"
					}
					break;
			}
			this.img_quality.skin = 'image/common/wuxue/wuxue_quality_' + quality + '.png'
			this.ui_item.setData(this.configID);
		}
	}
}