/**Created by the LayaAirIDE*/
module view.main {
	export class MainPanel extends ui.main.MainPanelUI {
		constructor() {
			super();
			this.mainHeadFoot();
				}
		public setData(): void {
			this.ui_chatSendDialog.visible = false;
			this.ui_chatBigDialog.visible = false;
			this.ui_npcInfoDialog.visible = false;
			this.ui_sceneInfoDialog.visible = false;
			// NPC列表
			this.panel_npc.vScrollBarSkin = '';
			this.vbox_npc['sortItem'] = (items) => { };
			// NPC竖条 展开缩放的动画
			this.cek_showNpc.clickHandler = Laya.Handler.create(this, () => {
				if (this.cek_showNpc.selected) {
					Laya.Tween.to(this.cek_showNpc, { x: 0 }, 500, Laya.Ease.bounceOut);
					Laya.Tween.to(this.img_npc, { scaleX: 0 }, 500, Laya.Ease.bounceOut);
					this.ui_scene.changeToBig();
				}
				else {
					Laya.Tween.to(this.cek_showNpc, { x: 110 }, 500, Laya.Ease.bounceOut);
					Laya.Tween.to(this.img_npc, { scaleX: 1 }, 500, Laya.Ease.bounceOut);
					this.ui_scene.changeToSmall();
				}
			}, null, false);
			//  聊天小窗
			this.panel_sceneMsg.vScrollBarSkin = '';
			this.panel_chatMsg.vScrollBarSkin = '';
			this.vbox_chatMsg['sortItem'] = (items) => { };
			this.vbox_sceneMsg['sortItem'] = (items) => { };
			this.tab_task.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_task.selectedIndex = index;
				if (index == 1) {
					this.tab_task.labels = '场\n景,发\n送';
					this.tab_task.items[index].on(Laya.UIEvent.CLICK, this, () => {
						this.ui_chatSendDialog.visible = true;
					})
				}
				else {
					this.tab_task.labels = '场\n景,聊\n天';
				}
			}, null, false);
			this.tab_task.selectedIndex = 1;
			// 界面赋值
			let _player = GameApp.MainPlayer;
			// 名字
			this.lbl_playerName.text = _player.realName;
			// 等级
			if (_player.zslevel == null || _player.zslevel == 0) {
				this.lbl_level.text = '' + _player.level + '级';
			}
			else {
				this.lbl_level.text = '' + _player.zslevel + '转' + _player.level + '级';
			}
			console.log('========>', this.lbl_level.text);
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
			// 节气
			this.btn_jieQi.label = '【' + this.getJieQi() + '】';
			// 时辰
			this.btn_shiChen.label = '【' + this.getShiChen() + '】';
			this.addEvent();
			this.updateUI();
		}

		public addEvent(): void {
			// 模式切换
			this.box_modeChange.on(Laya.UIEvent.CLICK, this, () => {
				if ((this.box_modeChange.getChildAt(0) as Laya.Radio).selected) {
					this.box_mode0.visible = true;
					this.box_mode1.visible = false;
					for (let tempBtn of this.box_mode0._childs) {
						for (let _radio of tempBtn._childs) {
							_radio.selected = false;
						}
					}
					for (let tempBtn of this.box_modeChange._childs) {
						tempBtn.selected = false;
					}
					this.lbl_modeName.text = '小说模式';
					PanelManage.openMainPanel();
				}
				else {
					this.box_mode1.visible = true;
					this.box_mode0.visible = false;
					for (let tempBtn of this.box_mode1._childs) {
						for (let _radio of tempBtn._childs) {
							_radio.selected = false;
						}
					}
					for (let tempBtn of this.box_modeChange._childs) {
						tempBtn.selected = true;
					}
					this.lbl_modeName.text = '场景模式';
					PanelManage.openFuBenPanel();
				}
			});

			this.box_beiBao.on(Laya.UIEvent.CLICK, this, this.openPanel, ['box_beiBao']);
			this.box_jueSe.on(Laya.UIEvent.CLICK, this, this.openPanel, ['box_jueSe']);
			this.box_jiangHu.on(Laya.UIEvent.CLICK, this, this.openPanel, ['box_jiangHu']);
			this.box_yangCheng.on(Laya.UIEvent.CLICK, this, this.openPanel, ['box_yangCheng']);
			this.box_juQing.on(Laya.UIEvent.CLICK, this, this.openPanel, ['box_juQing']);
			this.box_FuBenInJuQing.on(Laya.UIEvent.CLICK, this, this.openPanel, ['box_FuBenInJuQing']);
			this.box_tuJian.on(Laya.UIEvent.CLICK, this, this.openPanel, ['box_tuJian']);
			this.box_task.on(Laya.UIEvent.CLICK, this, this.openPanel, ['box_task']);

			// 聊天大窗
			this.vstack_task.on(Laya.UIEvent.CLICK, this, () => {
				this.ui_chatBigDialog.visible = true;
			});
			this.btn_sceneMore.on(Laya.UIEvent.CLICK, this, () => {
				this.ui_sceneInfoDialog.visible = true;
			});
			// 菜单界面
			this.btn_menu.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_menu.selected = !this.btn_menu.selected;
				if (this.btn_menu.selected) {
					PanelManage.openMenuPanel()
				}
				else {
					PopUpManager.Dispose(PanelManage.Menu);
				}

			}

			);
			// 世界地图界面
			this.btn_worldMap.on(Laya.UIEvent.CLICK, this, () => { PanelManage.openWorldMapPanel() });
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
			GameApp.LListener.on(LcpEvent.UPDATE_UI_PLAYER_LEVEL, this, () => {
				if (_player.zslevel == null || _player.zslevel == 0) {
					this.lbl_level.text = '' + _player.level + '级';
				}
				else {
					this.lbl_level.text = '' + _player.zslevel + '转' + _player.level + '级';
				}
			});
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
			let _box;
			let _btn: Laya.Box = this[msg];
			// BOX状态
			let isOpen = (_btn.getChildAt(0) as Laya.Radio).selected;
			// 剧情副本模式
			let isMode = (this.box_modeChange.getChildAt(0) as Laya.Radio).selected;

			if (isMode) {
				_box = this.box_mode1;
			}
			else {
				_box = this.box_mode0;
			};

			if (isOpen) {
				if (isMode) {
					PopUpManager.showPanel(PanelManage.FuBen);
				}
				else {
					PanelManage.openMainPanel();
				}
			}
			else {
				switch (msg) {
					case "box_jueSe":
						PanelManage.openJueSePanel()
						break;
					case "box_beiBao":
						PanelManage.openBeiBaoPanel();
						break;
					case "box_jiangHu":
						PanelManage.openGuildSelectPanel();
						break;
					case "box_yangCheng":
						PanelManage.openYangChengPanel();
						break;

					case "box_juQing":
						// PanelManage.openFuBenPanel();
						break;
					case "box_FuBenInJuQing":
						// PanelManage.openFuBenPanel();
						break;
					case "box_tuJian":
						// PanelManage.openFuBenPanel();
						break;
					case "box_task":
						PanelManage.openTaskPanel();
						break;
				}
			};

			for (let tempBtn of _box._childs) {
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
		}


		/**
		 * 获取时辰
		 */
		public getShiChen(): string {
			return ['夜半', '鸡鸣', '平旦', '日出', '食时', '隅中', '日中', '日昳', '晡时', '日入', '黄昏', '人定'][parseInt('' + new Date().getHours() / 2)]
		}
		/**
		 * 获取节气
		 */
		public getJieQi(): string {
			let date = new Date();
			let dayCount = date.getDate() + date.getMonth() * 30;
			return ['立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋'
				, '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至', '小寒', '大寒'][parseInt('' + dayCount % 24)]
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
			let panel_small = this.panel_chatMsg; // 
			let vbox_small = this.vbox_chatMsg;  //  
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
			// 更新到小窗
			let small_txt: Laya.Label;
			if (vbox_small.numChildren > GameApp.GameEngine.chatDataSmallMax) {
				small_txt = vbox_small.getChildAt(0) as Laya.Label;
			}
			else {
				small_txt = new Laya.Label();
			}
			small_txt.text = _chatMsg;
			small_txt.fontSize = 16;//字号
			small_txt.bold = true;
			small_txt.width = 340;
			small_txt.wordWrap = true;
			vbox_small.addChild(small_txt);
			panel_small.scrollTo(null, panel_small.contentHeight);
			// 更新到大窗
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
					npcIcon.on(Laya.UIEvent.CLICK, this, () => { this.ui_npcInfoDialog.visible = true });
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
			switch (handleType) {
				case EnumData.HANDLE_TYPE.ADD:
					this.ui_scene.addMonster(obj);
					break;

				case EnumData.HANDLE_TYPE.REMOVE:
					this.ui_scene.removeMonster(obj);
					break;
			}

		}
		public mainHeadFoot():void{
			this.btn_shiChen.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.TimeDialog().popup(true);
			})
			this.btn_jieQi.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.SeasonDialog().popup(true);
			})
				this.btn_mapBig.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_mapBig.selected = !this.btn_mapBig.selected;
				if (this.btn_mapBig.selected) {
					this.ui_mainDownMapItem.visible=true
				}
				else {    
					PopUpManager.Dispose(this.ui_mainDownMapItem);
				}

			}

			);
		}
	}
}