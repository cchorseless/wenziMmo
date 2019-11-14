/**Created by the LayaAirIDE*/
module view.dialog {
	export class SureOrCanelDialog extends ui.dialog.SureOrCanelDialogUI {
		constructor() {
			super();
			this.addEvent();
		}

		public SureHandle: Laya.Handler;
		public CancelHandle: Laya.Handler;
		/**
		 * 
		 * @param model 
		 * @param txt 
		 * @param data 
		 */
		public setData(txt: string, SureHandle: Laya.Handler, CancelHandle: Laya.Handler = null): SureOrCanelDialog {
			this.SureHandle = SureHandle;
			this.lbl_context.text = txt;
			this.CancelHandle = CancelHandle;
			return this;
		}
		public addEvent(): void {
			this.btn_canel.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			this.btn_sure.on(Laya.UIEvent.CLICK, this, () => {
				if (this.SureHandle) {
					this.SureHandle.run();
				}
				this.close();
			});
		}
		public onClosed(type?) {
			if (this.CancelHandle) {
				this.CancelHandle.run();
			}
		}
	}
}