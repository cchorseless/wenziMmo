/**Created by the LayaAirIDE*/
module view.dialog {
	export class ShopBuyItemV1Dialog extends ui.dialog.ShopBuyItemV1DialogUI {
		constructor() {
			super();
		}
		public setData(): ShopBuyItemV1Dialog {


			
			this.addEvent();
			return this;
		}

		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close);
			this.btn_buy.on(Laya.UIEvent.CLICK, this, this.buyItem);
		}

		public buyItem(): void {
			
		}
	}
}