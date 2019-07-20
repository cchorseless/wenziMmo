/**Created by the LayaAirIDE*/
module view.map {
	export class WorldMapPanel extends ui.map.WorldMapPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_0.vScrollBarSkin = this.panel_0.hScrollBarSkin = '';
			// this.panel_0.scrollTo(this.width / 2, this.height / 2)
			this.addEvent();
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
		}
	}
}