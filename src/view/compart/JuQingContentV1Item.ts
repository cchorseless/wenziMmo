/**Created by the LayaAirIDE*/
module view.compart {
	export class JuQingContentV1Item extends ui.compart.JuQingContentV1ItemUI {
		constructor() {
			super();
		}
		public setData(txt: string): void {
			this.lbl_content.text = txt;
		}
	}
}