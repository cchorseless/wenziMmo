/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuChengJiuTanDialog extends ui.menu.MenuChengJiuTanDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {

			this.addEvent();
		}
		public addEvent(): void {
			this.btn_menuChengJiuTClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})

		}
	}
}