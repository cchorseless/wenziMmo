/**Created by the LayaAirIDE*/
module view.dialog{
	export class MenuMallDialog extends ui.dialog.MenuMallDialogUI{
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