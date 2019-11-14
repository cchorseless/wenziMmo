/**Created by the LayaAirIDE*/
module view.fuli {
	export class FuLi_MainPanel extends ui.fuli.FuLi_MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.tab_fuli.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_fuli.selectedIndex = index;
			}, null, false);
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
		}
	}
}