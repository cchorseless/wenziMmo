/**Created by the LayaAirIDE*/
module view.dialog {
	export class FuBenPingLunDialog extends ui.dialog.FuBenPingLunDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.panel_pinglun.vScrollBarSkin = "";
			this.vbox_pinglun['sortItem'] = (items) => { };
			this.btn_pinglunClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}