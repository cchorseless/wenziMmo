/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQingContentV1Item extends ui.juQingMode.JuQingContentV1ItemUI {
		constructor() {
			super();
		}

		public setData(txt: string): void {
			txt = GameApp.DomUtil.dealWithTalkTxt(txt);
			// 处理文本
			this.div_content.style.fontSize = 24;
			this.div_content.style.wordWrap = true;
			this.div_content.style.leading = 5;
			this.div_content.style.align = 'middle';
			this.div_content.innerHTML = txt;
			// 自己的头像
			this.ui_item.lbl_zuoBiao.visible = false;
			this.ui_item.img_tips.visible = false;
			this.ui_item.img_avatarPic.skin = GameApp.MainPlayer.iconAvatarPic;
			this.ui_item.lbl_npcName.text = GameApp.MainPlayer.objName;
		}

	}
}