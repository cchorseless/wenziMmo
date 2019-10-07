/**Created by the LayaAirIDE*/
module view.main {
	export class Main_selectHeadDialog extends ui.main.Main_selectHeadDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.panel_1.vScrollBarSkin = '';
			this.vbox_1['sortItem'] = (items) => { };
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_top.selectedIndex = index;
			}, null, false);
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_headClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}