/**Created by the LayaAirIDE*/
module view.main {
	export class Main_playerInfoDialog extends ui.main.Main_playerInfoDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.btn_changeHeadFrame.on(Laya.UIEvent.CLICK, this, () => {
				new view.main.Main_selectHeadDialog().popup(true);
			})
			this.btn_headMainClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}