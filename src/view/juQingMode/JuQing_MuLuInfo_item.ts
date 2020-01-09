/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQing_MuLuInfo_item extends ui.juQingMode.JuQing_MuLuInfo_itemUI {
		constructor() {
			super();
		}
		public setData(index, name, isLock, pid, zjid) {
			this.lab_charpterIndex.text = '第' + index + '章';
			this.lab_charpterName.text = name;
			if (isLock) {
				this.img_bg.skin = 'image/juQingMode/box_ml_02down.png'
				this.img_islock.visible = true;
				this.lab_pageNum.visible = false;
			} else {
				if (zjid == GameApp.MainPlayer.charpterID) {
					this.img_bg.skin = 'image/juQingMode/box_ml_02up.png'
					this.lab_charpterIndex.color = '#4a6b88'
					this.lab_charpterName.color = '#4a6b88'
					this.lab_pageNum.color = '#4a6b88'
				} else if (zjid < GameApp.MainPlayer.charpterID) {
					this.img_bg.skin = 'image/juQingMode/box_ml_02.png'
					this.lab_charpterIndex.color = '#8c6240'
					this.lab_charpterName.color = '#8c6240'
					this.lab_pageNum.color = '#8c6240'
				}
				else if (zjid > GameApp.MainPlayer.charpterID) {
					this.img_bg.skin = 'image/juQingMode/box_ml_02down.png'
					this.lab_charpterIndex.color = '#8c6240'
					this.lab_charpterName.color = '#8c6240'
					this.lab_pageNum.color = '#8c6240'
				}
				this.img_islock.visible = false;
				this.lab_pageNum.visible = true;
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