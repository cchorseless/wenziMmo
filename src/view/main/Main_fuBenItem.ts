/**Created by the LayaAirIDE*/
module view.main {
	export class Main_fuBenItem extends ui.main.Main_fuBenItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_exit, Laya.UIEvent.CLICK, this, () => {
				PanelManage.Main.changeMode(0);
			})

		}
	}
}