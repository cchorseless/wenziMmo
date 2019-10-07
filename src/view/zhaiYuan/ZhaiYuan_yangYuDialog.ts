/**Created by the LayaAirIDE*/
module view.zhaiYuan{
	export class ZhaiYuan_yangYuDialog extends ui.zhaiYuan.ZhaiYuan_yangYuDialogUI{
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