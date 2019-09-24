/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQingContentV0Item extends ui.juQingMode.JuQingContentV0ItemUI {
		constructor() {
			super();
		}

		public setData(txt: string): void {
			this.div_content.style.fontSize = 24;
			this.div_content.style.wordWrap = true;
			this.div_content.style.leading = 5;
			this.div_content.style.align = 'middle';
			this.div_content.innerHTML = txt.replace(/拎壶冲/g, "<font color='#17930d'>" + GameApp.MainPlayer.objName + "</font>");
		}
	}
}