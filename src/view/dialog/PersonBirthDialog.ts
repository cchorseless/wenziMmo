/**Created by the LayaAirIDE*/
module view.dialog{
	export class PersonBirthDialog extends ui.dialog.PersonBirthDialogUI{
		constructor(){
			super();
			this.setData();
		}
		public setData():void{
			this.btn_birthClose	.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}