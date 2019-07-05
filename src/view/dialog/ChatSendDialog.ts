/**Created by the LayaAirIDE*/
module view.dialog {
	export class ChatSendDialog extends ui.dialog.ChatSendDialogUI {
		constructor() {
			super();
			this.setData();

		}
		public curChatType: EnumData.ChatType = EnumData.ChatType.CHAT_TYPE_REFMSG;
		setData(): void {
			this.rad_type.selectHandler = Laya.Handler.create(this, (index) => {
				switch (index) {
					// 当前
					case 0:
						this.curChatType = EnumData.ChatType.CHAT_TYPE_REFMSG;
						break;
					// 世界
					case 1:
						this.curChatType = EnumData.ChatType.CHAT_TYPE_WORLD;
						break;
					// 组队
					case 2:
						this.curChatType = EnumData.ChatType.CHAT_TYPE_GROUP;
						break;
					// 帮会
					case 3:
						this.curChatType = EnumData.ChatType.CHAT_TYPE_CLAN;
						break;
				}
			}, null, false);


			this.addEvent();
		}
		addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.txtInput_0.text = '';
				this.visible = false;
			});

			this.btn_send.on(Laya.UIEvent.CLICK, this, () => {
				if (this.txtInput_0.text == '') {
					TipsManage.showTips('不能发送空字符');
					return
				}
				let chat: ProtoCmd.CretChat = new ProtoCmd.CretChat();
				chat.setValue('btChatType', this.curChatType);
				chat.setValue('btCountryInfoId', 1);
				chat.setValue('dwSrcOnlyId', GameApp.MainPlayer.onlyId);
				chat.setValue('szName', GameApp.MainPlayer.objName);
				chat.setValue('dwSendTime', 0);
				chat.setString(this.txtInput_0.text);
				lcp.send(chat)
				this.txtInput_0.text = '';
			})
		}

	}
}