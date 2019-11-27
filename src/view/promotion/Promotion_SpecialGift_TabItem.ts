/**Created by the LayaAirIDE*/
module view.promotion {
	export class Promotion_SpecialGift_TabItem extends ui.promotion.Promotion_SpecialGift_TabItemUI {
		public itemID;
		public iconID = ["active_icon3","active_icon18","active_icon35","active_icon12"]
		constructor() {
			super();
			this.addEvent();
		}
		public setData(id, name) {
			this.itemID = id;
			this.lab_Name.text = name;
			this.img_icon.skin = "image/activity/" + this.iconID[this.itemID] + ".png"
		}
		public addEvent() {
			// this.img_bg.on(Laya.UIEvent.CLICK,this,function(){
			// 	Promotion_SpecialGift.self.onChooseTabItem(this.data)
			// })
		}
	}
}