
/**Created by the LayaAirIDE*/
module view.dialog {
	export class WelcomeDialog extends ui.dialog.WelcomeDialogUI {
		constructor() {
			super();
		}
		public setData(): WelcomeDialog {
			this.lbl_des.text = '这一世的躯壳已准备好。宝宝，就等生你了。'
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