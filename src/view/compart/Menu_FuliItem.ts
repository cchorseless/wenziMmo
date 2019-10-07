/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_FuliItem extends ui.menu.Menu_FuliItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.addEvent();
		}
		public addEvent(): void {
			//在线奖励
			this.img_jiangli.on(Laya.UIEvent.CLICK, this, () => {
				this.box_fuliMain.visible = false;
				this.box_jiangli.visible = true;
			})
			//激活兑换
			this.img_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				this.box_fuliMain.visible = false;
				this.box_jihuo.visible = true;
			})
			//资源找回
			this.img_findResource.on(Laya.UIEvent.CLICK, this, () => {
				this.box_fuliMain.visible = false;
				this.box_findResource.visible = true;
			})
		}
	}
}