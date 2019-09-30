/**Created by the LayaAirIDE*/
module view.compart {
	export class ServerListItem extends ui.compart.ServerListItemUI {
		constructor() {
			super();
			this.btn_0.visible = false;
			this.btn_1.visible = false;
		}
		public res0;
		public res1;
		public setData(res: any, boFirst:boolean = true): ServerListItem {
			if (boFirst) {
				this.btn_0.label = '' + res.zoneName;
				this.btn_0.visible = true;
				this.res0 = res
			}
			else {
				this.btn_1.label = '' + res.zoneName;
				this.btn_1.visible = true;
				this.res1 = res
				console.log(res)
			}
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_0, Laya.UIEvent.CLICK, this, () => {
				GameApp.GameEngine.connectIP = '' + this.res0.url;
				GameApp.GameEngine.connectPort = '' + this.res0.port;
				GameApp.GameEngine.zoneid = this.res0.zoneId;
				GameApp.GameEngine.trueZoneid = this.res0.trueZoneId;
				GameApp.GameEngine.tradeid = this.res0.tradeId
				PanelManage.ChooseServer.lbl_serverName.text = '' + this.res0.zoneName;
				view.dialog.ServerListDialog.closeAll()

			})
			EventManage.onWithEffect(this.btn_1, Laya.UIEvent.CLICK, this, () => {
				GameApp.GameEngine.connectIP = '' + this.res1.url;
				GameApp.GameEngine.connectPort = '' + this.res1.port;
				GameApp.GameEngine.zoneid = this.res1.zoneId;
				GameApp.GameEngine.trueZoneid = this.res1.trueZoneId;
					GameApp.GameEngine.tradeid = this.res1.tradeId
				PanelManage.ChooseServer.lbl_serverName.text = '' + this.res1.zoneName;
				view.dialog.ServerListDialog.closeAll()

			})

		}
	}
}