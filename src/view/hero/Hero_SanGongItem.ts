/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_SanGongItem extends ui.hero.Hero_SanGongItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			
			this.addEvent();
		}
		public addEvent(): void {
			//转生突破
			this.btn_zhuanSheng.on(Laya.UIEvent.CLICK, this, () => {
				new view.hero.HeroZhuanShengDialog().popup(true);
			})
			
		}
	}
}