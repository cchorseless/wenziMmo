/**Created by the LayaAirIDE*/
module view.common {
	export class ServerErrorPanel extends ui.common.ServerErrorPanelUI {
		constructor() {
			super();
			this.mouseEnabled = true;
			GameApp.LListener.on(LcpEvent.SOCKET_NOCONNECT, this, () => {
				this.lbl_des.text = '重连失败，请重新打开游戏';
			})
		}
		public setData(): void {
			this.lbl_des.text = '断线重连中，请稍后';
			Laya.timer.once(30 * 1000, this, () => { this.lbl_des.text = '重连失败，请重新打开游戏'; })
		}
	}
}