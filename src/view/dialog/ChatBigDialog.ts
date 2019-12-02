/**Created by the LayaAirIDE*/
module view.dialog {
	export class ChatBigDialog extends ui.dialog.ChatBigDialogUI {
		public labFontSize = 20;//字体大小
		constructor() {
			super();
			this.setData();
		}

		// 频道类型
		public curChatType: EnumData.ChatType = EnumData.ChatType.CHAT_TYPE_REFMSG;
		public setData(): void {
			for (let _panel of this.viw_big._childs) {
				_panel.vScrollBarSkin = '';
			}
			for (let i = 0; i < this.viw_big.numChildren; i++) {
				this['vbox_big' + i]['sortItem'] = (items) => { };
			}
			this.tab_big.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_big.selectedIndex = index;
				this.box_send.visible = (index > 1);
				this.lab_cantSend.visible = !this.box_send.visible;
				switch (index) {
					// 当前
					case 0:
					case 5:
						this.curChatType = EnumData.ChatType.CHAT_TYPE_REFMSG;
						break;
					// 世界
					case 2:
						this.curChatType = EnumData.ChatType.CHAT_TYPE_WORLD;
						break;
					// 系统
					case 1:
						this.curChatType = EnumData.ChatType.CHAT_TYPE_SYSTEM;
						break;
					// 帮派
					case 3:
						this.curChatType = EnumData.ChatType.CHAT_TYPE_CLAN;
						break;
					// 组队
					case 4:
						this.curChatType = EnumData.ChatType.CHAT_TYPE_GROUP;
						break;
				}

			}, null, false);
			this.addEvent();
		}

		public addEvent(): void {
			this.btn_down.on(Laya.UIEvent.CLICK, this, () => {
				this.visible = false;
			});
			this.btn_send.on(Laya.UIEvent.CLICK, this, () => {
				if (this.txtInput_big.text == '') {
					TipsManage.showTips('不能发送空字符');
					return
				}
				let chat: ProtoCmd.CretChat = new ProtoCmd.CretChat();
				chat.setValue('btChatType', this.curChatType);
				chat.setValue('btCountryInfoId', 1);
				chat.setValue('dwSrcOnlyId', GameApp.MainPlayer.onlyId);
				chat.setValue('szName', GameApp.MainPlayer.objName);
				chat.setValue('dwSendTime', 0);
				chat.setString(this.txtInput_big.text);
				lcp.send(chat)
				this.txtInput_big.text = '';
			});
		}

		/**
		 * 添加聊天信息
		 * @param chatType 
		 * @param str 
		 * @param senderName   发送方姓名
		 * @param send_VIPLv   发送方VIP等级
		 */
		public addLabel(chatType: EnumData.ChatType, str: string, senderName: string, send_VIPLv: number,zslv,lv,path) {
			let all_txt;
			Laya.timer.frameOnce(2, this, () => { this.panel_big0.scrollTo(null, this.panel_big0.contentHeight); })

			// 单个频道
			let _curIndex = 5;
			switch (chatType) {

				// 当前屏幕聊天
				case EnumData.ChatType.CHAT_TYPE_REFMSG:
					_curIndex = 5;
					all_txt = new compart.ChatInfo();
					all_txt.setData(str,senderName,_curIndex,send_VIPLv,lv,zslv,path)
					this["vbox_big" + _curIndex].addChild(all_txt);
					let base5 = new compart.ChatInfo();
					base5.setData(str,senderName,_curIndex,send_VIPLv,lv,zslv,path)
					this["vbox_big" + 0].addChild(base5);
					break;

				// 系统消息
				case EnumData.ChatType.CHAT_TYPE_SYSTEM:
					_curIndex = 1;
					all_txt = new compart.Chatinfo_system();
					all_txt.setData(str)
					this["vbox_big" + _curIndex].addChild(all_txt);
					let base1 = new compart.Chatinfo_system();
					base1.setData(str)
					this["vbox_big" + 0].addChild(base1);
					break;

				// 世界聊天
				case EnumData.ChatType.CHAT_TYPE_WORLD:
					_curIndex = 2;
					all_txt = new compart.ChatInfo();
					all_txt.setData(str,senderName,_curIndex,send_VIPLv,lv,zslv,path)
					this["vbox_big" + _curIndex].addChild(all_txt);
					this.vbox_big2.numChildren
					let base2 = new compart.ChatInfo();
					base2.setData(str,senderName,_curIndex,send_VIPLv,lv,zslv,path)
					this["vbox_big" + 0].addChild(base2);
					break;

				// 帮会聊天
				case EnumData.ChatType.CHAT_TYPE_CLAN:
					_curIndex = 3;
					all_txt = new compart.ChatInfo();
					all_txt.setData(str,senderName,_curIndex,send_VIPLv,lv,zslv,path)
					this["vbox_big" + _curIndex].addChild(all_txt);
					let base3 = new compart.ChatInfo();
					base3.setData(str,senderName,_curIndex,send_VIPLv,lv,zslv,path)
					this["vbox_big" + 0].addChild(base3);
					break;

				// 队伍聊天
				case EnumData.ChatType.CHAT_TYPE_GROUP:
					_curIndex = 4;
					all_txt = new compart.ChatInfo();
					all_txt.setData(str,senderName,_curIndex,send_VIPLv,lv,zslv,path)
					this["vbox_big" + _curIndex].addChild(all_txt);
					let base4 = new compart.ChatInfo();
					base4.setData(str,senderName,_curIndex,send_VIPLv,lv,zslv,path)
					this["vbox_big" + 0].addChild(base4);
					break;

			}



			// let _curVbox: Laya.VBox = this['vbox_big' + _curIndex];
			// let _curPanel: Laya.Panel = this['panel_big' + _curIndex];
			// let single_txt;
			// if (_curVbox.numChildren > GameApp.GameEngine.chatDataSingleMax) {
			// 	single_txt = _curVbox.getChildAt(0) as Laya.Label;
			// }
			// else {
			// 	single_txt = new Laya.Label();
			// }
			// single_txt.text = str;
			// single_txt.fontSize = this.labFontSize;
			// single_txt.bold = true;
			// single_txt.width = 500;
			// single_txt.wordWrap = true;
			// _curVbox.addChild(single_txt);
			// Laya.timer.frameOnce(2, this, () => { _curPanel.scrollTo(null, _curPanel.contentHeight); })
		}
	}
}
