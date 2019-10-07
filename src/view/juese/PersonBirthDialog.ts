/**Created by the LayaAirIDE*/
module view.juese{
	export class PersonBirthDialog extends ui.juese.PersonBirthDialogUI{
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