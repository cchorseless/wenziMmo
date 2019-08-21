/**Created by the LayaAirIDE*/
module view.dialog {
	export class TipsDialog extends ui.dialog.TipsDialogUI {
		constructor() {
			super();
			this.mouseEnabled = true;
		}
		public setData(data): TipsDialog {
			this.lbl_des.text = data;
			return this
		}
		/**
		 * 打開後執行
		 */
		public onOpened(): void {
			Laya.timer.frameOnce(5, this, () => { this.close() });
		}
		/**
		 * 關閉回收
		 */
		public onClosed(): void {
			Laya.Pool.recover(TipsManage.TipsPanel, this);
		}
	}
}