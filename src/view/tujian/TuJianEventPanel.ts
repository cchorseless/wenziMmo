/**Created by the LayaAirIDE*/
module view.tujian {
	export class TuJianEventPanel extends ui.tujian.TuJianEventPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_top.selectedIndex = index;
			}, null, false);
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortltem'] = (items) => { };
			this.panel_1.vScrollBarSkin = '';
			this.vbox_1['sortltem'] = (items) => { };
			this.panel_2.vScrollBarSkin = '';
			this.vbox_2['sortltem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_0.addChild(new view.compart.TuJianEventItem);
				this.vbox_1.addChild(new view.compart.TuJianEventItem);
				this.vbox_2.addChild(new view.compart.TuJianEventItem);
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