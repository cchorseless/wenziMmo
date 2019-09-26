/**Created by the LayaAirIDE*/
module view.map {
	export class WorldMapPanel extends ui.map.WorldMapPanelUI {
		constructor() {
			super();

		}
		public setData(): void {
			this.panel_0.hScrollBarSkin = '';
			this.panel_0.vScrollBarSkin = '';
				Laya.timer.frameOnce(2, this, () => { this.panel_0.scrollTo(100);})
			// this.panel_worldMap.vScrollBarSkin = this.panel_worldMap.hScrollBarSkin = ''	
			this.addEvent();
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
			EventManage.onWithEffect(this.btn_eastLand, Laya.UIEvent.CLICK, this, () => {
				// PanelManage.openEastMapPanel()
			})
			EventManage.onWithEffect(this.btn_northMap, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openNorthMapPanel()
			})
			EventManage.onWithEffect(this.btn_southLand, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openSouthMapPanel()
			})
		}

	}
}