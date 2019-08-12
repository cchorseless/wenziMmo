/**Created by the LayaAirIDE*/
module view.dialog{
	export class TuJianJueseInfoDialog extends ui.dialog.TuJianJueseInfoDialogUI{
		constructor(){
			super();
			this.setData();
		}
		public setData():void {
			this.btn_tujianJueseInfoClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		
		}
	}
}