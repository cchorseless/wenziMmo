/**Created by the LayaAirIDE*/
module view.compart {
	export class BaiTanItem extends ui.compart.BaiTanItemUI {
		constructor() {
			super();
		}
		public hasInit = false;
		public setData(): void {
			if (this.hasInit) return;
			this.hasInit = true;
			this.initUI();
			this.addEvent();
		}

		public initUI(): void {
			this.panel_sell.vScrollBarSkin = this.panel_sellRecord.vScrollBarSkin = '';
			this.vbox_sell['sortItem'] = (items) => { };
			this.vbox_sellRecord['sortItem'] = (items) => { };

		}
		public addEvent(): void {

		}
	}
}