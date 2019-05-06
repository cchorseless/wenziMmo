/**Created by the LayaAirIDE*/
module view.common {
	export class TipsShowPanel extends ui.common.TipsShowPanelUI {
		constructor() {
			super();
			this.mouseEnabled = true;
		}
		public setData(data): void {
			this.lbl_des.text = data;

		}
	}
}