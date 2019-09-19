/**Created by the LayaAirIDE*/
module view.dialog {
	export class BagHuiShouDialog extends ui.dialog.BagHuiShouDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {

			this.addEvent();
		}
		public addEvent(): void {
			this.img_bg.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})

		}
	}
}