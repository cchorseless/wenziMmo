/**Created by the LayaAirIDE*/
module view.dialog {
	export class MenuPaiHangDialog extends ui.dialog.MenuPaiHangDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.addEvent();
		}
		public addEvent(): void { 
			this.panel_menuPaiming.hScrollBarSkin='';
			this.btn_menuPaiMingClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}