/**Created by the LayaAirIDE*/
module view.dialog {
	export class ZhaiYuan_lianQiDialog extends ui.dialog.ZhaiYuan_lianQiDialogUI {
		constructor() {
			super();
		}
		public setData(): ZhaiYuan_lianQiDialog {

			this.addEvent()
			return this
		}
		public addEvent(): void {

			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close)
		}
	}
}