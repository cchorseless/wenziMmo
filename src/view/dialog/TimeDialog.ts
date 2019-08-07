/**Created by the LayaAirIDE*/
module view.dialog {
	export class TimeDialog extends ui.dialog.TimeDialogUI {
		constructor() {
			super();
		}
		public setData(data): TimeDialog {
			this.addEvent();
			return this
		}
		public addEvent(): void {
			this.btn_timeClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}