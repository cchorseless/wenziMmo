/**Created by the LayaAirIDE*/
module view.main {
	export class Main_LuYinDialog extends ui.main.Main_LuYinDialogUI {
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