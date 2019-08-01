/**Created by the LayaAirIDE*/
module view.juese {
	export class JueSePanel extends ui.juese.JueSePanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.panel_player.vScrollBarSkin = '';
			this.tab_player.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_player.selectedIndex = index;
			}, null, false);
			this.addEvent();
		}
		public addEvent(): void {
			this.box_change.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openDiZiPanel();
			})

		}
	}
}