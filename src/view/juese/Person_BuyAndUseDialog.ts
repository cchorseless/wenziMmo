/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_BuyAndUseDialog extends ui.juese.Person_BuyAndUseDialogUI {
		constructor() {
			super();
		}
		public data;
		public type;
		public setData(data, type = 1): Person_BuyAndUseDialog {
			this.type = type;
			this.vbox_01['sortItem'] = (items) => { };
			this.data = data;
			this.addEvent();
			this.init_itemBuy();
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
		}
		public init_itemBuy(): void {
			if (this.data) {
				this.vbox_01.removeChildren();
				for (let key in this.data) {
					this.vbox_01.addChild(new view.juese.Person_BuyAndUseItem().setData(this.data[key], this.type));
				}
			}
		}
	}
}