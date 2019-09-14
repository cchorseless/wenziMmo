/**Created by the LayaAirIDE*/
module view.compart {
	export class JuQingContentV1Item extends ui.compart.JuQingContentV1ItemUI {
		constructor() {
			super();
		}

		public setData(txt: string): void {
			this.lbl_content.text = txt;
			// 自己的头像
			this.ui_item.lbl_zuoBiao.visible = false;
			this.ui_item.img_tips.visible = false;
			this.ui_item.img_avatarPic.skin = GameApp.MainPlayer.iconAvatarPic;
			this.ui_item.lbl_npcName.text = '我自己';
		}
	}
}