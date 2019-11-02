/**Created by the LayaAirIDE*/
module view.recharge_vip{
	export class Recharge_VipWelfare extends ui.recharge_vip.Recharge_VipWelfareUI{
		public curPage = 1;
		public data;
		constructor(){
			super();
		}
		public setData(data){
			this.data =data;
		}
	}
}