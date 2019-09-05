
module view.juQing {
	export class JuQingInfoPanel extends ui.juQing.JuQingInfoPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			
			this.initUI();
			// for (let i = 0; i < 6; i++) {
			// 	let titleItem = new view.compart.JuQingTitleItem();
			// 	this.vbox_left.addChild(titleItem);
			// }
			this.addEvent();
		}


		public addEvent(): void {
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.showPanel(PanelManage.JuQingMode);
			});
			this.btn_modeChange.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			this.btn_pianZhang.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.ChapterListDialog().setData().popup(true);
			});

		}


		public initUI(): void {
			// 拉取章节信息
			let pkt1 = new ProtoCmd.QuestClientData();

			pkt1.setString(ProtoCmd.JQ_GET_JQ_ZHANGJIE, [GameApp.MainPlayer.pianZhangID], null, this,
				(jsonData: { pzid: number, charpterInfo: number }) => {
					if (jsonData.pzid == GameApp.MainPlayer.pianZhangID) {
						

					}
					console.log(jsonData);
				});

			lcp.send(pkt1);
		}
	}
}