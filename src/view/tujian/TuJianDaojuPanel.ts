/**Created by the LayaAirIDE*/
module view.tujian {
	export class TuJianDaojuPanel extends ui.tujian.TuJianDaojuPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_TuJianDaoju.vScrollBarSkin = "";
			this.vbox_TuJianDaoju['sortItem'] = (items) => { };
			this.addEvent();
		}
		public addEvent(): void {
			this.box_daoju.on(Laya.UIEvent.CLICK, this, () => {
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
			this.btn_jueSeTJ.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTuJianJuesePanel()
			});
			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});

		}
	}
}