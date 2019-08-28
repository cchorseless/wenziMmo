/**Created by the LayaAirIDE*/
module view.compart {
	export class MenuMallSmallItem extends ui.compart.MenuMallSmallItemUI {
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
				new view.dialog.MenuMallDialog().show(true);
			})
				this.box_daoju2.on(Laya.UIEvent.CLICK,this,()=>{
				new view.dialog.MenuMallDialog().show(true);
			})
				this.box_daoju3.on(Laya.UIEvent.CLICK,this,()=>{
				new view.dialog.MenuMallDialog().show(true);
			})
				this.box_daoju4.on(Laya.UIEvent.CLICK,this,()=>{
				new view.dialog.MenuMallDialog().show(true);
			})
		}
	}
}