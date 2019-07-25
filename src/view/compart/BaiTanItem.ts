/**Created by the LayaAirIDE*/
module view.compart {
	export class BaiTanItem extends ui.compart.BaiTanItemUI {
		constructor() {
			super();
			this.setData();
		}

		public setData(): void {
			this.panel_sell.vScrollBarSkin = this.panel_sellRecord.vScrollBarSkin = '';
			this.vbox_sell['sortItem'] = (items) => { };
			this.vbox_sellRecord['sortItem'] = (items) => { };
		}

	}
}