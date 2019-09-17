/**Created by the LayaAirIDE*/
module view.compart {
	export class JuQingContentV0Item extends ui.compart.JuQingContentV0ItemUI {
		constructor() {
			super();
		}

		public setData(txt: string): void {
			this.div_content.style.fontSize = 24;
			this.div_content.style.wordWrap = true;
			this.div_content.style.leading = 5;
			this.div_content.style.align = 'middle';
			this.div_content.innerHTML = txt;
		}
	}
}