/**Created by the LayaAirIDE*/
module view.dialog {
	export class WuXueNeigongDialog extends ui.dialog.WuXueNeigongDialogUI {
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