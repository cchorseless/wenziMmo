/**Created by the LayaAirIDE*/
module view.juese {
	export class JueSePanel extends ui.juese.JueSePanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.tab_player.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_player.getChildAt(index)['setData']();
				this.viw_player.selectedIndex = index;

			}, null, false);
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel()
			});
			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});
			for (let i = 0; i < 3; i++) {
				this['btn_dizi' + i].on(Laya.UIEvent.CLICK, this, () => {
					PanelManage.openDiZiPanel();
				})
			}
		}
	}
}