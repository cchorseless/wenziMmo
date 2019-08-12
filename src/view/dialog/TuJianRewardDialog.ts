/**Created by the LayaAirIDE*/
module view.dialog{
	export class TuJianRewardDialog extends ui.dialog.TuJianRewardDialogUI{
		constructor(){
			super();
			this.setData();
		}
		public setData():void {
			this.btn_tujianRewardClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		
		}
		
	}
}