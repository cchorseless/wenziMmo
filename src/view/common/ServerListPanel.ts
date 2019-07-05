/**Created by the LayaAirIDE*/
module view.common {
	export class ServerListPanel extends ui.common.ServerListPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.btn_100.selected = true;
			this.addEvent();
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			});

		}



	}
}