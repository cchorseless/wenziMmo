/**Created by the LayaAirIDE*/
module view.hero {
	export class HeroZhuanShengDialog extends ui.hero.HeroZhuanShengDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {

			this.addEvent();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})

		}
	}
}