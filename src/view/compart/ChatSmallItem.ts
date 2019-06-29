/**Created by the LayaAirIDE*/
module view.compart {
	export class ChatSmallItem extends ui.compart.ChatSmallItemUI {
		public maxChatCount = 50;//显示的最大聊天条数
		public labFontSize = 30;//字体大小
		constructor() {
			super();
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
		}

		/**
		 * 添加聊天信息
		 * @param str 
		 */
		public addLabel(str: string) {
			let txt: Laya.Label;
			if (this.vbox_0.numChildren > this.maxChatCount) {
				txt = this.vbox_0.getChildAt(0) as Laya.Label;
			}
			else {
				txt = new Laya.Label();
			}
			txt.text = str;
			txt.fontSize = this.labFontSize;
			txt.bold = true;
			this.vbox_0.addChild(txt);
			this.panel_0.scrollTo(null, this.panel_0.contentHeight);
		}
	}
}