/**Created by the LayaAirIDE*/
module view.compart {
	export class ChatSmallItem extends ui.compart.ChatSmallItemUI {
		public labFontSize = 20;//字体大小
		constructor() {
			super();
			this.setData();
		}

		public setData() {
			this.panel_small.vScrollBarSkin = '';
			this.vbox_small['sortItem'] = (items) => { };

			this.addEvent();
		}

		public addEvent(): void {

		}


		/**
		 * 添加聊天信息
		 * @param str 
		 */
		public addLabel(chatType: EnumData.ChatType, str: string) {
			// 小窗
			let small_txt: Laya.Label;
			if (this.vbox_small.numChildren > GameApp.GameEngine.chatDataSmallMax) {
				small_txt = this.vbox_small.getChildAt(0) as Laya.Label;
			}
			else {
				small_txt = new Laya.Label();
			}
			small_txt.text = str;
			small_txt.fontSize = this.labFontSize;
			small_txt.bold = true;
			small_txt.width = 500;
			small_txt.wordWrap = true;
			this.vbox_small.addChild(small_txt);
			this.panel_small.scrollTo(null, this.panel_small.contentHeight);
		}
	}
}