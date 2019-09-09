/**Created by the LayaAirIDE*/
module view.dialog {
	export class MainLuYinDialog extends ui.dialog.MainLuYinDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.tab_luyin.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstak_luyin.selectedIndex = index;
			}, null, false);
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}