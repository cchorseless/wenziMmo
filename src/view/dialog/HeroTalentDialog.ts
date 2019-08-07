/**Created by the LayaAirIDE*/
module view.dialog{
	export class HeroTalentDialog extends ui.dialog.HeroTalentDialogUI{
		constructor(){
			super();
			this.addEvent();
		}
		public setData():void{
			
		}
		public addEvent():void{
			this.btn_heroTalentClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}