/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXueNeigongDialog extends ui.wuXue.WuXueNeigongDialogUI {
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