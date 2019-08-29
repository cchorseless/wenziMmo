/**Created by the LayaAirIDE*/
module view.tujian {
	export class TuJianEventPanel extends ui.tujian.TuJianEventPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_tujianEvent.vScrollBarSkin = '';
			this.vbox_tujianEvent['sortltem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_tujianEvent.addChild(new view.compart.TuJianEventItem);
			}
			this.addEvent();
		}
		public addEvent(): void {

			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.showPanel(PanelManage.JuQingMode);
			});
			this.btn_shiJianTJ.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTuJianEventPanel()
			});
			this.btn_diLiTJ.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTuJianPlacePanel()
			});
			this.btn_wuPinTJ.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTuJianDaojuPanel()
			});
			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
		}
	}
}