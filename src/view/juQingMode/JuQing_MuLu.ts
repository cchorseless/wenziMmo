/**
* name 
*/
module view.juQingMode {
	export class JuQing_MuLu extends ui.juQingMode.JuQing_MuLuUI {
		public isTouch = false;
		public touchBeginX = 0;
		public touchEndX = 0;
		constructor() {
			super();
			this.addEvent();
			this.panel_mulu.vScrollBarSkin = '';
			this.vBox_mulu['sortItem'] = (items) => { };
		}
		public setData() {
			this.html_BookName.style.fontFamily = 'STXingkai';
			this.html_BookName.style.fontSize = 30;
			this.html_BookName.style.align = 'center';
			this.html_BookName.style.color = '#3a302d';
			this.html_BookName.innerHTML = "<span>文字江湖</span>";
			this.vBox_mulu.removeChildren();
			let jsonData = GameApp.MainPlayer.allPianZhangInfo;
			let keys = Object.keys(jsonData);
			for (let key of keys) {
				let charpterInfo: ProtoCmd.itf_JUQING_PIANZHANG = jsonData[key];
				let ui_item = new JuQing_MuLuInfo();
				ui_item.setData(charpterInfo, parseInt(key));
				this.vBox_mulu.addChild(ui_item);
			}
			this.img_bg.left = this.img_showbg.width;
		}

		public updateUI() {
			let jsonData = GameApp.MainPlayer.allPianZhangInfo;
			let keys = Object.keys(jsonData);
			for (let key of keys) {
				let charpterInfo: ProtoCmd.itf_JUQING_PIANZHANG = jsonData[key];
				let ui_item = new JuQing_MuLuInfo();
				ui_item.setData(charpterInfo, parseInt(key));
			}
		}

		public addEvent() {
			this.img_touch.on(Laya.UIEvent.CLICK, this, function () {
				JuQingModePanel.self.closeMuLu();
			})
			this.on(Laya.Event.MOUSE_DOWN, this, function (e) {
				this.isTouch = true;
				this.touchBeginX = e.stageX;
			})
			this.on(Laya.UIEvent.MOUSE_UP, this, function (e) {
				if (this.isTouch) {
					this.touchEndX = e.stageX;
					let span = this.touchEndX - this.touchBeginX;
					if (span < -100) {
						JuQingModePanel.self.closeMuLu();
					} else {
						this.isTouch = false;
						return;
					}
				} else {
					return;
				}
			})
			this.on(Laya.UIEvent.MOUSE_OUT, this, function (e) {
				if (this.isTouch) {
					this.touchEndX = e.stageX;
					let span = this.touchEndX - this.touchBeginX;
					if (span > 100) {
						JuQingModePanel.self.closeMuLu();
					} else {
						this.isTouch = false;
						return;
					}
				} else {
					return;
				}
			})
		}
	}
}