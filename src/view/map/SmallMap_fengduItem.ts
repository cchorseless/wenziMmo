/**Created by the LayaAirIDE*/
module view.map {
	export class SmallMap_fengduItem extends ui.map.SmallMap_fengduItemUI {
		constructor() {
			super();
		}

		public setData(): void {

			this.addEvent();
		}

		public addEvent(): void {
			for (let i = 9001; i < 9006; i++) {
				this['btn_' + i].on(Laya.UIEvent.CLICK, this, () => {
					let pkt = new ProtoCmd.QuestClientData();
					pkt.setString(ProtoCmd.MAP_MOVE, [i], this, (msgID, jsonData) => {
						console.log(jsonData)
					});
					lcp.send(pkt);
				})
			}
		}
	}
}