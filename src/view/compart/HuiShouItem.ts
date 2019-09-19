/**Created by the LayaAirIDE*/
module view.compart {
	export class HuiShouItem extends ui.compart.HuiShouItemUI {
		constructor() {
			super();
		}
		public hasInit = false;
		public setData(): void {
			this.panel_a.vScrollBarSkin = '';
			this.vbox_huishou['sortItem'] = (items) => { };
			if (this.hasInit) return;
			this.hasInit = true;
			this.initUI();
			this.addEvent();


		}

		public initUI(): void {


		}
		public addEvent(): void {
			this.btn_qiu.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.BagHuiShouDialog().show();
			})

		}
	}
}