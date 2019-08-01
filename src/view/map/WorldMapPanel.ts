/**Created by the LayaAirIDE*/
module view.map{
	export class WorldMapPanel extends ui.map.WorldMapPanelUI{
		constructor(){
			super();
		
		}
			public setData(): void {
			this.panel_worldMap.hScrollBarSkin = '';
			this.panel_worldMap.scrollTo(100, 0);
			// this.panel_worldMap.vScrollBarSkin = this.panel_worldMap.hScrollBarSkin = ''	
			this.addEvent();
		}
		public addEvent(): void {
			this.img_northMap.on(Laya.UIEvent.CLICK, this, () => {
				this.box_north.visible = true ;
			this.addChild(this.box_north);
		});
			this.box_north.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this, true, 4);
			});
		}
		
	}
}