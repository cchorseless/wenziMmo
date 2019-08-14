/**Created by the LayaAirIDE*/
module view.dialog{
	export class MailDeleteDialog extends ui.dialog.MailDeleteDialogUI{
		constructor(){
			super();
				this.setData();
		}
		public setData():void{
			this.btn_mailDeleteClose	.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}