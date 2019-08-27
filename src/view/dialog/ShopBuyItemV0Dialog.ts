/**Created by the LayaAirIDE*/
module view.dialog {
	export class ShopBuyItemV0Dialog extends ui.dialog.ShopBuyItemV0DialogUI {
		constructor() {
			super();
		}
		public setData(): ShopBuyItemV0Dialog {
			return this;
		}

		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close);
		}
	}
}