/**Created by the LayaAirIDE*/
module view.dialog{
	export class TuJianShaiXuanDialog extends ui.dialog.TuJianShaiXuanDialogUI{
		constructor(){
			super();
			this.setData();
		}
		public setData():void {
			this.btn_shaiXuanClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		
		}
	}
}