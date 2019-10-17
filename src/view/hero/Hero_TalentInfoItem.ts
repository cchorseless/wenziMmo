/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_TalentInfoItem extends ui.hero.Hero_TalentInfoItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public setData(): void {

		}
		public addEvent(): void {
			this.box_jineng01.on(Laya.UIEvent.CLICK, this, () => {
				new view.hero.HeroTalentDialog().popup(true);
			})
			this.box_jineng02.on(Laya.UIEvent.CLICK, this, () => {
				new view.hero.HeroTalentDialog().popup(true);
			})
			this.box_jineng03.on(Laya.UIEvent.CLICK, this, () => {
				new view.hero.HeroTalentDialog().popup(true);
			})
			this.box_jineng04.on(Laya.UIEvent.CLICK, this, () => {
				new view.hero.HeroTalentDialog().popup(true);
			})
		}
	}
}