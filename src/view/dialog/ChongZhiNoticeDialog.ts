/**Created by the LayaAirIDE*/
module view.dialog {
	export class ChongZhiNoticeDialog extends ui.dialog.ChongZhiNoticeDialogUI {
		constructor() {
			super();
		}
		public setData(): ChongZhiNoticeDialog {
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close);
			this.btn_cancel.on(Laya.UIEvent.CLICK, this, this.close);
			this.btn_recharge.on(Laya.UIEvent.CLICK, this, function(){
				let o = new recharge_vip.Recharge_VipDialog();
				o.setData(0);
				o.popup(true);
			});
		}
	}
}