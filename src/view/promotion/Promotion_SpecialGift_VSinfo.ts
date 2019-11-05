/**Created by the LayaAirIDE*/
module view.promotion{
	export class Promotion_SpecialGift_VSinfo extends ui.promotion.Promotion_SpecialGift_VSinfoUI{
		public data;
		constructor(){
			super();
		}
		public setData(data){
			this.data = data;
			let items = data.item;
			for(let i in items){
				
			}
		}
	}
}