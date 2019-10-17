/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_FourFaItem extends ui.juese.Person_FourFaItemUI {
		constructor() {
			super();

		}
		private client_func_index = 17;// 功能ID编号
		public hasInit = false;// 初始化自己
		public setData(): void {
			if (this.hasInit) { return };
			this.hasInit = true;
			this.addEvent();
			this.activation();
		}
		public addEvent(): void {
			//开启
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				GameUtil.setServerData(this.client_func_index);
				this.activation();
			})
		}
			public activation(): void {
			//判断是否激活
			if (GameUtil.getServerData(this.client_func_index)) {
				this.viw_fourFa.selectedIndex = 1;
				
			}
			else {
				this.viw_fourFa.selectedIndex = 0;
			}
		}
	}
}