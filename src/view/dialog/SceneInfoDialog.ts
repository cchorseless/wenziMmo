/**Created by the LayaAirIDE*/
module view.dialog {
	export class SceneInfoDialog extends ui.dialog.SceneInfoDialogUI {
		constructor() {
			super();
		}

		public setData(data): SceneInfoDialog {
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}


	}
}