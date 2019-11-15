
/**Created by the LayaAirIDE*/
module view.dialog {
	export class WelcomeDialog extends ui.dialog.WelcomeDialogUI {
		constructor() {
			super();
		}
		public setData(str): WelcomeDialog {
			this.lbl_des.text = str;
			this.addEvent()
			return this
		}
		public addEvent(): void {
			this.btn_startTask.on(Laya.UIEvent.CLICK, this, this.close)
		}
		public onClosed(type?: string): void {
			// 领取第一个任务
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.TASK_GET_FIRST_MAINTASK);
			lcp.send(pkt);
		}
	}
}