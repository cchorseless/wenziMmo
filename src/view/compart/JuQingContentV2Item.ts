/**Created by the LayaAirIDE*/
module view.compart {
	export class JuQingContentV2Item extends ui.compart.JuQingContentV2ItemUI {
		constructor() {
			super();
		}
		public setData(npcid: string, txt: string): void {
			this.lbl_content.text = txt;
		}
	}
}