/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleFuBenInfoV3Item extends ui.scene.BattleFuBenInfoV3ItemUI {
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