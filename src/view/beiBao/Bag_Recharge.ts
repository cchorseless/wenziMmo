/**Created by the LayaAirIDE*/
module view.beiBao {
	export class Bag_Recharge extends ui.beiBao.Bag_RechargeUI {
		private needNum = 60;
		private curNum = 50;
		private data = null
		constructor() {
			super();
			this.list_recharge.vScrollBarSkin = "";
			this.list_recharge.itemRender = view.compart.RechargeListInfo;
			// this.setData();
			this.addEvent();
		}

		public setData(data: any) {
			this.ViewS_show.setItems


		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			EventManage.onWithEffect(this.tab_div, Laya.UIEvent.CLICK, this, () => {
				this.ViewS_show.selectedIndex = this.tab_div.selectedIndex;
				
			})
		}
	}
}