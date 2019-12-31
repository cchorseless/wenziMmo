/**
* name 
*/
module view.juQingMode {
	export class JuQing_MuLu extends ui.juQingMode.JuQing_MuLuUI {
		constructor() {
			super();
			this.addEvent();
			this.panel_mulu.vScrollBarSkin = '';
		}
		public async setData(volumeIDArr) {
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
		}
	}
}