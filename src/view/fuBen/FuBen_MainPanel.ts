/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_MainPanel extends ui.fuBen.FuBen_MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.initUI();
			this.addEvent();
		}

		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.showPanel(PanelManage.JuQingMode);
			});
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			EventManage.onWithEffect(this.btn_daily, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenDailyPanel();
			});
			EventManage.onWithEffect(this.btn_juQing, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenMainPanel();
			});
			EventManage.onWithEffect(this.btn_liLian, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenLiLianPanel();
			});
			EventManage.onWithEffect(this.btn_xianShi, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenXianShiPanel();
			});
		}


		public initUI(): void {
			this.panel_0.vScrollBarSkin = '';
			this.panel_1.hScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.hbox_1['sortItem'] = (items) => { };
			this.updatePianZhangInfo(GameApp.MainPlayer.pianZhangID);
		}

		/**
		 * 更新篇章
		 * @param index 
		 */
		public updatePianZhangInfo(pzID: number): void {
			// 拉取章节信息
			let pkt1 = new ProtoCmd.QuestClientData();
			pkt1.setString(ProtoCmd.JQ_GET_JQ_ZHANGJIE, [pzID], null, this,
				(jsonData: { pzid: number, pzname: string, charpterInfo: any }) => {
					if (jsonData.pzid == pzID) {
						// 篇章名字
						this.lbl_pianZhangName.text = jsonData.pzname;
						let keys = Object.keys(jsonData.charpterInfo);
						this.vbox_0.removeChildren();
						for (let key of keys) {
							let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = jsonData.charpterInfo[key];
							charpterInfo.index = key;
							let charpterTitle_ui = new view.compart.JuQingTitleItem();
							charpterTitle_ui.anchorX = 0;
							charpterTitle_ui.setData(charpterInfo);
							this.vbox_0.addChild(charpterTitle_ui);
							// 更新章节信息
							GameApp.GameEngine.allCharpterInfo[charpterInfo.zjid] = charpterInfo;
						}
					}
				});
			lcp.send(pkt1);
		}
	}
}