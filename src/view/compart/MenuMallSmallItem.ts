/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuMallSmallItem extends ui.menu.MenuMallSmallItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.addEvent();
		}
		public addEvent(): void { 
			//道具购买
			this.box_daoju1.on(Laya.UIEvent.CLICK,this,()=>{
				new view.menu.MenuMallDialog().show(true);
			})
				this.box_daoju2.on(Laya.UIEvent.CLICK,this,()=>{
				new view.menu.MenuMallDialog().show(true);
			})
				this.box_daoju3.on(Laya.UIEvent.CLICK,this,()=>{
				new view.menu.MenuMallDialog().show(true);
			})
				this.box_daoju4.on(Laya.UIEvent.CLICK,this,()=>{
				new view.menu.MenuMallDialog().show(true);
			})
		}
	}
}