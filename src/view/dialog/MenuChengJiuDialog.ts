/**Created by the LayaAirIDE*/
module view.dialog {
	export class MenuChengJiuDialog extends ui.dialog.MenuChengJiuDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {

			this.addEvent();
		}
		public addEvent(): void {
			this.img_chengjiu00.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MenuChengJiuTanDialog().popup(true);
			})
			this.img_chengjiu01.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MenuChengJiuTanDialog().popup(true);
			})
			this.img_chengjiu02.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MenuChengJiuTanDialog().popup(true);
			})
			this.img_chengjiu03.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MenuChengJiuTanDialog().popup(true);
			})
			this.btn_menuChengjiuClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}