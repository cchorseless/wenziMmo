/**Created by the LayaAirIDE*/
module view.dialog{
	export class PersonNameDialog extends ui.dialog.PersonNameDialogUI{
		constructor(){
			super();
			this.setData();
		}
		public setData():void{
			this.btn_nameClose	.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}