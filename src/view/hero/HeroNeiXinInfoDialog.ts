/**Created by the LayaAirIDE*/
module view.hero{
	export class HeroNeiXinInfoDialog extends ui.hero.HeroNeiXinInfoDialogUI{
		constructor(){
			super();
				this.addEvent();
		}
			public addEvent(): void {
			this.btn_jiNengClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
		})
	}
	}
}