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
		}
		public async setData(volumeIDArr) {
			this.html_BookName.style.fontFamily = 'STXingkai';
			this.html_BookName.style.fontSize = 30;
			this.html_BookName.style.align = 'center';
			this.html_BookName.style.color = '#3a302d';
			this.html_BookName.innerHTML = "<span>文字江湖</span>";
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JQ_GET_JQ_PIANZHANG, null, null, this, (jsonData) => {
				this.vBox_mulu.removeChildren();
				let keys = Object.keys(jsonData);
				for (let key of keys) {
					let charpterInfo: ProtoCmd.itf_JUQING_PIANZHANG = jsonData[key];
					let ui_item = new JuQing_MuLuInfo();
					ui_item.setData(charpterInfo, parseInt(key));
					this.vBox_mulu.addChild(ui_item);
				}
			})
			lcp.send(pkt);
			this.img_bg.left = this.img_showbg.width;
		}
		public addEvent() {
			this.img_touch.on(Laya.UIEvent.CLICK, this, function () {
				JuQingModePanel.self.muluShow = !JuQingModePanel.self.muluShow
				Laya.Tween.to(JuQingModePanel.self.muluItem, { x: -1 * JuQingModePanel.self.muluItem.width }, 300, null, Laya.Handler.create(this, () => {
					JuQingModePanel.self.muluItem.visible = this.muluShow;
				}))
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
						JuQingModePanel.self.muluShow = !JuQingModePanel.self.muluShow
						Laya.Tween.to(JuQingModePanel.self.muluItem, { x: -1 * JuQingModePanel.self.muluItem.width }, 300, null, Laya.Handler.create(this, () => {
							JuQingModePanel.self.muluItem.visible = this.muluShow;
						}))
					} else {
						this.isTouch = false;
						return;
					}
				} else {
					return;
				}
			})
			this.on(Laya.UIEvent.MOUSE_UP, this, function (e) {
				if (this.isTouch) {
					this.touchEndX = e.stageX;
					let span = this.touchEndX - this.touchBeginX;
					if (span > 100) {
						JuQingModePanel.self.muluShow = !JuQingModePanel.self.muluShow
						Laya.Tween.to(JuQingModePanel.self.muluItem, { x: -1 * JuQingModePanel.self.muluItem.width }, 300, null, Laya.Handler.create(this, () => {
							JuQingModePanel.self.muluItem.visible = this.muluShow;
						}))
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