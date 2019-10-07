/**Created by the LayaAirIDE*/
module view.hero{
	export class HeroTalentDialog extends ui.hero.HeroTalentDialogUI{
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