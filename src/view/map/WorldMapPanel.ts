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
			this.panel_0.hScrollBarSkin = '';
			this.panel_0.vScrollBarSkin = '';
			this.panel_0.scrollTo(100);
			this.panel_0.visible = false;
			this.panel_0.scale(0, 0);
			// this.panel_worldMap.vScrollBarSkin = this.panel_worldMap.hScrollBarSkin = ''	
			this.addEvent();
		}
		public addEvent(): void {

			this.img_northMap.on(Laya.UIEvent.CLICK, this, () => {
				this.panel_0.visible = true;
				this.popState = 1;
				Laya.Tween.to(this.panel_0, { scaleX: 1, scaleY: 1 }, 500);
			});
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				switch (this.popState) {
					case 0:
						PopUpManager.checkPanel(this);
						break;
					case 1:
						Laya.Tween.to(this.panel_0, { scaleX: 0, scaleY: 0 }, 500, null, Laya.Handler.create(this, () => {
							this.panel_0.visible = false;
						}));
						this.popState = 0;
						break;
					case 2:
						break;
				}
			});
		}

	}
}