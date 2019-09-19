/**Created by the LayaAirIDE*/
module view.dialog {
	export class JuQingEventDialog extends ui.dialog.JuQingEventDialogUI {
		constructor() {
			super();
		}

		public setData(): JuQingEventDialog {
			this.addEvent();
			return this;
		}

		public addEvent(): void {
			// 剧情进度
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, this.close);

		}
	}
}