/**Created by the LayaAirIDE*/
module view.fuli {
	export class FuLi_InvitItem extends ui.fuli.FuLi_InvitItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				this.init_activation();
			})
		}
		public init_activation(): void {
			if (this.input_jihuo.text !== "") {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.FuLi_xinshouka_other_shiyong, [this.input_jihuo.text], null, this, (jsonData) => {
				})
				lcp.send(pkt);
			}
		}
	}
}