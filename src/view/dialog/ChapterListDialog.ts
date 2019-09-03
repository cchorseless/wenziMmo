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
				console.log(jsonData);
			})
			lcp.send(pkt);
		}
	}
}