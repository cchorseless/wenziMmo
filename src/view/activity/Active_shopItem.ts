/**Created by the LayaAirIDE*/
module view.activity{
	export class Active_shopItem extends ui.activity.Active_shopItemUI{
		constructor(){
			super();
			this.addEvent()
		}
		public addEvent(){
			EventManage.onWithEffect(this.btn_buy,Laya.UIEvent.CLICK,this,function(){

			})
		}
		public setData(data){
			
		}
	}
}