/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_WuXueBaseDialog extends ui.juese.Person_WuXueBaseDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.addEvent();
		}
		public addEvent(): void {
			//关闭弹窗
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}