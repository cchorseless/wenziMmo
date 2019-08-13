/**Created by the LayaAirIDE*/
module view.dialog{
	export class MenuQiandaoDialog extends ui.dialog.MenuQiandaoDialogUI{
		constructor(){
			super();
			this.setData();
		}
		public setData():void{
			this.btn_qiandaoClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}