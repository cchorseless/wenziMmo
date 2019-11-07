/**Created by the LayaAirIDE*/
module view.dialog {
	export class SetUpDialog extends ui.dialog.SetUpDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.panel_shezhi.vScrollBarSkin='';
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}