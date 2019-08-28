/**Created by the LayaAirIDE*/
module view.compart {
	export class Menu_MallItem extends ui.compart.Menu_MallItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {


			this.addEvent();
			this.changeVstack();
		}
		public addEvent(): void {

		}
		public changeVstack(): void {
			this.tab_mall.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_mall.selectedIndex = index;
			}, null, false);
			//商城热销00
			this.panel_mall00.vScrollBarSkin = '';
			this.vbox_mall00['sortItem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_mall00.addChild(new view.compart.MenuMallSmallItem());
			}
			//商城礼券01
			this.panel_mall01.vScrollBarSkin = '';
			this.vbox_mall01['sortItem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_mall01.addChild(new view.compart.MenuMallSmallItem());
			}
			//商城技能02
			this.panel_mall02.vScrollBarSkin = '';
			this.vbox_mall02['sortItem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_mall02.addChild(new view.compart.MenuMallSmallItem());
			}
			//商城荣誉03
			this.panel_mall03.vScrollBarSkin = '';
			this.vbox_mall03['sortItem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_mall03.addChild(new view.compart.MenuMallSmallItem());
			}
			//商城限购04
			this.panel_mall04.vScrollBarSkin = '';
			this.vbox_mall04['sortItem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_mall04.addChild(new view.compart.MenuMallSmallItem());
			}
			//商城礼券05
			this.panel_mall05.vScrollBarSkin = '';
			this.vbox_mall05['sortItem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_mall05.addChild(new view.compart.MenuMallSmallItem());
			}
		}
	}
}