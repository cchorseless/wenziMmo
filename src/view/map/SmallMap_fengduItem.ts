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
					if (GameApp.MainPlayer.roomId == i) {
						TipsManage.showTips('当前就在此地图');
						return
					}
					let pkt = new ProtoCmd.QuestClientData();
					pkt.setString(ProtoCmd.MAP_MOVE, [i], this, (msgID, jsonData: ProtoCmd.itf_MAP_MOVE) => {
						if (jsonData.errorcode == 0) {
							GameApp.MainPlayer.roomId = jsonData.curmapid;
							TipsManage.showTips('进入了' + jsonData.curmapid);
							PanelManage.Main&&PanelManage.Main.updateSceneView('进入了' + jsonData.curmapid)
						}

					});
					lcp.send(pkt);
				})
			}
			// 出口
			this.btn_exit.on(Laya.UIEvent.CLICK, this, () => {
				if (GameApp.MainPlayer.roomId == 10003) {
					TipsManage.showTips('当前就在此地图');
					return
				}
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.MAP_MOVE, [10003], this, (msgID, jsonData: ProtoCmd.itf_MAP_MOVE) => {
					if (jsonData.errorcode == 0) {
						GameApp.MainPlayer.roomId = jsonData.curmapid;
						TipsManage.showTips('进入了' + jsonData.curmapid);
						PanelManage.Main&&PanelManage.Main.updateSceneView('进入了' + jsonData.curmapid)
					}
				});
				lcp.send(pkt);
			})
		}
	}
}