/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_ChoujiangItem extends ui.menu.Menu_ChoujiangItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {


			this.addEvent();
			this.changeVstack();
		}
		public addEvent(): void {
			this.btn_jifenGet.on(Laya.UIEvent.CLICK, this, () => {
				this.box_choujiangMain.visible = false;
				this.box_jifenGet.visible = true;
			})
			this.btn_jifenReturn.on(Laya.UIEvent.CLICK, this, () => {
				this.box_choujiangMain.visible = true;
				this.box_jifenGet.visible = false;
			})
		}
		public changeVstack(): void {
			this.tab_choujiang.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstak_choujiang.selectedIndex = index;
			}, null, false);
			//抽奖热销00
			this.panel_choujiang00.vScrollBarSkin = '';
			this.vbox_choujiang00['sortItem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_choujiang00.addChild(new view.menu.MenuChoujiangSmallItem());
			}
			//抽奖礼券01
			this.panel_choujiang01.vScrollBarSkin = '';
			this.vbox_choujiang01['sortItem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_choujiang01.addChild(new view.menu.MenuChoujiangSmallItem());
			}
			//抽奖技能02
			this.panel_choujiang02.vScrollBarSkin = '';
			this.vbox_choujiang02['sortItem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_choujiang02.addChild(new view.menu.MenuChoujiangSmallItem());
			}
			//抽奖荣誉03
			this.panel_choujiang03.vScrollBarSkin = '';
			this.vbox_choujiang03['sortItem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_choujiang03.addChild(new view.menu.MenuChoujiangSmallItem());
			}
			//抽奖限购04
			this.panel_choujiang04.vScrollBarSkin = '';
			this.vbox_choujiang04['sortItem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_choujiang04.addChild(new view.menu.MenuChoujiangSmallItem());
			}
			//抽奖礼券05
			this.panel_choujiang05.vScrollBarSkin = '';
			this.vbox_choujiang05['sortItem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_choujiang05.addChild(new view.menu.MenuChoujiangSmallItem());
			}
		}
	}
}