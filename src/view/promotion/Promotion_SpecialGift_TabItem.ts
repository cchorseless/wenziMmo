/**Created by the LayaAirIDE*/
module view.promotion {
	export class Promotion_SpecialGift_TabItem extends ui.promotion.Promotion_SpecialGift_TabItemUI {
		public itemID;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(id, name) {
			this.itemID = id;
			this.lab_Name.text = name;
		}
		public addEvent() {
			// this.img_bg.on(Laya.UIEvent.CLICK,this,function(){
			// 	Promotion_SpecialGift.self.onChooseTabItem(this.data)
			// })
		}
	}
}