/**Created by the LayaAirIDE*/
module view.compart {
	export class JuQingContentV1Item extends ui.compart.JuQingContentV1ItemUI {
		constructor() {
			super();
		}

		public setData(txt: string): void {
			this.lbl_content.text = txt;
			// 自己的头像
			this.ui_item.lbl_chat.visible = false;
			this.ui_item.lbl_npcName.visible = false;
			this.ui_item.img_warn.visible = false;
			this.ui_item.img_avatarPic.skin = GameApp.MainPlayer.iconAvatarPic;
		}
	}
}