/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenPanel extends ui.fuBen.FuBenPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_left.vScrollBarSkin = '';

			this.addEvent();
		}

		public addEvent(): void {
			this.btn_goJuQing.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingTalkPanel();
			})
		}
	}
}