/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXueLife_FishDialog extends ui.wuXue.WuXueLife_FishDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.panel_fish.vScrollBarSkin='';
			this.vbox_fish['sortItem'] = (items) => { };
			for (let i = 0; i < 20; i++) {
				this.vbox_fish.addChild(new view.compart.WuXueFishItem())
			}
			this.addEvent();
		}
		public addEvent(): void {
			
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})

		}
	}
}