/**Created by the LayaAirIDE*/
module view.dialog{
	export class ZhaiYuan_yangYuDialog extends ui.dialog.ZhaiYuan_yangYuDialogUI{
		constructor(){
			super();
		}
		public setData():ZhaiYuan_yangYuDialog{

			this.addEvent ()
			return this
		}
		public addEvent():void{

			this.btn_close.on(Laya.UIEvent.CLICK,this,this.close)
		}
	}
}