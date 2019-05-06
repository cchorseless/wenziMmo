/**Created by the LayaAirIDE*/
module view.common {
	export class ServerListPanel extends ui.common.ServerListPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_serverList.hScrollBarSkin = '';
			this.panel_serverList.vScrollBarSkin = '';
			let serverInfo = GlobalData.AppServerInfo.serverInfo;
			for (let i = 0; i < serverInfo.length; i++) {
				let serverItem = new ServerItem();
				let _serverInfo = serverInfo[i];
				serverItem.lbl_serverName.text = '' + _serverInfo.appServerDbid + '-' + _serverInfo.appServerName;
				serverItem.x = 50 + (i % 2) * 250;
				serverItem.y = 120 * Math.floor(i / 2);
				serverItem.dbid = _serverInfo.appServerDbid;
				this.panel_serverList.addChild(serverItem)
				serverItem.on(Laya.UIEvent.CLICK, this, this.Destroy.bind(this, serverItem.dbid))
			}
		}
		public Destroy(data): void {
			PanelManage.Login.updateCurServer(data);
			PopUpManager.Dispose(this);
		}

	}
}