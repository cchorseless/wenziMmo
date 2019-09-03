/**Created by the LayaAirIDE*/
module view.dialog {
	export class JuQingPrizeDialog extends ui.dialog.JuQingPrizeDialogUI {
		constructor() {
			super();
		}
		public setData(): JuQingPrizeDialog {
			this.initUI();
			this.addEvent();
			return this
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close()
			});

			this.btn_lingQu.on(Laya.UIEvent.CLICK, this, () => {

				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.JQ_GET_JQ_getJuQingBaseReward, null, null, this, (jsonData) => {
					console.log(jsonData);
				});
				lcp.send(pkt);
			})

		}
		public initUI(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JQ_GET_JQ_openJuQingBaseReward, null, null, this, (jsonData) => {
				console.log(jsonData);
			})
			lcp.send(pkt);
		}
	}
}