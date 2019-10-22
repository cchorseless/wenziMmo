/**Created by the LayaAirIDE*/
module view.juese {
	export class PersonPanel extends ui.juese.PersonPanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.tab_player.selectHandler = Laya.Handler.create(this, (index) => {
				(this.viw_player.getChildAt(index) as any).setData();
				this.viw_player.selectedIndex = index;
				this.img_cloud.visible = index == 1;
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
					PanelManage.openDiZiPanel(i);
				})
			}
		}
		public Dispose(): void {
			console.log(1111111111, 'PersonPanel')
			PopUpManager.Dispose(this)
		}
	}
}