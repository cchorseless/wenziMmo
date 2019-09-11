/**Created by the LayaAirIDE*/
module view.dialog {
	export class HeroZhuanShengDialog extends ui.dialog.HeroZhuanShengDialogUI {
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