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
			this.addEvent();
			this.visible = false;
		}

		public updateUI(): void {
			// 界面赋值
			let _player = GameApp.MainPlayer;
			// 名字
			this.lbl_playerName.text = _player.objName;
			// 等级
			if (_player.zslevel == null || _player.zslevel == 0) {
				this.lbl_level.text = '' + _player.level + '级';
			}
			else {
				this.lbl_level.text = '' + _player.zslevel + '转' + _player.level + '级';
			}
			// 金币
			this.lbl_gold.text = '' + _player.wealth.gold;
			// 元宝
			this.lbl_yuanBao.text = '' + _player.wealth.yuanBao;
			// 绑定元宝
			this.lbl_yuanBaolock.text = '' + _player.wealth.yuanBao_lock;
			// 战斗力
			this.clip_power.value = '' + _player.ability.nFight;
			// 头像
			this.img_avatarIcon.skin = '' + _player.iconAvatarPic;
			// 节气
			this.lbl_jieQi.text = '' + this.getJieQi();
			// 时辰
			this.lbl_shiChen.text = '' + this.getShiChen();
		}
		public addEvent(): void {
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
				if (this.btn_menu.selected) {
					PanelManage.openMenuPanel()
				}
				else {
					PopUpManager.Dispose(PanelManage.Menu);
				}
			});

			// 时辰界面
			this.lbl_shiChen.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.TimeDialog().setData(null).popup(true);
			});
			// 节气界面
			this.lbl_jieQi.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.SeasonDialog().setData(null).popup(true);
			});
			// 换头像界面
			this.box_head.on(Laya.UIEvent.CLICK, this, () => {
				new view.main.Main_playerInfoDialog().popup(true);
			});
			// 路引弹窗
			this.btn_flyPoint.on(Laya.UIEvent.CLICK, this, () => {
				new view.main.Main_LuYinDialog().popup(true);
			});
			// 地图展开界面
			EventManage.onWithEffect(this.btn_mapBig, Laya.UIEvent.CLICK, this, () => {
				this.btn_mapBig.selected = !this.btn_mapBig.selected;
				if (this.btn_mapBig.selected) {
					this.ui_mainDownMapItem.showSelf(true);
				}
				else {
					this.ui_mainDownMapItem.showSelf(false);
				}
			});
			// ****************小地图***************
			// 向下移动
			EventManage.onWithEffect(this.btn_mapDown, Laya.UIEvent.CLICK, this, () => {
				this.joinRoom(GameApp.GameEngine.smallMapData.down);
			});
			// 向上移动
			EventManage.onWithEffect(this.btn_mapUp, Laya.UIEvent.CLICK, this, () => {
				this.joinRoom(GameApp.GameEngine.smallMapData.up);
			});
			// 向左移动
			EventManage.onWithEffect(this.btn_mapLeft, Laya.UIEvent.CLICK, this, () => {
				this.joinRoom(GameApp.GameEngine.smallMapData.left);
			});
			// 向右移动
			EventManage.onWithEffect(this.btn_mapRight, Laya.UIEvent.CLICK, this, () => {
				this.joinRoom(GameApp.GameEngine.smallMapData.right);
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
			this.addLcpEvent();
		}

		public addLcpEvent(): void {
			let _player = GameApp.MainPlayer;
			// 金币
			GameApp.LListener.on(LcpEvent.UPDATE_UI_GOLD, this, () => { this.lbl_gold.text = '' + _player.wealth.gold; });
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
			// 
			GameApp.LListener.on(ProtoCmd.MAP_MOVE, this, (jsonData: ProtoCmd.itf_MAP_MOVE) => {
				if (jsonData.errorcode == 0) {
					// 清空视野
					GameApp.MainPlayer.clearViewObj();
					// 更新房间数据
					GameApp.MainPlayer.roomId = jsonData.curmapid;
					// 上下左右房间的信息
					GameApp.GameEngine.smallMapData = jsonData.dstmap;
					console.log(jsonData.dstmap);
					console.log('进入了' + jsonData.curmapid);
					// 更新主场景
					let mapType = SheetConfig.mapRoomSheet.getInstance(null).ROOMTYPE('' + jsonData.curmapid);
					this.updateUiScene(mapType);
					// 更新场景信息
					this.updateSceneView('进入了' + jsonData.curmapid);
					// 更新小地图
					this.updateSmallMap();
				}
			});
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

		// 界面展示NPC列表
		public showGroupNpcList(show: boolean): void {
			if (show) {
				Laya.Tween.to(this.img_npc, { scaleX: 0 }, 500, Laya.Ease.bounceOut, Laya.Handler.create(this, () => {
					this.img_npc.visible = false;
				}));
				Laya.Tween.to(this.box_uiScene0, { left: 0 }, 500, Laya.Ease.bounceOut);
			}
			else {
				this.img_npc.visible = true;
				Laya.Tween.to(this.img_npc, { scaleX: 1 }, 500, Laya.Ease.bounceOut);
				Laya.Tween.to(this.box_uiScene0, { left: 95 }, 500, Laya.Ease.bounceOut);
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
			Laya.timer.frameOnce(2, this, () => { panel_small.scrollTo(0, panel_small.contentHeight); })
			// 更新到大窗
			this.ui_chatBigDialog.addLabel(btChatType, _chatMsg);
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
		 * 获取当前场景
		 */
		public get ui_scene(): itf.SceneItem {
			if (this.box_uiScene1.numChildren > 0) {
				return (this.box_uiScene1.getChildAt(0) as any);
			}
			else {
				return this.box_uiScene0.getChildAt(0) as any;
			}
		}


		/**
		 * 更新视野内对象UI
		 * @param handleType 
		 * @param obj 
		 */
		public addViewObjUI(obj, type: EnumData.CRET_TYPE): void {
			console.log(obj.objName + '进入视野')
			switch (type) {
				// 玩家
				case EnumData.CRET_TYPE.CRET_PLAYER:
					this.ui_scene.addPlayer(obj);
					break;
				// 英雄
				case EnumData.CRET_TYPE.CRET_HERO:
					this.ui_scene.addHero(obj);
					break;
				// 怪物
				case EnumData.CRET_TYPE.CRET_MONSTER:
					this.ui_scene.addMonster(obj);
					break;
				// NPC
				case EnumData.CRET_TYPE.CRET_NPC:
					let npcIcon: view.compart.NpcIconItem = new view.compart.NpcIconItem();
					npcIcon.setData(obj);
					this.vbox_npc.addChild(npcIcon);
					break;
				default:
					break;
			}
		}

		/**
		 * 清空视野
		 */
		public clearViewUI(): void {
			this.vbox_npc.removeChildren();
			this.ui_scene && this.ui_scene.clearPlayer();
			this.ui_scene && this.ui_scene.clearMonster();
		}


		/**
		 * 玩家切换地图后刷新界面
		 */
		public loadScene(): void {
			// ui_scene 布局
			let bigMapType = SheetConfig.mydb_mapinfo_tbl.getInstance(null).MAPTYPE('' + GameApp.MainPlayer.location.mapid);
			// 大于0是副本地图.根据大地图类型布局。1 个人副本 2 公共副本
			if (bigMapType > 0) {
				this.updateUiScene(bigMapType);
			}
			else {
				this.loadSmallMap();
			}
			// 切完大地图发送,地图ID改变
			let ready = new ProtoCmd.StateReady();
			lcp.send(ready, this, () => {
				// 首次ready拉取一次数据
				if (!GameApp.GameEngine.isReady) {
					this.initData();
				}
				console.log('客户端准备完成');
				GameApp.GameEngine.isReady = true;
			});
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
			//拉取路引数据
			this.getLuYinData();
			//获取强化信息
			this.getIntensifyMessage();
			//魂石升阶信息
			this.getSoulStoneMessage();


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
		private getLuYinData() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.openChuangSongRecord, [GameApp.GameEngine.luyinTabID], 0, this,
				(data: ProtoCmd.itf_Main_openChuangSongRecord) => {
					GameApp.GameEngine["luyinData" + [GameApp.GameEngine.luyinTabID]] = data
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
				});
			lcp.send(pkt);
		}


		/**
		 * 更新主场景ui_scene
		 */
		public updateUiScene(mapType: EnumData.emRoomType): void {
			console.log('===updateUiScene===>', mapType);
			let uiscene;
			switch (mapType) {
				// 个人副本
				case EnumData.emRoomType.singleFuBen:
					this.box_uiScene1.removeChildren();
					uiscene = new view.scene.SceneV1Item();
					uiscene.setData();
					this.box_uiScene1.visible = true;
					this.box_uiScene1.addChild(uiscene);
					break;
				// 多人副本
				case EnumData.emRoomType.publicFuBen:
					this.box_uiScene1.removeChildren();
					uiscene = new view.scene.SceneV2Item();
					uiscene.setData();
					this.box_uiScene1.visible = true;
					this.box_uiScene1.addChild(uiscene);
					break;
				// 野外地图
				case EnumData.emRoomType.publicYeWai:
					this.box_uiScene1.removeChildren();
					this.box_uiScene1.visible = false;
					if (this.box_uiScene0.numChildren == 0 || this.box_uiScene0.getChildAt(0).name != 'SceneV3Item') {
						this.box_uiScene0.removeChildren();
						uiscene = new view.scene.SceneV3Item();
						uiscene.setData();
						this.box_uiScene0.addChild(uiscene);
						if (this.box_uiScene0.left == 0) {
							uiscene.changeToBig();
						}
					}
					break;
				// 主城
				case EnumData.emRoomType.publicZhuCheng:
					this.box_uiScene1.removeChildren();
					this.box_uiScene1.visible = false;
					if (this.box_uiScene0.numChildren == 0 || this.box_uiScene0.getChildAt(0).name != 'SceneV4Item') {
						this.box_uiScene0.removeChildren();
						uiscene = new view.scene.SceneV4Item();
						uiscene.setData();
						this.box_uiScene0.addChild(uiscene);
						if (this.box_uiScene0.left == 0) {
							uiscene.changeToBig();
						}
					}
					break;
			}
			console.log('刷新了ui_scene')
			// 刷新界面
			this.ui_scene.updateUI();
		}


		/**
		 * 加载小地图
		 * @param id 
		 */
		public loadSmallMap(): void {
			console.log('加载小地图中');
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.MAP_Get_ALLROOM_INFO, null, null, this, (jsonData: ProtoCmd.itf_MAP_ROOM_INFO) => {
				// 当前小房间信息
				GameApp.MainPlayer.roomId = jsonData.curminmapid;
				// 上下左右房间的信息
				GameApp.GameEngine.smallMapData = jsonData.dstmap;

				// 更新主场景
				let mapType = SheetConfig.mapRoomSheet.getInstance(null).ROOMTYPE('' + jsonData.curminmapid);
				this.updateUiScene(mapType);
				// 更新小地图
				this.updateSmallMap();
			});
			lcp.send(pkt);
			let ui_map;
			switch (GameApp.MainPlayer.location.mapid) {
				// 酆都
				case EnumData.MAP_BIG_MAP_ID.MAP_FENG_DU:
					ui_map = new view.map.SmallMap_fengduItem();
					ui_map.setData();
					break;
				// 福州城
				case EnumData.MAP_BIG_MAP_ID.MAP_FU_ZHOU_CHENG:
					ui_map = new view.map.SmallMap_fuzhouItem();
					ui_map.setData();
					break;
				// 华山派
				case EnumData.MAP_BIG_MAP_ID.MAP_HUA_SHAN_PAI:
					ui_map = new view.map.SmallMap_fuzhouItem();
					ui_map.setData();
					break;
			}
			this.ui_mainDownMapItem.panel_0.removeChildren();
			ui_map && this.ui_mainDownMapItem.panel_0.addChild(ui_map);
		}

		/**
		 * 更新小地图
		 */
		public updateSmallMap(): void {
			let mapInfo = GameApp.GameEngine.smallMapData;
			let roomId = GameApp.MainPlayer.roomId;
			// 中间自己
			this.btn_mapCenter.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + roomId);
			this.btn_mapCenter.labelSize = (this.btn_mapCenter.label.length > 3) ? 20 : 25;
			this.btn_mapCenter.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + roomId) + '.png';
			// 左侧
			this.img_lineLeft.visible = Boolean(mapInfo.left);
			if (mapInfo.left) {
				this.btn_mapLeft.visible = true;
				this.btn_mapLeft.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + mapInfo.left);
				this.btn_mapLeft.labelSize = (this.btn_mapLeft.label.length > 3) ? 20 : 25;
				this.btn_mapLeft.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + mapInfo.left) + '.png';
			}
			else {
				this.btn_mapLeft.visible = false;
			}
			// 下面
			this.img_lineDown.visible = Boolean(mapInfo.down);
			if (mapInfo.down) {
				this.btn_mapDown.visible = true;
				this.btn_mapDown.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + mapInfo.down);
				this.btn_mapDown.labelSize = (this.btn_mapDown.label.length > 3) ? 20 : 25;
				this.btn_mapDown.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + mapInfo.down) + '.png';
			}
			else {
				this.btn_mapDown.visible = false;
			}
			// 上面
			this.img_lineUp.visible = Boolean(mapInfo.up);
			if (mapInfo.up) {
				this.btn_mapUp.visible = true;
				this.btn_mapUp.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + mapInfo.up);
				this.btn_mapUp.labelSize = (this.btn_mapUp.label.length > 3) ? 20 : 25;
				this.btn_mapUp.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + mapInfo.up) + '.png';
			}
			else {
				this.btn_mapUp.visible = false;
			}
			// 右边
			this.img_lineRight.visible = Boolean(mapInfo.right);
			if (mapInfo.right) {
				this.btn_mapRight.visible = true;
				this.btn_mapRight.label = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + mapInfo.right);
				this.btn_mapRight.labelSize = (this.btn_mapRight.label.length > 3) ? 20 : 25;
				this.btn_mapRight.skin = 'image/map/smallMap/smallmap_icon_' + SheetConfig.mapRoomSheet.getInstance(null).ICONPIC('' + mapInfo.right) + '.png';
			}
			else {
				this.btn_mapRight.visible = false;
			}
			// 更新地图
			this.ui_mainDownMapItem.updateUI();
		}

		/**
		 * 进入房间
		 * @param roomid 
		 */
		public joinRoom(roomid): void {
			if (!roomid) { return };
			if (GameApp.MainPlayer.roomId == roomid) {
				TipsManage.showTips('当前就在此地图');
				return
			}
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.MAP_MOVE, [roomid])
			lcp.send(pkt);
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