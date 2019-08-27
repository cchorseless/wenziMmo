/**Created by the LayaAirIDE*/
module view.dialog {
	export class ShopBuyItemV0Dialog extends ui.dialog.ShopBuyItemV0DialogUI {
		constructor() {
			super();
		}
		public setData(item: ProtoCmd.itf_Shop_ShopItem): ShopBuyItemV0Dialog {
			// this.lbl
			this.addEvent();
			return this;
		}

		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close);
		}
	}
}