/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_LiLianPanel extends ui.fuBen.FuBen_LiLianPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_top.selectedIndex = index;
			}, null, false);
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.panel_1.vScrollBarSkin = '';
			this.vbox_1['sortItem'] = (items) => { };
			this.panel_2.vScrollBarSkin = '';
			this.vbox_2['sortItem'] = (items) => { };
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
	}
}