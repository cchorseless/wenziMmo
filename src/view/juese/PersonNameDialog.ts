/**Created by the LayaAirIDE*/
module view.juese{
	export class PersonNameDialog extends ui.juese.PersonNameDialogUI{
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