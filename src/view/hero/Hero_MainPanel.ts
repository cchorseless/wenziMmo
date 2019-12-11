/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_MainPanel extends ui.hero.Hero_MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.tab_left.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_left.selectedIndex = index;
			}, null, false);
			this.addEvent();
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel()
			})
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			})
			EventManage.onWithEffect(this.btn_self, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJueSePanel();
			})
		}
	}
}