/**Created by the LayaAirIDE*/
module view.dialog {
	export class WuXueWaigongDialog extends ui.dialog.WuXueWaigongDialogUI {
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