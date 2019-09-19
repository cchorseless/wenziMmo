/**Created by the LayaAirIDE*/
module view.dialog {
	export class PersonShengPingDialog extends ui.dialog.PersonShengPingDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {

			this.addEvent();
		}
		public addEvent(): void {
				this.panel_shengping.vScrollBarSkin = '';
			this.vbox_shengping['sortItem'] = (items) => { };
			for (let i = 0; i < 3; i++) {
				this.vbox_shengping.addChild(new view.compart.PersonShengPingItem())
			}
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}