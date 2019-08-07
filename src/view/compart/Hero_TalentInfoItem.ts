/**Created by the LayaAirIDE*/
module view.compart{
	export class Hero_TalentInfoItem extends ui.compart.Hero_TalentInfoItemUI{
		constructor(){
			super();
			this.addEvent();
		}
		public setData():void{
			
		}
		public addEvent():void{
			this.box_jineng01.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.HeroTalentDialog().popup(true);
			})
			this.box_jineng02.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.HeroTalentDialog().popup(true);
			})
			this.box_jineng03.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.HeroTalentDialog().popup(true);
			})
			this.box_jineng04.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.HeroTalentDialog().popup(true);
			})
		}
	}
}