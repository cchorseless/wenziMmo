/**
* name 
*/
module view.juese {
	export class Person_shengwangMainDialog extends ui.juese.Person_shengwangMainDialogUI {
		constructor() {
			super();
			this.addEvent();
			this.setData();
		}
		public addEvent(){
			this.btn_close.on(Laya.UIEvent.CLICK,this,function(){
				this.close();
			});
		}
		public setData(){
			let ui_item = view.juese.Person_ShengWangItem
			this.box_panel.addChild(new ui_item());
		}
	}
}