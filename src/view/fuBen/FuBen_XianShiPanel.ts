/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_XianShiPanel extends ui.fuBen.FuBen_XianShiPanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.btn_xianShi.selected = true;
			this.panel_xianshi.vScrollBarSkin = '';
			this.vbox_xianshi['sortItem'] = (items) => { };
			this.addEvent();
			this.init_xianshi();
		}

		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				FuBen_MainPanel.backPanel()
			});
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			EventManage.onWithEffect(this.btn_daily, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenDailyPanel();
			});
			EventManage.onWithEffect(this.btn_juQing, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenMainPanel(FuBen_MainPanel.fromStr);
			});
			EventManage.onWithEffect(this.btn_liLian, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenLiLianPanel();
			});
			EventManage.onWithEffect(this.btn_xianShi, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenXianShiPanel();
			});
		}
		/**
     * 限时副本打开
     * 
     */
		public init_xianshi(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_LimitActivities, null, null, this, (jsonData) => {
				let keys = Object.keys(jsonData.state);
				this.vbox_xianshi.removeChildren();
				for (let key of keys) {
					let data = jsonData.state[key]
					this.vbox_xianshi.addChild(new view.fuBen.FuBen_XianShiItem().setData(data.id, jsonData.now));
				}
			})
			lcp.send(pkt);
		}

	}
}