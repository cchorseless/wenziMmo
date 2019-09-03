/**Created by the LayaAirIDE*/
module view.dialog {
	export class ChapterListDialog extends ui.dialog.ChapterListDialogUI {
		constructor() {
			super();
		}
		public setData(): ChapterListDialog {
			this.panel_chapterList.vScrollBarSkin = "";
			this.vbox_chapterList['sortItem'] = (items) => { };
			this.initUI()
			this.addEvent();
			return this;
		}

		public addEvent(): void {
			this.btn_chapterListClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}

		public initUI(): void {
			// 拉取篇章目录进度
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JQ_GET_JQ_PIANZHANG, null, null, this, (jsonData) => {
				this.vbox_chapterList.removeChildren();
				let keys = Object.keys(jsonData);
				for (let key of keys) {
					let charpterInfo: ProtoCmd.itf_JUQING_PIANZHANG = jsonData[key];
					let ui_item = new view.compart.JuQingCharpterInfoItem();
					ui_item.setData(charpterInfo);
					this.vbox_chapterList.addChild(ui_item);
				}
			})
			lcp.send(pkt);
		}
	}
}