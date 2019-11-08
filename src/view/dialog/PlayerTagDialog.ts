/**Created by the LayaAirIDE*/
module view.dialog {
	export class PlayerTagDialog extends ui.dialog.PlayerTagDialogUI {
		constructor() {
			super();
			this.addEvent()
		}
		private addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
		public setData(id) {
			let o = GameApp.MainPlayer.xingGeInfo[id].id
			this.lab_content.text = SheetConfig.Label.getInstance(null).INTRODUCE(o);
			this.lbl_title.text = SheetConfig.Label.getInstance(null).NAME(o);
		}
	}
}