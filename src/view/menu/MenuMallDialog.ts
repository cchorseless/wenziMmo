/**Created by the LayaAirIDE*/
module view.menu{
	export class MenuMallDialog extends ui.menu.MenuMallDialogUI{
		constructor(){
			super();
			this.setData();
		}
			public setData(): void {
			this.addEvent();
		}
			public addEvent(): void { 
			//道具购买
			this.btn_close.on(Laya.UIEvent.CLICK,this,()=>{
				this.close();
			})
			
		}

	}
}