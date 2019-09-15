/**Created by the LayaAirIDE*/
module view.compart {
	export class JuQingContentV1Item extends ui.compart.JuQingContentV1ItemUI {
		constructor() {
			super();
		}

		public setData(txt: string): void {
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