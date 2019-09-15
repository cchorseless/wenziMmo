
module view.juQing {
	export class JuQingInfoPanel extends ui.juQing.JuQingInfoPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_left.vScrollBarSkin = '';
			this.vbox_left['sortItem'] = (items) => { };
			this.panel_0.vScrollBarSkin = '';
			this.panel_1.vScrollBarSkin = '';
			this.panel_event.vScrollBarSkin = '';
			this.hbox_0['sortItem'] = (items) => { };
			this.hbox_1['sortItem'] = (items) => { };
			this.hbox_event['sortItem'] = (items) => { };
			this.initUI();
			this.addEvent();
		}


		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.showPanel(PanelManage.JuQingMode);
			});
			EventManage.onWithEffect(this.btn_modeChange, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			EventManage.onWithEffect(this.btn_pianZhang, Laya.UIEvent.CLICK, this, () => {
				new view.dialog.ChapterListDialog().setData().popup(true);
			});
			EventManage.onWithEffect(this.btn_rank, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openRankMainPanel();
			});
			EventManage.onWithEffect(this.btn_yinDao, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openYinDaoPanel();
			});
			EventManage.onWithEffect(this.btn_zhiNan, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openZhiNanPanel();
			});

		}


		public initUI(): void {
			// 拉取章节信息
			let pkt1 = new ProtoCmd.QuestClientData();
			pkt1.setString(ProtoCmd.JQ_GET_JQ_ZHANGJIE, [GameApp.MainPlayer.pianZhangID], null, this,
				(jsonData: { pzid: number, charpterInfo: any }) => {
					if (jsonData.pzid == GameApp.MainPlayer.pianZhangID) {
						let keys = Object.keys(jsonData.charpterInfo);
						for (let key of keys) {
							let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = jsonData.charpterInfo[key];
							charpterInfo.index = key;
							let charpterTitle_ui = new view.compart.JuQingTitleItem();
							charpterTitle_ui.setData(charpterInfo);
							this.vbox_left.addChild(charpterTitle_ui);
							// 更新章节信息
							GameApp.GameEngine.allCharpterInfo[charpterInfo.zjid] = charpterInfo;
						}
					}
				});
			lcp.send(pkt1);
		}

		/**
		 * 更新右侧界面
		 * @param zjID 
		 */
		public updateRightInfo(zjID: number): void {
			if (GameApp.GameEngine.allCharpterInfo[zjID] == null) { return };
			let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = GameApp.GameEngine.allCharpterInfo[zjID];
			this.lbl_coinXl.text = '金币:' + charpterInfo.items

		}
	}
}