/**Created by the LayaAirIDE*/
module view.dialog {
	export class ZhaiYuan_lianQiDialog extends ui.dialog.ZhaiYuan_lianQiDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): ZhaiYuan_lianQiDialog {			
			this.addEvent();
			return this
		}
		public addEvent(): void {
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_top.selectedIndex = index;
			}, null, false);
			this.tab_down.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_down.selectedIndex = index;
			}, null, false);
			
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close)
		}
	}
}