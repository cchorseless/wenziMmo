/**Created by the LayaAirIDE*/
module view.tujian {
	export class TuJianJuesePanel extends ui.tujian.TuJianJuesePanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_TuJianJuese.vScrollBarSkin = "";
			this.vbox_TuJianJuese['sortItem'] = (items) => { };
			this.addEvent();
		}
		public addEvent(): void {
			this.box_juese.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.TuJianRewardDialog().popup(true);
			});
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