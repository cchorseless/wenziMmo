/**Created by the LayaAirIDE*/
module view.main {
	export class MainPanel extends ui.main.MainPanelUI {
		public isTouchTab = false;
		public touchActNum = 0;
		public touchTaskNum = 1;

		constructor() {
			super();
			// this.panel_task.vScrollBarSkin = '';
		}
		public setData(): void {
			this.ui_chatBigDialog.visible = false;
			this.initUI();
			this.addEvent();
			this.visible = false;
		}

		/**
		 * 适配处理
		 */
		public initUI(): void {
			let getScaleY = PanelManage.getScaleY();

		}

		/**
		 * 切换界面模式
		 * @param index 
		 */
		public changeMode(index): void {
			this.view_scene.selectedIndex = index;
			switch (index) {
				// 主界面
				case 0:
					this.box_mainTop.visible = true;
					this.box_right.visible = true;
					this.box_top.visible = false;
					this.box_mainBottom.visible = true;
					this.box_menu.visible = true;

					break;
				// 探索界面
				case 1:
					this.box_mainTop.visible = false;
					this.box_right.visible = true;
					this.box_top.visible = true;
					this.box_mainBottom.visible = true;
					this.box_menu.visible = true;
					break;
				// 小说界面
				case 2:
					this.box_mainTop.visible = false;
					this.box_right.visible = false;
					this.box_top.visible = false;
					this.box_mainBottom.visible = false;
					this.box_menu.visible = false;
					break;

			}
		}



		/**
		 * 切换界面时刷新数据
		 */
		public updateUI(): void {
			// 界面赋值
			this.upDataFlyChatSetting();
			this.updateUI_name();
			this.updateUI_avatarIcon();
			this.updateUI_exp()
			this.updateUI_lv()
			this.updateUI_gold()
			this.updateUI_yuanBao()
			this.updateUI_yuanBaolock()
			this.updateUI_power()
			this.updateUI_vipLv();
			this.init_friendApply();
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
			let expBiLi;
			if (_player.level >= 150) {
				expBiLi = 100
			} else {
				expBiLi = Math.ceil(_player.ability.nowexp / _player.ability.maxexp * 100);
			}
			this.img_exp.width = this.img_expBg.width * expBiLi / 100;
			this.lbl_level.text = _player.level + "";
			this.lab_exp.text = expBiLi + '%';
			this.lab_zhuansheng.text = _player.zslevel + "转";

		}
		/**
		 * 更新等级
		 */
		public updateUI_lv(): void {
			let _player = GameApp.MainPlayer;
			// 等级
			let expBiLi = Math.ceil(_player.ability.nowexp / _player.ability.maxexp * 100);
			this.lbl_level.text = _player.level + "";
		}
		/**
		 * 更新金币
		 */
		public updateUI_gold(): void {
			let _player = GameApp.MainPlayer;
			// 金币
			this.lbl_gold.text = '' + LangConfig.getBigNumberDes(_player.wealth.gold);
			this.lab_coin.text = '' + LangConfig.getBigNumberDes(_player.wealth.gold);
		}
		/**
		 * 更新元宝
		 */
		public updateUI_yuanBao(): void {
			let _player = GameApp.MainPlayer;
			// 元宝
			this.lbl_yuanBao.text = '' + LangConfig.getBigNumberDes(_player.wealth.yuanBao);
			this.lab_yuanbao.text = '' + LangConfig.getBigNumberDes(_player.wealth.yuanBao);
		}
		/**
		 * 更新绑定元宝
		 */
		public updateUI_yuanBaolock(): void {
			let _player = GameApp.MainPlayer;
			// 绑定元宝
			this.lbl_yuanBaolock.text = '' + LangConfig.getBigNumberDes(_player.wealth.yuanBao_lock);
			this.lab_ticket.text = '' + LangConfig.getBigNumberDes(_player.wealth.yuanBao_lock);
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
		public upDataFlyChatSetting() {
			let data = laya.net.LocalStorage.getJSON("chat_Set")
			if (data == null || data == undefined) {
				let j = {
					3: { status: true },
					5: { status: true },
					2: { status: true },
					8: { status: true },
					4: { status: true },
				}
				laya.net.LocalStorage.setJSON("chat_Set", j)
				GameApp.MainPlayer.chatStatus = j;
			} else {
				GameApp.MainPlayer.chatStatus = data;
			}
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
			// this.btn_BattleMode.skin = 'image/main/img_type' + _player.pkModel + '.png';
		}
		/**
		 * 更新VIP等级
		 */
		public updateUI_vipLv(): void {
			let _player = GameApp.MainPlayer;
			this.font_vipLevel.value = '' + _player.viplvl;
		}
		public addEvent(): void {


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
			// 主线副本界面
			EventManage.onWithEffect(this.btn_fuBen, Laya.UIEvent.CLICK, this, function () {
				PanelManage.openFuBenMainPanel('main')
			})
			// this.img_tabCM.on(Laya.UIEvent.CLICK, this, function () {
			// 	this.isTouchTab = !this.isTouchTab;
			// 	if (this.isTouchTab) {
			// 		Laya.Tween.to(this.vbox_tab, { x: 0 }, 250)
			// 	} else {
			// 		Laya.Tween.to(this.vbox_tab, { x: 1 * this.vbox_tab.width }, 250)
			// 	}
			// })
			// EventManage.onWithEffect(this.btn_Act, Laya.UIEvent.CLICK, this, function () {
			// 	this.touchActNum++;
			// 	this.touchTaskNum = 0;
			// 	this.btn_taskAll.selected = false;
			// 	this.btn_Act.selected = true;
			// 	if (this.touchActNum == 1) {
			// 		this.updateActiveInfo()
			// 	} else if (this.touchActNum >= 2) {
			// 		new view.main.Main_BriskDialog().popup();
			// 	}
			// })

			// EventManage.onWithEffect(this.btn_taskAll, Laya.UIEvent.CLICK, this, function () {
			// 	this.touchTaskNum++;
			// 	this.touchActNum = 0;
			// 	this.btn_taskAll.selected = true;
			// 	this.btn_Act.selected = false;
			// 	if (this.touchTaskNum == 1) {
			// 		this.updateTaskInfo()
			// 	} else if (this.touchTaskNum >= 2) {
			// 		new view.dialog.TaskDialog().popup();
			// 	}
			// })
			this.btn_friend.on(Laya.UIEvent.CLICK, this, function () {
				new view.friend.FriendListDialog().popup();
			})
			this.btn_email.on(Laya.UIEvent.CLICK, this, function () {
				new view.dialog.MailDialog().popup(true);
			})
			this.btn_chat.on(Laya.UIEvent.CLICK, this, function () {
				this.ui_chatBigDialog.visible = true;
			})
			// new view.main.Main_LuYinDialog().setData().popup(true);
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




			// 聊天大窗
			// this.vstack_task.on(Laya.UIEvent.CLICK, this, () => {
			// 	this.ui_chatBigDialog.visible = true;
			// });

			// 菜单界面
			EventManage.onWithEffect(this.btn_menu, Laya.UIEvent.CLICK, this, () => {
				// this.btn_menu.selected = !this.btn_menu.selected;
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
			// this.box_goTask.on(Laya.UIEvent.CLICK, this, () => {
			// 	for (let _ele of this.div_taskDes._childs) {
			// 		if (_ele.href) {
			// 			this.div_taskDes.event(Laya.Event.LINK, _ele.href);
			// 			break;
			// 		}
			// 	}
			// });
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
			//副本
			// GameApp.LListener.on(ProtoCmd.map_CaiLiaoFubenPlane2, this, function (data) {
			// 	let pb = data;
			// 	pb
			// })
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
			//好友申请提示
			GameApp.LListener.on(ProtoCmd.FD_APPLY_UPDATA, this, () => { this.init_friendApply(); })
			GameApp.LListener.on(ProtoCmd.tubiaofasong, this, (data) => {
				console.log(data);
				GameApp.GameEngine.turnActivity = data;
			})
			//任务日常活跃
			GameApp.LListener.on(ProtoCmd.TASK_HuoYueDuClientOpen, this, (jsonData) => {
				GameApp.GameEngine.activeInfo = jsonData
			})
		}

		//界面切换时控制那些部分不变
		public showGroupTop(panel): void {
			panel.addChild(this.box_top);
			panel.addChild(this.box_menu);
			if (panel == this) {
				if (this.view_scene.selectedIndex < 2) {
					this.box_menu.visible = true;
				} else {
					this.box_menu.visible = false;
				}
				this.box_top.visible = false;
				this.box_mainTop.visible = true;
			}
			else {
				//菜单界面隐藏
				if (panel == PanelManage.Menu) {
					this.box_menu.visible = false;
				}
				// 复制一张底图
				// let imgBg = new Laya.Image();
				// imgBg.top = imgBg.bottom = imgBg.left = imgBg.right = 0;
				// imgBg.skin = GameApp.SceneManager.ui_scene.img_bg.skin;
				// panel.addChildAt(imgBg, 0);
				if (panel.box_view) {
					console.log(PanelManage.euiLayer.displayHeight);
					panel.box_view.bottom = (PanelManage.euiLayer.displayHeight - 1136) / 2;
				}
				this.box_top.visible = true;
				this.box_mainTop.visible = false;
			}
		}

		// 界面切换时控制那些部分不变
		public showGroupBottom(panel: Laya.View): void {
			this.box_mainBottom.visible = true;
			if (panel == this) {
				this.addChildAt(this.box_mainBottom, 5);
			}
			else {
				panel.addChild(this.box_mainBottom);
			}
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
								let num1 = Math.ceil((i - 1) / 2);
								time = timeArray[num1];
							} else {
								let num2 = Math.floor((i - 1) / 2);
								time = timeArray[(num2)];
							}
						}
					}
					else {
						if (hour == i * 2 || hour == (i * 2 + 1)) {
							if (hour % 2 == 1) {
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
			// let panel_small = this.panel_chatMsg; // 
			// let vbox_small = this.vbox_chatMsg;  //  
			switch (btChatType) {
				// 私聊
				case EnumData.ChatType.CHAT_TYPE_PRIVATE:
					_chatMsg = data.chatMsg;
					break;
				// 当前屏幕聊天
				case EnumData.ChatType.CHAT_TYPE_REFMSG:
					_chatMsg = data.chatMsg;
					break;

				// 系统消息
				case EnumData.ChatType.CHAT_TYPE_SYSTEM:
					_chatMsg = data.chatMsg;
					break;

				// 队伍聊天
				case EnumData.ChatType.CHAT_TYPE_GROUP:
					_chatMsg = data.chatMsg;
					break;

				// 帮会聊天
				case EnumData.ChatType.CHAT_TYPE_CLAN:
					_chatMsg = data.chatMsg;
					break;

				// 世界聊天
				case EnumData.ChatType.CHAT_TYPE_WORLD:
					_chatMsg = data.chatMsg;
					break;
				default:
					_chatMsg = data.chatMsg;
					break;
			}
			_chatArray.push(_chatMsg);
			// 更新到小窗
			// let small_txt: Laya.Label;
			// if (vbox_small.numChildren > GameApp.GameEngine.chatDataSmallMax) {
			// 	small_txt = vbox_small.getChildAt(0) as Laya.Label;
			// }
			// else {
			// 	small_txt = new Laya.Label();
			// }
			// small_txt.text = _chatMsg;
			// small_txt.fontSize = 16;//字号
			// small_txt.bold = true;
			// small_txt.width = 340;
			// small_txt.wordWrap = true;
			// vbox_small.addChild(small_txt);
			// Laya.timer.frameOnce(2, this, () => { panel_small.scrollTo(0, panel_small.contentHeight); })
			// 更新到大窗
			let senderName = data.getValue('szName');
			let sender_VIPLv = data.getValue('dwVip')
			let level = data.getValue('dw_playerLevel')
			let zslv = data.getValue('dw_zsLevel')
			let sex = data.getValue('bt_sex')
			let job = data.getValue('bt_job')
			let str = '';
			if (sex == 1) {
				str = 'icon_nan0' + job
			} else {
				str = 'icon_nv0' + job
			}
			// this.showFlyChatMsg(btChatType, _chatMsg, senderName)
			this.ui_chatBigDialog.addLabel(btChatType, _chatMsg, senderName, sender_VIPLv, level, zslv, str);
		}

		/**
		 * 更新场景旁白
		 */
		public updateSceneView(_chatMsg: string): void {
			// 更新到小窗
			// let small_txt: Laya.Label;
			// if (this.vbox_sceneMsg.numChildren > GameApp.GameEngine.chatDataSmallMax) {
			// 	small_txt = this.vbox_sceneMsg.getChildAt(0) as Laya.Label;
			// }
			// else {
			// 	small_txt = new Laya.Label();
			// }
			// small_txt.text = _chatMsg;
			// small_txt.fontSize = 16;//字号
			// small_txt.bold = true;
			// small_txt.width = 340;
			// small_txt.wordWrap = true;
			// this.vbox_sceneMsg.addChild(small_txt);
			// Laya.timer.frameOnce(2, this, () => { this.panel_sceneMsg.scrollTo(null, this.panel_sceneMsg.contentHeight); })
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
			this.getHuoDongStatus();

			this.getActiveInfoData();
			//月卡剩余时间
			this.getMoonCardData();

		}
		public getActiveInfoData() {
			let pkt = new ProtoCmd.QuestClientData;
			pkt.setString(ProtoCmd.TASK_HuoYueDuClientOpen)
			lcp.send(pkt);
		}
		/**
		 * 月卡剩余时间
		 */
		public getMoonCardData() {
			let pkt = new ProtoCmd.QuestClientData;
			pkt.setString(ProtoCmd.GetZGTQ, null, null, this, (jsonData: { leftime: number }) => {
				//jsonData.leftime月卡剩余时间
				GameApp.MainPlayer.monthCard = jsonData.leftime;
				if (PanelManage.BeiBao) {
					PanelManage.BeiBao.ui_huiShou.hasInit = false;
					PanelManage.BeiBao.ui_huiShou.setData();
				}
			})
			lcp.send(pkt);
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
				//我的声望信息
				GameApp.MainPlayer.fameInfo = jsonData;
				// 更新声望等级描述
				LangConfig.Fametitletab = jsonData.titletab;
			})
			lcp.send(pkt);
		}

		private getSoulStoneMessage() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.soulStoneLevel, null, 0, this,
				(data: ProtoCmd.itf_JS_soulStoneLevel) => {
					GameApp.GameEngine.mainPlayer.playersoulStoneLevel = data;
					//等级精炼强化达标信息

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
					//等级精炼强化大师
					this.equipView();
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
			pkt.setString(ProtoCmd.JQ_GET_JQ_SELF_INFO, null, null, this, () => {
				console.log('劇情信息獲取成功');
				// 初始化劇情信息
				Main_JuQingItem.self.setData();
			});
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
			// // this.vbox_task.removeChildren();
			// let taskInfo: ProtoCmd.stQuestInfoBase;
			// // 优先显示事件任务
			// let eventInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.JUQINGEVENT];
			// for (let i in eventInfo) {
			// 	let o = new main.Main_taskInfo();
			// 	o.setData(eventInfo[i], 0)
			// 	// this.vbox_task.addChild(o)
			// }
			// // 主线任务
			// let zhuXianInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.SYSTEM];
			// for (let i in zhuXianInfo) {
			// 	let o = new main.Main_taskInfo();
			// 	o.setData(zhuXianInfo[i], 0)
			// 	this.vbox_task.addChild(o)
			// }
			// let everyDayInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.EVERYDAY];
			// for (let i in everyDayInfo) {
			// 	let o = new main.Main_taskInfo();
			// 	o.setData(everyDayInfo[i], 0)
			// 	this.vbox_task.addChild(o)
			// }
			// let lifeExpInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.LIFEEXP];
			// for (let i in lifeExpInfo) {
			// 	let o = new main.Main_taskInfo();
			// 	o.setData(lifeExpInfo[i], 0)
			// 	this.vbox_task.addChild(o)
			// }
			// let clanInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.CLAN];
			// for (let i in clanInfo) {
			// 	let o = new main.Main_taskInfo();
			// 	o.setData(clanInfo[i], 0)
			// 	this.vbox_task.addChild(o)
			// }
			// let runRingInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.RUNRING];
			// for (let i in runRingInfo) {
			// 	let o = new main.Main_taskInfo();
			// 	o.setData(runRingInfo[i], 0)
			// 	this.vbox_task.addChild(o)
			// }
			// let wantedInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.WANTED];
			// for (let i in wantedInfo) {
			// 	let o = new main.Main_taskInfo();
			// 	o.setData(wantedInfo[i], 0)
			// 	this.vbox_task.addChild(o)
			// }
			// let jinYinInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.JINYIN];
			// for (let i in jinYinInfo) {
			// 	let o = new main.Main_taskInfo();
			// 	o.setData(jinYinInfo[i], 0)
			// 	this.vbox_task.addChild(o)
			// }
			// let achievementInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.ACHIEVEMENT];
			// for (let i in achievementInfo) {
			// 	let o = new main.Main_taskInfo();
			// 	o.setData(achievementInfo[i], 0)
			// 	this.vbox_task.addChild(o)
			// }
			// let onlineRewardInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.ONLINEREWARD];
			// for (let i in onlineRewardInfo) {
			// 	let o = new main.Main_taskInfo();
			// 	o.setData(onlineRewardInfo[i], 0)
			// 	this.vbox_task.addChild(o)
			// }
			// taskInfo = zhuXianInfo[Object.keys(zhuXianInfo)[0]];

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
			// this.box_uiScene0.addChild(progerUI);
		}
		public equipView() {
			//等级大师达标装备数量
			let baseLv = 60;
			let curNum0 = 0;
			let equpLvNumArr = [];
			let showLvNumArr = [];
			let type = GameApp.GameEngine.mainPlayer.playerORHero;
			let item;
			let lvNum;
			for (let i = 0; i < 8; i++) {
				let equipID;
				if (type == 0) {
					equipID = i
					if (equipID != 2 || equipID != 3) {
						item = GameUtil.findEquipInPlayer(equipID);
						lvNum
						if (item) {
							lvNum = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED(item.dwBaseID.toString());
						} else {
							lvNum = 0;
						}

						equpLvNumArr.push(lvNum);
						showLvNumArr.push(lvNum);
					}
				}
				else {
					equipID = i + 18 + type * 10
					if (equipID != 20 + type * 10 || equipID != 21 + type * 10) {
						item = GameUtil.findEquipInPlayer(equipID);
						lvNum
						if (item) {
							lvNum = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED(item.dwBaseID.toString());
						} else {
							lvNum = 0;
						}
						equpLvNumArr.push(lvNum);
						showLvNumArr.push(lvNum);
					}
				}
			}
			let temp = equpLvNumArr.sort(function (a, b) {
				return b - a;
			});
			let max = temp[0];
			let min = temp[temp.length - 1]
			if (min < 60) {
				baseLv = 60;
			} else {
				let k = Math.floor((min - 60) / 10)
				baseLv = 60 + 10 * (k + 1);
			}
			for (let i = 0; i < 8; i++) {
				if (showLvNumArr[i] >= baseLv) {
					curNum0++;
				}
			}
			GameApp.MainPlayer.EquipmentNum[0] = curNum0 + '/8';
			//精炼大师达标装备数量
			let allData = GameApp.GameEngine.mainPlayer.playersoulStoneLevel
			let baseLvData = {};    //魂石
			let typeSoul = GameApp.GameEngine.mainPlayer.playerORHero;
			if (typeSoul == 0) {
				baseLvData = allData.playerlvl;
			} else if (typeSoul > 0) {
				baseLvData = allData.herolvl;
			}
			let curSoulStoneLv = 0;
			for (let i in baseLvData) {
				for (let o in baseLvData[i]) {
					curSoulStoneLv += baseLvData[i][o];
				}
			}
			let k = Math.floor(curSoulStoneLv / 60);
			GameApp.MainPlayer.EquipmentNum[1] = curSoulStoneLv + "/" + (k + 1) * 60;
			//强化大师达标装备数量
			let lv = this.onLvIntensify();
			GameApp.MainPlayer.EquipmentNum[2] = lv[0] + '/10';
		}
		/**
		 * 强化大师达标装备数量
		 */
		private onLvIntensify() {
			let type = GameApp.GameEngine.mainPlayer.playerORHero;
			let aa;
			let curlv = 3
			let nextlv = 5
			//各强化等级的的装备个数
			if (type == 1) {
				aa = GameApp.GameEngine.mainPlayer.playerEquipIntensify.herojson;
			}
			else {
				aa = GameApp.GameEngine.mainPlayer.playerEquipIntensify.playerjson;
			}
			let arrLV = []
			for (let i in aa) {
				arrLV.push(aa[i])
			}
			arrLV.sort(function (a, b) {
				return (a - b);
			})
			let minLv = arrLV[0]
			let arr = [];
			for (let i in GameApp.GameEngine.mainPlayer.playerEquipIntensify.sooulchaintab) {
				arr.push(GameApp.GameEngine.mainPlayer.playerEquipIntensify.sooulchaintab[i].minlvl)
			}
			for (let i = 0; i < arr.length; i++) {
				if (i <= 0) {
					if (minLv < arr[0]) {
						curlv = arr[0];
						nextlv = arr[1];
						break;
					}
				}
				else if (i > 0 && i < arr.length - 1) {
					if (minLv < arr[i]) {
						curlv = arr[i - 1];
						nextlv = arr[i];
						break;
					}
				} else {
					curlv = arr[arr.length - 1];
					nextlv = arr[arr.length - 1];
				}
			}
			let curNum = 0;
			for (let i = 0; i < arrLV.length; i++) {
				if (curlv <= arrLV[i]) {
					curNum++;
				}
			}
			let nextNum = 0;
			for (let i = 0; i < arrLV.length; i++) {
				if (nextlv <= arrLV[i]) {
					nextNum++;
				}
			}
			return [curNum, nextNum];
		}
		/**
		 * 好友申请提示
		 */
		public init_friendApply(): void {
			if (GameApp.MainPlayer.friendApplyInfo.length > 0) {
				this.img_friendTips.visible = true;

			} else {
				this.img_friendTips.visible = false;
			}
		}
	}
}