/**Created by the LayaAirIDE*/
module view.juese {
	export class JueSePanel extends ui.juese.JueSePanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => { PopUpManager.Dispose(this) });
		}
	}
}