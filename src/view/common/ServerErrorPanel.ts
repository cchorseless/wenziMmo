/**Created by the LayaAirIDE*/
module view.common {
	export class ServerErrorPanel extends ui.common.ServerErrorPanelUI {
		constructor() {
			super();
			this.mouseEnabled = true;
			lcp.LListener.getInstance().once(LcpEvent.GAME_INIT_FINISH, this, this.gameReConnect)
			this.lbl_reLogin.once(Laya.UIEvent.CLICK, this, this.reLogin)
		}
		public setData(): void {
			this.lbl_des.text = '断线重连中，请稍后';
		}
		public gameReConnect(data): void {
			// 连接成功
			if (data) {
				PopUpManager.checkPanel(this)
			}
			// 连接失败
			else {
				this.lbl_des.text = '服务器连接失败，请重新登录'
			}
		}
		// 点击重新连接
		public reLogin(): void {
			lcp.LListener.getInstance().once(LcpEvent.GAME_INIT_FINISH, this, this.gameReConnect);
			// GameUtils.resert();
			// GameUtils.getInstance().initGame();
		}
	}
}