/**Created by the LayaAirIDE*/
module view.dialog {
	export class PlayerTagDialog extends ui.dialog.PlayerTagDialogUI {
		constructor() {
			super();
			this.addEvent()
		}
		public setData(id): PlayerTagDialog {
			this.lab_content.text = SheetConfig.Label.getInstance(null).INTRODUCE(id);
			this.lbl_title.text = SheetConfig.Label.getInstance(null).NAME(id);
			return this;
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}

	}
}