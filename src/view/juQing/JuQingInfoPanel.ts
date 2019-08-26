
module view.juQing {
	export class JuQingInfoPanel extends ui.juQing.JuQingInfoPanelUI {
		constructor() {
			super();
		}
		public setData(): void {

		}


		public addEvent(): void {
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.Dispose(this);
			})
		}
	}
}