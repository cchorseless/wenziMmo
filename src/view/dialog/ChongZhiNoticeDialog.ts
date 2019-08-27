/**Created by the LayaAirIDE*/
module view.dialog {
	export class ChongZhiNoticeDialog extends ui.dialog.ChongZhiNoticeDialogUI {
		constructor() {
			super();
		}
		public setData(): ChongZhiNoticeDialog {
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close);
		}
	}
}