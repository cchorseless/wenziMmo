/**Created by the LayaAirIDE*/
module view.compart{
	export class RechargeListInfo extends ui.compart.RechargeListInfoUI{
		public itemID;
		constructor(){
			super();
			this.addEvent();
		}
		public setData(data,id){

		}
		public addEvent(){
			EventManage.onWithEffect(this.btn_pay,Laya.UIEvent.CLICK,this,function(){
				
			})
		}
	}
}