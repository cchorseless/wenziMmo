/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQing_MuLuInfo_item extends ui.juQingMode.JuQing_MuLuInfo_itemUI {
		constructor() {
			super();
		}
		public setData(index, name, isLock, pid) {
			this.lab_charpterIndex.text = '第' + index + '章';
			this.lab_charpterName.text = name;
			if (isLock) {
				this.img_islock.visible = true;
				this.img_showPage.visible = false;
			} else {
				this.img_islock.visible = false;
				this.img_showPage.visible = true;
				let pages = 0;
				let arr = GameApp.MainPlayer.pagesNum;
				for (let i in GameApp.MainPlayer.pagesNum) {
					if ((pid * 100 + index) >= parseInt(i)) {
						pages += GameApp.MainPlayer.pagesNum[i]
					}
				}
				this.lab_pageNum.text = pages + '';
			}
		}
	}
}