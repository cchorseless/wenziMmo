/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenPanel extends ui.fuBen.FuBenPanelUI {
		constructor() {
			super();
		}
		public setData(): void {

			this.addEvent();
		}

		public addEvent(): void {
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.showPanel(PanelManage.JuQingMode);
			});
			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			})
		}
	}
}