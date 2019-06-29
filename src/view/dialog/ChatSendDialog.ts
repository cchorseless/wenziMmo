/**Created by the LayaAirIDE*/
module view.dialog {
	export class ChatSendDialog extends ui.dialog.ChatSendDialogUI {
		constructor() {
			super();
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
				lcp.send(new ProtoCmd.CretChat().setString(this.txtInput_0.text))
				PanelManage.Main.ui_chatSmallItem.addLabel(this.txtInput_0.text)

			})
		}

	}
}