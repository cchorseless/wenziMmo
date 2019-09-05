/**Created by the LayaAirIDE*/
module view.map {
	export class WorldMapPanel extends ui.map.WorldMapPanelUI {
		constructor() {
			super();

		}
		//UI 界面状态
		public popState = 0;
		public setData(): void {
			this.panel_worldMap.hScrollBarSkin = '';
			this.panel_worldMap.vScrollBarSkin = '';
			this.panel_worldMap.scrollTo(100);
			// this.panel_worldMap.vScrollBarSkin = this.panel_worldMap.hScrollBarSkin = ''	
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				switch (this.popState) {
					case 0:
						PopUpManager.checkPanel(this);
						break;
					case 1:
						break;
					case 2:
						break;
				}
			});
		}

	}
}