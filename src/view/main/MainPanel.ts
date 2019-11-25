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
			//  聊天小窗
			this.panel_sceneMsg.vScrollBarSkin = '';
			this.panel_chatMsg.vScrollBarSkin = '';
			this.vbox_chatMsg['sortItem'] = (items) => { };
			this.vbox_sceneMsg['sortItem'] = (items) => { };
			// 大地图
			this.panel_bigMap.hScrollBarSkin = '';
			this.panel_bigMap.scale(0, 0);
			// 聊天信息
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
			this.initUI();
			this.addEvent();
			this.visible = false;
		}

		/**
		 * 适配处理
		 */
		public initUI(): void {
			let getScaleY = PanelManage.getScaleY();
			this.img_bottomPartInfoBg.scaleY = getScaleY;
			this.img_npc.scaleY = getScaleY;
			this.box_uiScene0.scaleY = getScaleY;
			this.box_uiScene1.scaleY = getScaleY;
			this.ui_battleSkill.bottom = this.ui_battleSkill.bottom * getScaleY;
		}

		/**
		 * 切换界面时刷新数据
		 */
		public updateUI(): void {
			// 界面赋值
			this.updateUI_name();
			this.updateUI_avatarIcon();
			this.updateUI_exp()
			this.updateUI_lv()
			this.updateUI_gold()
			this.updateUI_yuanBao()
			this.updateUI_yuanBaolock()
			this.updateUI_power()
			this.updateUI_vipLv();
			// 时辰
			this.lbl_shiChen.text = '' + this.getShiChen();
		}


		/**
		 * 更新名字
		 */
		public updateUI_name(): void {
			let _player = GameApp.MainPlayer;		// 名字
			this.lbl_playerName.text = _player.objName;
		}
		/**
		 * 更新经验
		 */
		public updateUI_exp(): void {
			let _player = GameApp.MainPlayer;
			// 经验比例
			let expBiLi = Math.ceil(_player.ability.nowexp / _player.ability.maxexp * 100);
			this.img_exp.width = this.img_expBg.width * expBiLi / 100;
			this.lbl_level.text = '' + LangConfig.getLevelDes(_player.zslevel, _player.level) + '(' + expBiLi + '%)'

		}
		/**
		 * 更新等级
		 */
		public updateUI_lv(): void {
			let _player = GameApp.MainPlayer;
			// 等级
			let expBiLi = Math.ceil(_player.ability.nowexp / _player.ability.maxexp * 100);
			this.lbl_level.text = '' + LangConfig.getLevelDes(_player.zslevel, _player.level) + '(' + expBiLi + '%)'
		}
		/**
		 * 更新金币
		 */
		public updateUI_gold(): void {
			let _player = GameApp.MainPlayer;
			// 金币
			this.lbl_gold.text = '' + LangConfig.getBigNumberDes(_player.wealth.gold);
		}
		/**
		 * 更新元宝
		 */
		public updateUI_yuanBao(): void {
			let _player = GameApp.MainPlayer;
			// 元宝
			this.lbl_yuanBao.text = '' + LangConfig.getBigNumberDes(_player.wealth.yuanBao);
		}
		/**
		 * 更新绑定元宝
		 */
		public updateUI_yuanBaolock(): void {
			let _player = GameApp.MainPlayer;
			// 绑定元宝
			this.lbl_yuanBaolock.text = '' + LangConfig.getBigNumberDes(_player.wealth.yuanBao_lock);
		}
		/**
		 * 更新战力
		 */
		public updateUI_power(): void {
			let _player = GameApp.MainPlayer;
			// 战斗力
			let fight = _player.ability.nFight;
			if (GameApp.MainPlayer.curHero) {
				fight += GameApp.MainPlayer.curHero.ability.nFight;
			}
			this.clip_power.value = '' + LangConfig.getBigNumberDes(fight);
		}
		/**
		 * 更新头像
		 */
		public updateUI_avatarIcon(): void {
			// 头像
			this.img_avatarIcon.skin = '' + LangConfig.getPlayerIconSkin();
		}
		/**
		 * 更新PK模式
		 */
		public updateUI_pkModel(): void {
			let _player = GameApp.MainPlayer;
			// pk模式
			this.btn_BattleMode.skin = 'image/main/img_type' + _player.pkModel + '.png';
		}
		/**
		 * 更新VIP等级
		 */
		public updateUI_vipLv(): void {
			let _player = GameApp.MainPlayer;
			this.font_vipLevel.value = '' + _player.viplvl;
		}
		public addEvent(): void {
			// 变大变小
			// NPC竖条 展开缩放的动画
			EventManage.onWithEffect(this.btn_changSize, Laya.UIEvent.CLICK, this, () => {
				this.btn_changSize.selected = !this.btn_changSize.selected;
				if (this.btn_changSize.selected) {
					this.btn_changSize.skin = 'image/main/btn_common_02_fan.png'
					this.showGroupNpcList(true);
				}
				else {
					this.btn_changSize.skin = 'image/main/btn_common_02.png'
					this.showGroupNpcList(false);
				}
			})
			// 模式切换
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
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
			// 宅院
			EventManage.onWithEffect(this.btn_zhaiYuan, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openZhaiYuanPanel();
			});

			// 聊天大窗
			this.vstack_task.on(Laya.UIEvent.CLICK, this, () => {
				this.ui_chatBigDialog.visible = true;
			});

			// 菜单界面
			EventManage.onWithEffect(this.btn_menu, Laya.UIEvent.CLICK, this, () => {
				this.btn_menu.selected = !this.btn_menu.selected;
				PanelManage.openMenuPanel()
				// GameApp.LListener.event(ProtoCmd.changeActivityState, this.btn_menu.selected);
				// if (this.btn_menu.selected) {
				// 	this.btn_menu.skin = 'image/main/btn_caidan_01down_close.png';
				// 	PanelManage.openMenuPanel()
				// }
				// else {
				// 	this.btn_menu.skin = 'image/main/btn_caidan_01down_finish.png';
				// 	PopUpManager.showPanel(PanelManage.Menu);
				// 	PopUpManager.checkPanel(PanelManage.Menu);
				// }
			});
			// GameApp.LListener.on(ProtoCmd.changeActivityState, this, function (state) {
			// 	this.btn_menu.selected = state;
			// if (this.btn_menu.selected) {
			// this.btn_menu.skin = 'image/main/btn_caidan_01down_close.png';

			// }
			// else {
			// this.btn_menu.skin = 'image/main/btn_caidan_01down_finish.png';
			// PopUpManager.showPanel(PanelManage.Menu);
			// PopUpManager.checkPanel(PanelManage.Menu);
			// }
			// })

			// 时辰&&节气界面
			this.btn_time.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.TimeDialog().setData(this.lbl_jieQi.text, this.lbl_shiChen.text).popup(true);
			});
			// 个人信息界面
			this.img_head.on(Laya.UIEvent.CLICK, this, () => {
				new view.main.Main_playerInfoDialog().setData().popup(true);
			});

			// 新手任务
			this.box_goTask.on(Laya.UIEvent.CLICK, this, () => {
				for (let _ele of this.div_taskDes._childs) {
					if (_ele.href) {
						this.div_taskDes.event(Laya.Event.LINK, _ele.href);
						break;
					}

				}

			});
			//vip界面
			this.img_vip.on(Laya.UIEvent.CLICK, this, function () {
				let o = new view.recharge_vip.Recharge_VipDialog();
				o.setData(1);
				o.popup(true);
			})

			this.addLcpEvent();
		}

		public addLcpEvent(): void {
			let _player = GameApp.MainPlayer;
			// 金币
			GameApp.LListener.on(LcpEvent.UPDATE_UI_GOLD, this, () => { this.updateUI_gold() });
			// 元宝
			GameApp.LListener.on(LcpEvent.UPDATE_UI_YUANBAO, this, () => { this.updateUI_yuanBao() });
			// 绑定元宝
			GameApp.LListener.on(LcpEvent.UPDATE_UI_YUANBAOLOCK, this, () => { this.updateUI_yuanBaolock() });
			// 战力
			GameApp.LListener.on(LcpEvent.UPDATE_UI_PLAYER_POWER, this, () => { this.updateUI_power() });
			GameApp.LListener.on(LcpEvent.UPDATE_UI_HERO_POWER, this, () => { this.updateUI_power() });
			// 等级
			GameApp.LListener.on(LcpEvent.UPDATE_UI_PLAYER_LEVEL, this, () => { this.updateUI_lv() });
			// vip等级 todo
			GameApp.LListener.on(LcpEvent.UPDATE_UI_GOLD, this, () => { this.updateUI_vipLv() });
			// 经验
			GameApp.LListener.on(LcpEvent.UPDATE_UI_PLAYER_EXP, this, () => { this.updateUI_exp() });
			// 地图移动
			GameApp.LListener.on(ProtoCmd.MAP_MOVE, this, (jsonData: ProtoCmd.itf_MAP_MOVE) => {
				if (jsonData.errorcode == 0) {
					// 清空视野
					GameApp.MainPlayer.clearViewObj();
					// 更新房间数据
					GameApp.MainPlayer.roomId = jsonData.curmapid;
					// 上下左右房间的信息
					GameApp.GameEngine.smallMapData = jsonData.dstmap;
					console.log('进入了' + jsonData.curmapid);
					// 更新主场景
					let mapType = SheetConfig.mapRoomSheet.getInstance(null).ROOMTYPE('' + jsonData.curmapid);
					GameApp.SceneManager.updateUiScene(mapType);
					// 更新场景信息
					this.updateSceneView('进入了' + jsonData.curmapid);
				}
			});
		}

		//界面切换时控制那些部分不变
		public showGroupTop(panel: Laya.View): void {
			this.box_mainTop.visible = true;
			if (panel == this) {
				this.box_main.addChildAt(this.box_mainTop, 2);
			}
			else {
				panel.addChild(this.box_mainTop);
			}

		}

		// 界面切换时控制那些部分不变
		public showGroupBottom(panel: Laya.View): void {
			this.box_mainBottom.visible = true;
			if (panel == this) {
				this.box_main.addChildAt(this.box_mainBottom, 5);
			}
			else {
				panel.addChild(this.box_mainBottom);
			}
		}

		// 界面展示NPC列表
		public showGroupNpcList(show: boolean): void {
			if (show) {
				Laya.Tween.to(this.img_npc, { width: 0 }, 300, null);
				Laya.Tween.to(this.box_uiScene0, { left: 0 }, 300);
			}
			else {
				Laya.Tween.to(this.img_npc, { width: 95 }, 300);
				Laya.Tween.to(this.box_uiScene0, { left: 95 }, 300);
			}
			(this.box_uiScene0.getChildAt(0) as view.scene.SceneV3Item).changeSelfSize(show)
		}




		/**
		 * 获取时辰
		 */
		public getShiChen(): string {
			let hour = new Date().getHours();
			let minite = new Date().getMinutes();
			let index;
			let time;
			let timeArray = ['丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时', '子时']
			if (minite > 0) {
				for (let i = 1; i < 13; i++) {
					if (hour <= 12) {
						if (hour == i || hour == (i + 1)) {
							if (i % 2 == 1) {
								let num1 = Math.ceil((i-1) / 2);
								time = timeArray[num1];
							} else {
								let num2 = Math.floor((i-1) / 2);
								time = timeArray[(num2)];
							}
						}
					}
					else {
						if (hour == i * 2 || hour == (i * 2 + 1)) {
							if (i % 2 == 1) {
								time = timeArray[i];
							} else {
								time = timeArray[(i - 1)];
							}
						}
					}
				}
			} else {
				time = timeArray[Math.ceil(hour / 2)];
			}
			return time;
		}
		/**
		 * 获取节气
		 */
		public getJieQi(): string {
			let date = Date.now() / 1000;
			let beginTime = GameApp.GameEngine.openDay;
			let day = (date - beginTime) / 24 / 3600;
			let index = Math.ceil(day % 24);
			let season = ['', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑'
				, '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至', '小寒', '大寒'][index]
			return season;
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
				default:
					_chatMsg += '[系统]:' + data.chatMsg;
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
			Laya.timer.frameOnce(2, this, () => { panel_small.scrollTo(0, panel_small.contentHeight); })
			// 更新到大窗
			this.ui_chatBigDialog.addLabel(btChatType, _chatMsg);
		}

		/**
		 * 更新场景旁白
		 */
		public updateSceneView(_chatMsg: string): void {
			// 更新到小窗
			let small_txt: Laya.Label;
			if (this.vbox_sceneMsg.numChildren > GameApp.GameEngine.chatDataSmallMax) {
				small_txt = this.vbox_sceneMsg.getChildAt(0) as Laya.Label;
			}
			else {
				small_txt = new Laya.Label();
			}
			small_txt.text = _chatMsg;
			small_txt.fontSize = 16;//字号
			small_txt.bold = true;
			small_txt.width = 340;
			small_txt.wordWrap = true;
			this.vbox_sceneMsg.addChild(small_txt);
			Laya.timer.frameOnce(2, this, () => { this.panel_sceneMsg.scrollTo(null, this.panel_sceneMsg.contentHeight); })
		}
		/**
		 * 更新NPC的任务状态
		 * @param npcID 
		 * @param state 
		 */
		public updateNpcState(npcID, state: EnumData.NPCSTATUS): void {
			for (let npcUI of this.vbox_npc._childs) {
				let npcObject: GameObject.Npc = npcUI.item;
				if (npcObject.feature.dwCretTypeId == npcID) {
					npcObject.taskState = state;
					break;
				}
			}
		}

		/**
		 * 客户端创建完成角色后初始化数据
		 * 只调用一次
		 */
		public initData(): void {
			// 更新数据
			this.loadJuQingData();
			// 拉取性格天赋数据
			this.loadXingGeTalentData();
			//拉取生辰八字四格九宫
			this.getPlayerBirthData();
			//获取强化信息
			this.getIntensifyMessage();
			//魂石升阶信息
			this.getSoulStoneMessage();
			// 声望信息
			this.getShengWangInfo();
			//活动状态
			this.getHuoDongStatus()
		}
		/**
		 * 菜单界面活动状态
		 */
		public getHuoDongStatus() {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.HuoDongStatus, null, null, this, (data: ProtoCmd.itf_MENU_ActiveStatus) => {
				GameApp.GameEngine.activityStatus = data
			})
			lcp.send(pkt)
		}

		/**
		 * 获取江湖声望信息
		 */
		public getShengWangInfo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_PrestigePanel, null, null, this, (jsonData: ProtoCmd.itf_JS_ShengWangInfo) => {
				// 更新声望等级描述
				LangConfig.Fametitletab = jsonData.titletab;
			})
			lcp.send(pkt);
		}

		private getSoulStoneMessage() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.soulStoneLevel, null, 0, this,
				(data: ProtoCmd.itf_JS_soulStoneLevel) => {
					GameApp.GameEngine.mainPlayer.playersoulStoneLevel = data;
				});
			lcp.send(pkt);
		}

		private getIntensifyMessage() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.sendEquipIntensify, null, 0, this,
				(data: ProtoCmd.itf_JS_equipIntensifyMessage) => {
					GameApp.GameEngine.mainPlayer.playerEquipIntensify = data;
					this.getEquipPanelMsg()

				});
			lcp.send(pkt);
		}
		private getEquipPanelMsg() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.IntensifyPanel, [0, 0], 0, this,
				(data: ProtoCmd.itf_JS_equipPanelMsg) => {
					GameApp.GameEngine.equipPanelMsg = data;
				});
			lcp.send(pkt);

		}

		/**
		 * 拉取玩家出生信息
		 */
		private getPlayerBirthData() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.birthdateAndCompellation, null, 0, this,
				(data: ProtoCmd.itf_JS_birthdateAndCompellation) => {
					GameApp.GameEngine.mainPlayer.playerBirthData = data
					GameApp.GameEngine.openDay = data.openday
					// 节气
					this.lbl_jieQi.text = '' + this.getJieQi();
					this.updateUI_pkModel();
				});
			lcp.send(pkt);
		}



		/**
		 * 拉取剧情数据
		 */
		public loadJuQingData(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JQ_GET_JQ_SELF_INFO);
			lcp.send(pkt);
		}

		/**
		 * 拉取性格天赋数据
		 */
		public loadXingGeTalentData(): void {
			let pkt1 = new ProtoCmd.QuestClientData();
			pkt1.setString(ProtoCmd.JS_sendTianFuZiZhi, null, null, this, (jsonData: ProtoCmd.itf_JS_talentXingGeInfo) => {
				console.log(jsonData);
				// 资质
				GameApp.MainPlayer.talentInfo = jsonData.zztab;
				// 性格、标签
				GameApp.MainPlayer.xingGeInfo = jsonData.tftab;
			});
			lcp.send(pkt1);
		}

		/**
		 * 更新主界面任务信息
		 * @param data 
		 */
		public updateTaskInfo(): void {
			let taskInfo: ProtoCmd.stQuestInfoBase;
			// 优先显示事件任务
			let eventInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.JUQINGEVENT];
			if (eventInfo && Object.keys(eventInfo).length > 0) {
				taskInfo = eventInfo[Object.keys(eventInfo)[0]];
			}
			else {
				// 主线任务
				let zhuXianInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.SYSTEM];
				taskInfo = zhuXianInfo[Object.keys(zhuXianInfo)[0]];
			}
			this.div_taskDes.style.fontSize = 20;
			this.div_taskDes.innerHTML = taskInfo.target;
			this.div_taskDes.on(Laya.Event.LINK, this, (data) => {
				GameUtil.parseTaskInfo(data);
			})
		}

		/**
		 * 添加NPC交互的进度条
		 */
		public addNpcPregressItem(obj: GameObject.Creature, closerHander: Laya.Handler = null): void {
			let configID = obj.feature.dwCretTypeId;
			let progerUI = new view.npc.NpcProgressItem()
			switch (configID) {
				// 孽冤镜
				case 200003:
					progerUI.setData('镜面上泛起涟漪...', 3000);
					break;
				// 孟婆汤
				case 200004:
					progerUI.setData('吨吨吨吨吨吨...', 3000);
					break;
				// 轮回道
				case 200005:
					progerUI.setData('轮回之门正在开启...', 3000);
					break;
				default:
					progerUI.setData('东看看,西看看...', 3000);
					break;

			}
			progerUI.closeHandler = closerHander;
			// 添加读条界面
			this.box_uiScene0.addChild(progerUI);
		}
	}
}