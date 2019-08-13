/**Created by the LayaAirIDE*/
module view.compart {
	export class JuQingContentV0Item extends ui.compart.JuQingContentV0ItemUI {
		constructor() {
			super();
		}

		public setData(txt: string): void {
			if (txt.length > 60) {
				this.height = 120;
			}
			this.lbl_content.text = txt;
		}
	}
}