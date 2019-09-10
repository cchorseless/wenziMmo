/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_DailyPanel extends ui.fuBen.FuBen_DailyPanelUI {
		constructor() {
			super();
		}


		public setData(): void {
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false)
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