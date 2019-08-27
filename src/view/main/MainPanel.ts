/**Created by the LayaAirIDE*/
module view.main {
	export class MainPanel extends ui.main.MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.ui_chatSendDialog.visible = false;
			this.ui_chatBigDialog.visible = false;
			// NPC列表
			this.panel_npc.vScrollBarSkin = '';
			this.vbox_npc['sortItem'] = (items) => { };
			// NPC竖条 展开缩放的动画
			this.cek_showNpc.clickHandler = Laya.Handler.create(this, () => {
				if (this.cek_showNpc.selected) {
					Laya.Tween.to(this.cek_showNpc, { x: 0 }, 500, Laya.Ease.bounceOut);
					Laya.Tween.to(this.img_npc, { scaleX: 0 }, 500, Laya.Ease.bounceOut, Laya.Handler.create(this, () => {
						this.img_npc.visible = false;
					}));
					this.ui_scene.changeToBig();
				}
				else {
					this.img_npc.visible = true;
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
					this.tab_task.labels = '场景,发送';
					this.tab_task.items[index].on(Laya.UIEvent.CLICK, this, () => {
						this.ui_chatSendDialog.visible = true;
					})
				}
				else {
					this.tab_task.labels = '场景,聊天';
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
			this.btn_jieQi.label = '' + this.getJieQi();
			// 时辰
			this.btn_shiChen.label = '' + this.getShiChen();
			this.addEvent();
			this.updateUI();
		}

		public addEvent(): void {
			// 模式切换
			EventManage.onWithEffect(this.btn_modeChange, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			})
			// 物品
			EventManage.onWithEffect(this.btn_wuPin, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openBeiBaoPanel();
			});
			// 角色
			EventManage.onWithEffect(this.btn_jueSe, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJueSePanel()
			});
			// 武学
			EventManage.onWithEffect(this.btn_wuXue, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueWaiGongPanel();
			});
			// 江湖
			EventManage.onWithEffect(this.btn_jiangHu, Laya.UIEvent.CLICK, this, () => {
				// 判定 有无公会
				let dwClanId = GameApp.MainPlayer.feature.dwClanId;
				// 有工会
				if (dwClanId) {
					PanelManage.openGuildTeamPanel(dwClanId);
				}
				// 无工会
				else {
					PanelManage.openGuildSelectPanel();
				}
			});
			// 养成宅院
			EventManage.onWithEffect(this.btn_zhaiYuan, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openYangChengPanel();
			});

			// 聊天大窗
			this.vstack_task.on(Laya.UIEvent.CLICK, this, () => {
				this.ui_chatBigDialog.visible = true;
			});

			// 菜单界面
			EventManage.onWithEffect(this.btn_menu,Laya.UIEvent.CLICK, this, () => {
				this.btn_menu.selected = !this.btn_menu.selected;
				if (this.btn_menu.selected) {
					PanelManage.openMenuPanel()
				}
				else {
					PopUpManager.Dispose(PanelManage.Menu);
				}

			});

			// 时辰界面
			this.btn_shiChen.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.TimeDialog().setData(null).popup(true);
			});
			// 节气界面
			this.btn_jieQi.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.SeasonDialog().setData(null).popup(true);
			});
			// 换头像界面
			this.box_head.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MainChangeDialog().popup(true);
			});
			// 地图展开界面
			this.btn_mapBig.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_mapBig.selected = !this.btn_mapBig.selected;
				this.btn_mapBig.scaleY = -this.btn_mapBig.scaleY;
				if (this.btn_mapBig.selected) {
					this.ui_mainDownMapItem.showSelf(true);
				}
				else {
					this.ui_mainDownMapItem.showSelf(false);
				}
			})

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
			GameApp.LListener.on(LcpEvent.UPDATE_UI_GOLD, this, () => { this.font_vipLevel.value = '' + _player.viplvl; });
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
					let npcIcon: view.compart.NpcIconItem = new view.compart.NpcIconItem();
					npcIcon.setData(obj)
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
		public updateMonsterView(handleType: EnumData.HANDLE_TYPE, obj: GameObject.Creature): void {
			switch (handleType) {
				case EnumData.HANDLE_TYPE.ADD:
					this.ui_scene.addMonster(obj);
					break;

				case EnumData.HANDLE_TYPE.REMOVE:
					this.ui_scene.removeMonster(obj);
					break;
			}

		}

		public clearNpcView(): void {
			this.vbox_npc.removeChildren();
		}
		public clearPlayerView(): void {
			this.ui_scene.clearPlayer();
		}
		public clearMonsterView(): void {
			this.ui_scene.clearMonster();
		}
	}
}