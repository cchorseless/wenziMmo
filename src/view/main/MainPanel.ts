/**Created by the LayaAirIDE*/
module view.main {
	export class MainPanel extends ui.main.MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.ui_chatSendDialog.visible = false;
			this.ui_chatBigDialog.visible = false;
			this.ui_npcInfoDialog.visible = false;
			this.ui_sceneInfoDialog.visible = false;
			//  todo
			this.vstack_task.selectedIndex = 1;
			// NPC列表
			this.panel_npc.vScrollBarSkin = '';
			this.vbox_npc['sortItem'] = (items) => { };
			// NPC竖条 展开缩放的动画
			this.cek_showNpc.clickHandler = Laya.Handler.create(this, () => {
				if (this.cek_showNpc.selected) {
					Laya.Tween.to(this.cek_showNpc, { x: 0 }, 500, Laya.Ease.bounceOut);
					Laya.Tween.to(this.img_npc, { scaleX: 0 }, 500, Laya.Ease.bounceOut);
					Laya.Tween.to(this.img_sceneBg, { left: 0 }, 500, Laya.Ease.bounceOut);
				}
				else {
					Laya.Tween.to(this.cek_showNpc, { x: 110 }, 500, Laya.Ease.bounceOut);
					Laya.Tween.to(this.img_npc, { scaleX: 1 }, 500, Laya.Ease.bounceOut);
					Laya.Tween.to(this.img_sceneBg, { left: 115 }, 500, Laya.Ease.bounceOut);
				}
			}, null, false);
			let _player = GameApp.MainPlayer;
			// 名字
			this.lbl_playerName.text = _player.realName;
			// 等级
			this.lbl_level.text = '' + _player.zslevel + '转' + _player.level + '级';
			// 金币
			this.lbl_gold.text = '' + _player.wealth.gold;
			// 绑定金币
			this.lbl_goldlock.text = '' + _player.wealth.gold_lock;
			// 元宝
			this.lbl_yuanBao.text = '' + _player.wealth.yuanBao;
			// 绑定元宝
			this.lbl_yuanBaolock.text = '' + _player.wealth.yuanBao_lock;
			// 战斗力
			this.clip_power.value = '' + _player.ability.nFight;
			this.addEvent();
			this.updateUI();
		}

		public addEvent(): void {
			this.box_beiBao.on(Laya.UIEvent.CLICK, this, this.openPanel, ['box_beiBao']);
			this.box_jueSe.on(Laya.UIEvent.CLICK, this, this.openPanel, ['box_jueSe']);
			this.box_juQing.on(Laya.UIEvent.CLICK, this, this.openPanel, ['box_juQing']);
			this.box_jiangHu.on(Laya.UIEvent.CLICK, this, this.openPanel, ['box_jiangHu']);
			this.box_yangCheng.on(Laya.UIEvent.CLICK, this, this.openPanel, ['box_yangCheng']);
			// 任务 聊天 位置
			this.img_chat.on(Laya.UIEvent.CLICK, this, () => {
				this.ui_chatSendDialog.visible = true;
			});
			this.ui_chatSmallItem.btn_up.on(Laya.UIEvent.CLICK, this, () => {
				this.ui_chatBigDialog.visible = true;
			});
			this.btn_sceneMore.on(Laya.UIEvent.CLICK, this, () => {
				this.ui_sceneInfoDialog.visible = true;
			});
		}

		public updateUI(): void {
			let _player = GameApp.MainPlayer;
			// 金币
			GameApp.LListener.on(LcpEvent.UPDATE_UI_GOLD, this, () => { this.lbl_gold.text = '' + _player.wealth.gold; });
			// 绑定金币
			GameApp.LListener.on(LcpEvent.UPDATE_UI_GOLDLOCK, this, () => { this.lbl_goldlock.text = '' + _player.wealth.gold_lock; });
			// 元宝
			GameApp.LListener.on(LcpEvent.UPDATE_UI_YUANBAO, this, () => { this.lbl_yuanBao.text = '' + _player.wealth.yuanBao; });
			// 绑定元宝
			GameApp.LListener.on(LcpEvent.UPDATE_UI_YUANBAOLOCK, this, () => { this.lbl_yuanBaolock.text = '' + _player.wealth.yuanBao_lock; });
			// 战力
			GameApp.LListener.on(LcpEvent.UPDATE_UI_PLAYER_POWER, this, () => { this.clip_power.value = '' + _player.ability.nFight; });
			// 等级
			GameApp.LListener.on(LcpEvent.UPDATE_UI_PLAYER_LEVEL, this, () => { this.lbl_level.text = '' + _player.zslevel + '转' + _player.level + '级'; });
			// vip等级 todo
			// GameApp.LListener.on(LcpEvent.UPDATE_UI_GOLD, this, () => { this.font_vipLevel.value = '' + _player.viplvl; });
			// 经验
			GameApp.LListener.on(LcpEvent.UPDATE_UI_PLAYER_EXP, this, () => { });
			// 玩家战斗属性
			GameApp.LListener.on(LcpEvent.UPDATE_UI_PLAYER_ABILITY, this, () => { });
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
			let _btn: Laya.Box = this[msg];
			let isOpen = (_btn.getChildAt(0) as Laya.Radio).selected;
			for (let tempBtn of this.box_mainBottom._childs) {
				if (tempBtn == _btn) {
					for (let _radio of tempBtn._childs) {
						_radio.selected = !isOpen;
					}
				}
				else {
					for (let _radio of tempBtn._childs) {
						_radio.selected = false;
					}
				}

			}


			for (let _radio of _btn._childs) {
				_radio.selected = !isOpen;
			}

			if (isOpen) {
				PanelManage.openMainPanel()
			}
			else {
				switch (msg) {
					case "box_jueSe":
						PanelManage.openJueSePanel()
						break;
					case "box_beiBao":
						PanelManage.openBeiBaoPanel();
						break;
					case "box_juQing":
						PanelManage.openFuBenPanel();
						break;
					case "box_jiangHu":
						PanelManage.openSheJiaoPanel();
						break;
					case "box_yangCheng":
						PanelManage.openYangChengPanel();
						break;
				}
			}

		}

		/**
		 * 更新聊天界面
		 * @param data 
		 */
		public updateChatView(data: ProtoCmd.CretChat): void {
			let btChatType = data.getValue('btChatType');
			if (btChatType == null) {
				return
			}
			if (GameApp.GameEngine.chatData[btChatType] == null) {
				GameApp.GameEngine.chatData[btChatType] = [];
			}
			let _chatArray: Array<any> = GameApp.GameEngine.chatData[btChatType];
			if (_chatArray.length > GameApp.GameEngine.chatDataSingleMax) {
				_chatArray.shift()
			}

			let _chatMsg = '';
			switch (btChatType) {
				// 私聊
				case EnumData.ChatType.CHAT_TYPE_PRIVATE:
					_chatMsg += '[私聊]:' + data.chatMsg;
					break;
				// 当前屏幕聊天
				case EnumData.ChatType.CHAT_TYPE_REFMSG:
					_chatMsg += '[当前]:' + data.chatMsg;
					break;

				// 系统消息
				case EnumData.ChatType.CHAT_TYPE_SYSTEM:
					_chatMsg += '[系统]:' + data.chatMsg;
					break;

				// 队伍聊天
				case EnumData.ChatType.CHAT_TYPE_GROUP:
					_chatMsg += '[队伍]:' + data.chatMsg;
					break;

				// 帮会聊天
				case EnumData.ChatType.CHAT_TYPE_CLAN:
					_chatMsg += '[帮会]:' + data.chatMsg;
					break;

				// 世界聊天
				case EnumData.ChatType.CHAT_TYPE_WORLD:
					_chatMsg += '[世界]:' + data.chatMsg;
					break;
			}
			_chatArray.push(_chatMsg);
			this.ui_chatSmallItem.addLabel(btChatType, _chatMsg);
			this.ui_chatBigDialog.addLabel(btChatType, _chatMsg);
		}
		/**
		 * 更新NPC
		 * @param handleType 
		 * @param obj 
		 */
		public updateNpcView(handleType: EnumData.HANDLE_TYPE, obj: GameObject.Creature): void {
			switch (handleType) {
				case EnumData.HANDLE_TYPE.ADD:
					let npcIcon: ui.compart.NpcIconItemUI = new ui.compart.NpcIconItemUI();
					npcIcon.lbl_npcName.text = obj.objName;
					this.vbox_npc.addChild(npcIcon);
					break;

				case EnumData.HANDLE_TYPE.REMOVE:

					break;
			}

		}
		/**
		 * 更新玩家
		 * @param handleType 
		 * @param obj 
		 */
		public updatePlayerView(handleType: EnumData.HANDLE_TYPE, obj: GameObject.Creature): void {

		}
		/**
		 * 更新怪物
		 * @param handleType 
		 * @param obj 
		 */
		public updateMonstorView(handleType: EnumData.HANDLE_TYPE, obj: GameObject.Creature): void {

		}
	}
}