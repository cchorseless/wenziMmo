
/**Created by the LayaAirIDE*/
module view.dialog {
	export class WelcomeDialog extends ui.dialog.WelcomeDialogUI {
		constructor() {
			super();
		}
		public setData(): WelcomeDialog {

			this.addEvent()
			return this
		}
		public addEvent(): void {
			this.btn_startTask.on(Laya.UIEvent.CLICK, this, this.close)
		}
		public onClosed(type?: string): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.TASK_GET_FIRST_MAINTASK);
			lcp.send(pkt);
		}
	}
}