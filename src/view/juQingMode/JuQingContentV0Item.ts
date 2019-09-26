/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQingContentV0Item extends ui.juQingMode.JuQingContentV0ItemUI {
		constructor() {
			super();
		}

		public setData(txt: string): void {
			txt = GameApp.DomUtil.dealWithTalkTxt(txt);
			this.div_content.style.fontSize = 24;
			this.div_content.style.wordWrap = true;
			this.div_content.style.leading = 5;
			this.div_content.style.align = 'middle';
			this.div_content.innerHTML = txt;
			if (txt.search('<a href=') > -1) {
				this.div_content.on(Laya.Event.LINK, this, (data) => { console.log(data) })
			}
		}
	}
}