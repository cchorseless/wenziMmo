/**Created by the LayaAirIDE*/
module view.dialog {
	export class ZhaiYuan_lianQiDialog extends ui.dialog.ZhaiYuan_lianQiDialogUI {
		constructor() {
			super();
		}
		public setData(): ZhaiYuan_lianQiDialog {
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_top.selectedIndex = index;
			}, null, false);
			this.tab_down.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_down.selectedIndex = index;
			}, null, false);
			this.addEvent()
			return this
		}
		public addEvent(): void {

			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close)
		}
	}
}