/**Created by the LayaAirIDE*/
module view.dialog {
	export class InfoV0Dialog extends ui.dialog.InfoV0DialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}