/**Created by the LayaAirIDE*/
module view.main {
	export class MainPanel extends ui.main.MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.ui_mainPlayer.lbl_name.text = GameApp.MainPlayer.realName;
			this.lbl_playerName.text = GameApp.MainPlayer.realName;
			this.ui_chatSendDialog.visible = false;
			// 任务0 闲聊1 位置2
			this.tab_task.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_task.selectedIndex = index;
				if (index == 1) {
					this.tab_task.labels = '任务,输入,位置';
					this.tab_task.items[index].on(Laya.UIEvent.CLICK, this, () => {
						this.ui_chatSendDialog.visible = true;
					})
				}
				else {
					this.tab_task.labels = '任务,闲聊,位置';
				}
			}, null, false)
			this.addEvent();
		}

		public addEvent(): void {
			this.btn_beiBao.on(Laya.UIEvent.CLICK, this, this.openPanel, ['beiBao']);
			this.btn_role.on(Laya.UIEvent.CLICK, this, this.openPanel, ['role']);
			this.btn_fuBen.on(Laya.UIEvent.CLICK, this, this.openPanel, ['fuBen']);
			this.btn_sheJiao.on(Laya.UIEvent.CLICK, this, this.openPanel, ['sheJiao']);
			this.btn_yangCheng.on(Laya.UIEvent.CLICK, this, this.openPanel, ['yangCheng']);
		}

		//界面切换时控制那些部分不变
		public showGroupTop(panel: Laya.View): void {
			this.box_mainTop.visible = true;
			panel.addChild(this.box_mainTop);
		}

		// 界面切换时控制那些部分不变
		public showGroupBottom(panel: Laya.View): void {
			this.box_mainBottom.visible = true;
			panel.addChild(this.box_mainBottom);
		}

		public openPanel(msg): void {
			switch (msg) {
				case "role":
					PanelManage.openJueSePanel()
					break;
				case "beiBao":
					break;
				case "fuBen":
					break;
				case "sheJiao":
					break;
				case "yangCheng":
					break;
			}
		}

		/**
		 * 更新聊天界面
		 * @param data 
		 */
		public updateChatView(data: ProtoCmd.CretChat): void {

			let btChatType = data.getValue('btChatType');
			console.log(btChatType);
			if (btChatType == null) {
				return
			}

			if (GameApp.GameEngine.chatData[btChatType] == null) {
				GameApp.GameEngine.chatData[btChatType] = [];
			}

			GameApp.GameEngine.chatData[btChatType].push(data.chatMsg);

			this.hbox_chat.addChild(new Laya.Label(data.chatMsg))

			switch (btChatType) {
				// 私聊
				case EnumData.ChatType.CHAT_TYPE_PRIVATE:
					// this.hbox_chat.addChild(new Laya.Label(data.chatMsg))
					break;
				// 当前屏幕聊天
				case EnumData.ChatType.CHAT_TYPE_REFMSG:
					break;
			}
		}
	}
}