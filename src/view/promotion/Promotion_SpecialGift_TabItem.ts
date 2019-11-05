/**Created by the LayaAirIDE*/
module view.promotion {
	export class Promotion_SpecialGift_TabItem extends ui.promotion.Promotion_SpecialGift_TabItemUI {
		public itemID;
		public data;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data) {
			this.data = data;
			this.itemID = data.id;
			this.lab_Name.text = data.name;
		}
		public addEvent() {
			this.img_bg.on(Laya.UIEvent.CLICK,this,function(){
				Promotion_SpecialGift.self.onChooseTabItem(this.data)
			})
		}
	}
}