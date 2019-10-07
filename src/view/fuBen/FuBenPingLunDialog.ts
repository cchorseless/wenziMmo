/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenPingLunDialog extends ui.fuBen.FuBenPingLunDialogUI {
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