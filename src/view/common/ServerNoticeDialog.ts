/**Created by the LayaAirIDE*/
module view.common {
	export class ServerNoticeDialog extends ui.common.ServerNoticeDialogUI {
		constructor() {
			super();
		}
		public setData(): ServerNoticeDialog {
			this.panel_0.vScrollBarSkin = '';
			GameApp.HttpManager.get('name=notice&&version=' + GameApp.GameEngine.version, (res) => {
				let info = JSON.parse(res);
				this.div_0.style.fontSize = 25;
				this.div_0.style.wordWrap = true;
				this.div_0.innerHTML = info[0].content;
				this.vbox_0.height = this.div_0.height;
			})
			this.addEvent();
			return this
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close)
		}
	}
}