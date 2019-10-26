/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_IntegralItem extends ui.luckDraw.LuckDraw_IntegralItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this, true, 4);
			})
		}
		public init_Integral(): void {
			// let pkt = new ProtoCmd.QuestClientData();
			// pkt.setString(ProtoCmd.LD_cangbaoge_getrecord, null, null, this, (jsonData) => {
			// 	console.log('=====>积分', jsonData)
				
			// })
			// lcp.send(pkt);
		}
	}
}