/**Created by the LayaAirIDE*/
module view.tianJian {
	export class TianJianPanel extends ui.tianJian.TianJianPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.addEvent();
		}

		public addEvent(): void {
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.showPanel(PanelManage.JuQingMode);
			}); this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
		}
	}
}