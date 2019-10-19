/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_FourFaItem extends ui.juese.Person_FourFaItemUI {
		constructor() {
			super();

		}
		private client_func_index = 17;// 功能ID编号
		public hasInit = false;// 初始化自己
		//开启所需等级总数
		private sum;
		//玩家等级总数
		private mySum;
		public setData(): void {
			if (this.hasInit) { return };
			this.hasInit = true;
			this.addEvent();
			this.activation();
		}
		public addEvent(): void {
			if (this.mySum >= this.sum) {
				//开启
				this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
					GameUtil.setServerData(this.client_func_index);
					this.activation();
				})
			}
			else {
				this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
					TipsManage.showTips('您当前等级不足，暂时不能开启')
				});
			}
		}
		public activation(): void {
			//判断是否激活
			if (GameUtil.getServerData(this.client_func_index)) {
				this.viw_fourFa.selectedIndex = 1;

			}
			else {
				this.viw_fourFa.selectedIndex = 0;
				this.notActivation();
			}
		}
		/**
		 * 未激活时
		 */
		public notActivation(): void {
			let id = this.client_func_index + 1000;
			let activationLvl = SheetConfig.Introduction_play.getInstance(null).LEVEL('' + id);
			let zsLvl = Math.floor(activationLvl / 1000);
			let lvl = activationLvl % 1000;
			this.lbl_detail.text = SheetConfig.Introduction_play.getInstance(null).CONTENT('' + id);
			this.lbl_condition.text = '' + SheetConfig.Introduction_play.getInstance(null).TEXT1('' + id)
			this.sum = zsLvl * 1000 + lvl;
			this.mySum = GameApp.MainPlayer.zslevel * 1000 + GameApp.MainPlayer.level;
		}
	}
}