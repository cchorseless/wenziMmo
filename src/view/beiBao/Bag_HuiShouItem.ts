/**Created by the LayaAirIDE*/
module view.beiBao {
	export class Bag_HuiShouItem extends ui.beiBao.Bag_HuiShouItemUI {
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

			})

		}
	}
}