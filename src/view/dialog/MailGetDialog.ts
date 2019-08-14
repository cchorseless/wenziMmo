/**Created by the LayaAirIDE*/
module view.dialog{
	export class MailGetDialog extends ui.dialog.MailGetDialogUI{
		constructor(){
			super();
			this.setData();
		}
		public setData():void{
			this.btn_mailGetClose	.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}