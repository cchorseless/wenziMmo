/**Created by the LayaAirIDE*/
module view.common {
	export class ServerNoticePanel extends ui.common.ServerNoticePanelUI {
		constructor() {
			super();
			this.img_bg.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
		}
		public setData(): void {

		}
	}
}