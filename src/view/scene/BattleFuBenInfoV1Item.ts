/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleFuBenInfoV1Item extends ui.scene.BattleFuBenInfoV1ItemUI {
		constructor() {
			super();
			this.addEvent();
		}


		public setData() {

		}

		public addEvent(): void {
			this.btn_exit.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.FB_GeRenBoss_Leave);
				lcp.send(pkt);
			});
		}
	}
}