/**Created by the LayaAirIDE*/
module view.compart {
	export class Menu_ActiveItem extends ui.compart.Menu_ActiveItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.panel_active.vScrollBarSkin = '';
			this.vbox_active['sortItem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_active.addChild(new view.compart.MenuActiveSmallItem());
			}
		}
	}
}