/**Created by the LayaAirIDE*/
module view.beiBao {
	export class BeiBaoPanel extends ui.beiBao.BeiBaoPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			for (let i = 0; i < 4; i++) {
				this['panel_bag' + i].vScrollBarSkin = '';
				this['vbox_bag' + i]['sortItem'] = (items) => { };
			}
			this.tab_bag.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_bag.selectedIndex = index
			}, null, false)

			this.panel_sellHot.vScrollBarSkin = '';
			this.vbox_sellHot['sortItem'] = (items) => { };
			for (let i = 0; i < 5; i++) {
				this.vbox_sellHot.addChild(new view.compart.ShopHotItem());
			}

			this.addEvent();
		}

		public addEvent(): void {
			// this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
			// 	PopUpManager.checkPanel(this);
			// })
		}
	}
}