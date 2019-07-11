/**Created by the LayaAirIDE*/
module view.dialog {
	export class NpcInfoDialog extends ui.dialog.NpcInfoDialogUI {
		constructor() {
			super();
			this.setData();
		}

		public setData(): void {

			this.addEvent();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => { this.visible = false });
		}
	}
}