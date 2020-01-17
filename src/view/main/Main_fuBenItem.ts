/**Created by the LayaAirIDE*/
module view.main {
	export class Main_fuBenItem extends ui.main.Main_fuBenItemUI {
		public taoLuID = 0;
		constructor() {
			super();
			this.addEvent();
		}
		public setData() {
			let tab;
			let key = 400
			if (GameApp.MainPlayer.skillShotButton[key]) {
				tab = GameApp.MainPlayer.skillShotButton[key].i64Id.int64ToNumber();
			} else {
				tab = 0;
			}
			this.taoLuID = tab;
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_exit, Laya.UIEvent.CLICK, this, () => {
				PanelManage.Main.changeMode(0);
			})

		}
	}
}