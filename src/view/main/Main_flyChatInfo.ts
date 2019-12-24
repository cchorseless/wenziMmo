/**Created by the LayaAirIDE*/
module view.main {
	export class Main_flyChatInfo extends ui.main.Main_flyChatInfoUI {
		constructor() {
			super();
		}
		public setData(type, msgStr, name) {
			switch (type) {
				// 当前屏幕聊天
				case EnumData.ChatType.CHAT_TYPE_REFMSG:
					this.img_tab.skin = "image/main/tab_diangqian_0" + 5 + ".png";
					this.chat_type.strokeColor = "#717171";
					this.chat_type.text = "当前";
					this.showInfo(name, msgStr, false);
					break;
				// 系统消息
				case EnumData.ChatType.CHAT_TYPE_SYSTEM:
					this.img_tab.skin = "image/main/tab_diangqian_0" + 1 + ".png";
					this.chat_type.strokeColor = "#b65c41";
					this.chat_type.text = "系统";
					this.showInfo('[系统]', msgStr, true);
					break;

				// 世界聊天
				case EnumData.ChatType.CHAT_TYPE_WORLD:
					this.img_tab.skin = "image/main/tab_diangqian_0" + 2 + ".png";
					this.chat_type.strokeColor = "#7e41b6";
					this.chat_type.text = "世界";
					this.showInfo(name, msgStr, false);
					break;

				// 帮会聊天
				case EnumData.ChatType.CHAT_TYPE_CLAN:
					this.img_tab.skin = "image/main/tab_diangqian_0" + 3 + ".png";
					this.chat_type.strokeColor = "#4595b1";
					this.chat_type.text = "帮派";
					this.showInfo(name, msgStr, false);
					break;

				// 队伍聊天
				case EnumData.ChatType.CHAT_TYPE_GROUP:
					this.img_tab.skin = "image/main/tab_diangqian_0" + 4 + ".png";
					this.chat_type.strokeColor = "#4fb145";
					this.chat_type.text = "队伍";
					this.showInfo(name, msgStr, false);
					break;
			}
		}
		public showInfo(name, msgStr, isSys) {
			this.lab_chatName.text = name + ':'
			if (isSys) {
				this.html_content.x = this.lab_chatName.x + this.lab_chatName.width + 5;
				this.html_content.style.fontSize = 22;
				this.html_content.style.color = '#ffffff';
				this.html_content.style.stroke = 4;
				this.html_content.style.strokeColor = "#000000";
				this.html_content.style.fontFamily = 'STKaiti';
				this.html_content.innerHTML = msgStr;
				this.width = this.html_content.contextWidth + 30 + this.html_content.x;
				this.img_bg.width = this.width;
			} else {
				this.lab_content.x = this.lab_chatName.x + this.lab_chatName.width + 5;
				this.lab_content.text = msgStr;
				this.width = this.lab_content.width + 30 + this.lab_content.x;
				this.img_bg.width = this.width;
			}
		}

	}
}