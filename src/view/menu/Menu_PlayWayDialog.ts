/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_PlayWayDialog extends ui.menu.Menu_PlayWayDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public index = 1;
		public setData(): void {
			this.panel_play.vScrollBarSkin = '';
			this.vbox_play['sortItem'] = (items) => { };
			this.btn_0.selected = true;
			this.btn_0.labelStroke = 4;
			this.addEvent();
			this.init_getData();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			for (let i = 0; i < 6; i++) {
				this['btn_' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.index = i + 1;
					for (let j = 0; j < 6; j++) {
						this['btn_' + j].selected = false;
						this['btn_' + j].labelStroke = 0;
					}
					this['btn_' + i].selected = !this['btn_' + i].selected;
					if (this['btn_' + i].selected) {
						this['btn_' + i].labelStroke = 4;
					}
					else {
						this['btn_' + i].labelStroke = 0;
					}
					this.init_getData();
				})
			}
		}
		public init_getData(): void {
			let listArray = GameConfigFunc.StrategyGETDATALIST(this.index);
			let keys = Object.keys(listArray);
			this.vbox_play.removeChildren();
			for (let key of keys) {
				let data = listArray[key];
				this.vbox_play.addChild(new view.menu.Menu_PlayWayItem().setData(data))
			}
		}
	}
}