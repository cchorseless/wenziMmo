/**Created by the LayaAirIDE*/
module view.compart {
	export class Chatinfo_system extends ui.compart.Chatinfo_systemUI {
		constructor() {
			super();
		}
		public setData(content: string, ) {
			this.html_showText.style.fontSize = 24;
			this.html_showText.style.fontFamily = "STKaiti";
			this.html_showText.style.bold = true;
			this.html_showText.style.wordWrap = true;
			this.html_showText.style.leading = 5;
			this.html_showText.style.align = 'left';
			this.html_showText.style.color = "#63491a"
			let txt = GameApp.DomUtil.dealwithChatTxt(content)
			this.html_showText.innerHTML = txt;
			if (txt.search('<a href=') > -1) {
				this.html_showText.on(Laya.Event.LINK, this, (data) => {
					console.log(data)
					let o = new juQingMode.JuQingContentDialog();
					o.setData(data)
					o.popup(true)
				})
			}

			this.uiResize()
		}
		public uiResize() {
			let num = this.html_showText.height;
			this.height = num + this.html_showText.y + 5
		}
	}
}