/**Created by the LayaAirIDE*/
module view.tujian {
	export class TuJianJuesePanel extends ui.tujian.TuJianJuesePanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_top.selectedIndex = index;
			}, null, false);
			this.panel_0.vScrollBarSkin = "";
			this.vbox_0['sortItem'] = (items) => { };
			this.panel_1.vScrollBarSkin = "";
			this.vbox_1['sortItem'] = (items) => { };
			this.panel_2.vScrollBarSkin = "";
			this.vbox_2['sortItem'] = (items) => { };
			this.addEvent();
		}
		public addEvent(): void {
			this.box_juese.on(Laya.UIEvent.CLICK, this, () => {
				new view.tujian.TuJianRewardDialog().popup(true);
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