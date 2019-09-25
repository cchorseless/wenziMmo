/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQingContentV1Item extends ui.juQingMode.JuQingContentV1ItemUI {
		constructor() {
			super();
		}

		public setData(txt: string): void {
			txt = this.dealTxt(txt);
			// 处理文本
			this.div_content.style.fontSize = 24;
			this.div_content.style.wordWrap = true;
			this.div_content.style.leading = 5;
			this.div_content.style.align = 'middle';
			this.div_content.innerHTML = txt.replace(/拎壶冲/g, "<font color='#17930d'>" + GameApp.MainPlayer.objName + "</font>");
			// 自己的头像
			this.ui_item.lbl_zuoBiao.visible = false;
			this.ui_item.img_tips.visible = false;
			this.ui_item.img_avatarPic.skin = GameApp.MainPlayer.iconAvatarPic;
			this.ui_item.lbl_npcName.text = GameApp.MainPlayer.objName;
		}
		public dealTxt(txt): string {
			// 处理名字
			txt = txt.replace(/拎壶冲/g, "<font color='#17930d'>" + GameApp.MainPlayer.objName + "</font>");
			// 处理事件
			txt = txt.replace(/【e/g, "<font color='#17930d'>");
			txt = txt.replace(/e】/g, "</font>");
			// 处理道具
			txt = txt.replace(/【i/g, "<font color='#17930d'>");
			txt = txt.replace(/i】/g, "</font>");
			// 处理NPC 怪物
			txt = txt.replace(/【m/g, "<font color='#17930d'>");
			txt = txt.replace(/m】/g, "</font>");
			// 处理地点
			txt = txt.replace(/【p/g, "<font color='#17930d'>");
			txt = txt.replace(/p】/g, "</font>");
			// 处理超链接
			txt = txt.replace(/【a/g, "<a href=");
			txt = txt.replace(/a】/g, "</a>");
			return txt
		}
	}
}