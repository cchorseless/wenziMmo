/**Created by the LayaAirIDE*/
module view.map {
	export class BigMap_BeiLuPanel extends ui.map.BigMap_BeiLuPanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.panel_0.hScrollBarSkin = '';
			this.panel_0.vScrollBarSkin = '';
				Laya.timer.frameOnce(2, this, () => { this.panel_0.scrollTo(100);})
			this.addEvent()
		}

		public addEvent(): void {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
			EventManage.onWithEffect(this.btn_world, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWorldMapPanel();
			})

		}
	}
}