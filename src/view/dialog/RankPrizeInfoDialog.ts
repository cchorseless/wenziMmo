/**Created by the LayaAirIDE*/
module view.dialog {
	export class RankPrizeInfoDialog extends ui.dialog.RankPrizeInfoDialogUI {
		constructor() {
			super();
		}
		public setData(): RankPrizeInfoDialog {
			this.panel_0.hScrollBarSkin = '';
			this.panel_1.vScrollBarSkin = '';

			this.addEvent();
			return this
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close)
		}
	}
}