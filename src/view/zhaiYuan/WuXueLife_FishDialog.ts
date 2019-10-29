/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_Life_FishPreVDialog extends ui.zhaiYuan.ZhaiYuan_Life_FishPreVDialogUI {
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