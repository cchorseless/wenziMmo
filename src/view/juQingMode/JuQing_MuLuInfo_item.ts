/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQing_MuLuInfo_item extends ui.juQingMode.JuQing_MuLuInfo_itemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public isLock = false;
		public charpterID;
		public setData(index, name, isLock, pid, zjid) {
			this.lab_charpterIndex.text = '第' + index + '章';
			this.lab_charpterName.text = name;
			this.isLock = isLock;
			this.charpterID = zjid;
			if (isLock) {
				this.img_bg.skin = 'image/juQingMode/box_ml_02down.png'
				this.img_islock.visible = true;
				this.lab_pageNum.visible = false;
			}
			else {
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
				let pages = GameApp.MainPlayer.allCharpterInfo[zjid].maxPage;
				this.lab_pageNum.text = pages + '页';
			}
		}

		public addEvent() {
			this.on(Laya.UIEvent.CLICK, this, () => {
				if (!this.isLock) {
					if (this.charpterID <= GameApp.MainPlayer.charpterID) {
						JuQingModePanel.self.changeCharpter(this.charpterID);
					}
				}
				else{
					TipsManage.showTips('剧情尚未解锁');
				}

			})
		}
	}
}