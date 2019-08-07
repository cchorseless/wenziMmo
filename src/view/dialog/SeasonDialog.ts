/**Created by the LayaAirIDE*/
module view.dialog {
	export class SeasonDialog extends ui.dialog.SeasonDialogUI {
		constructor() {
			super();
		}
		public setData(data): SeasonDialog {
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_seasonClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}