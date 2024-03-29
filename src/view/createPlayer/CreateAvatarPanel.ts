/**Created by the LayaAirIDE*/
module view.createPlayer {
	export class CreateAvatarPanel extends ui.createPlayer.CreateAvatarPanelUI {
		constructor() {
			super();
		}
		public _playerName = '';
		public get playerName() {
			return this._playerName;
		};
		public set playerName(v: string) {
			this._playerName = v;
		}
		public job = 1;// 职业
		public sex = 1;// 性别
		public setData(): void {
			this.initSelf();
		}

		public initSelf(): void {
			// 适配处理
			// let getScaleY = PanelManage.getScaleY();
			// this.img_bottomBg.scaleY = getScaleY;
			// this.img_npcBg.scaleY = getScaleY;
			// this.box_uiScene0.scaleY = getScaleY;
			// 先隐藏
			this.alpha = 0;
			this.ui_npcTalk.visible = false;;
			// 加载动作
			let skePlayer = new SkeletonUtil.SkeletonGroup();
			skePlayer.loadRes(['sk/player/ZJ_GH.sk'], () => {
				skePlayer.pos(this.box_self.width / 2, this.box_self.height)
				this.box_self.addChild(skePlayer);
				skePlayer.scale(1, 1);
				skePlayer.play(0, true);
			});
			// 加载过长动画
			let cg = new SkeletonUtil.SkeletonGroup();
			cg.loadRes(['sk/new/MH.sk'], () => {
				cg.pos(this.img_cg.displayWidth / 2, this.img_cg.displayHeight / 2);
				this.img_cg.addChild(cg);
				let playIndex = 0;
				cg.play(playIndex, false, false, null, 0.5);
				this.img_cg.on(Laya.UIEvent.CLICK, this, () => {
					playIndex += 1;
					if (playIndex >= 6) {
						this.img_cg.mouseEnabled = false;
						this.addEvent();
						this.changeMap(1);
						Laya.Tween.to(this.img_cg, { alpha: 0 }, 1000, null, Laya.Handler.create(this, () => { this.img_cg.destroy(true) }));
						Laya.Tween.to(this, { alpha: 1 }, 1000);
					}
					else {
						cg.play(playIndex, false, false, null, 0.5);
					}
				})
			})
		}

		public curMap = 1;// 当前进度：1：鬼门关  2：幽冥殿  3：轮回道
		public mapNameList = [null, '鬼门关', '幽冥殿', '轮回道', null];
		public mapIconList = [null, "016", "030", "020", null];
		public sceneBgList = [null, '001', '003', '005', null];
		public npcConfigList = [null, [1001, 1002], [1005, 1006, 1007], [1009], null];
		public monsterConfigList = [null, null, [200003], [200005], null];
		// 场景对白
		public sceneConfigList = [
			null,
			[
				{ des: '你现在感觉身体轻飘飘的，感觉周围阴冷无比，你睁开眼睛环顾四周。', },
				{ des: '不远处两名身穿官服的男子，不时传出咯咯咯的冷笑。', },
				{ des: '身穿白色官服的人满面笑容，身材高瘦，面色惨白，口吐长舌，其头上官帽写有"一见生财"四字。', },
				{ des: '身穿黑色官服的面容凶悍，身宽体胖，个小面黑，官帽上写有"天下太平"四字', },
				{ des: '这时你才看清眼前是一座阴气森森的鬼府大门，随着你的寻问，大门逐渐打开。', event: [['createPlayer_parseTalk', 1]] },
			],

			[
				{ des: '不知走了多久，眼前忽然出现了一座巍峨的宫殿.还未等他反应过来，一人来到他面前。', delay: 10 },
				{ des: '雄伟庄严的鬼都王殿，远远看去，通体青黑，表面有光华流转不定。', },
				{ des: '散发着强大而又恐怖的气息，沿着石阶拾级而上。', },
				{ des: '便可看到六根高可参天的石柱矗立殿前，殿内鬼影密布，雾气森森，依稀可见几尊庞大如魔神般的身影。', },
				{ des: '眼前出现一男子身着冥府官服，手持一枚阴令。', event: [['createPlayer_parseTalk', 2]] },
			],
			[
				{ des: '一座形似远古祭坛的石台，石台连通六道石门，', delay: 60 },
				{ des: '分别对应不同的轮回通道，正中央坐着一尊神色悲悯的大佛。', },
				{ des: '往前走了几步才看到眼前是一个宽额大耳，满眼慈悲，身上袈裟光华流转不定。', },
				{ des: '地藏王菩萨周身缠满恶鬼，无尽的戾气让其看起来似魔似佛', },
				{ des: '你被地藏王菩萨掌心的一颗金色的光球所吸引，呆呆的看着它。', event: [['createPlayer_parseTalk', 3]] },
			],
			null
		]
		// 剧情对白
		public talkConfigList = [
			null,
			// 鬼门关
			[
				{ npcid: 1, des: '这是哪里？？？你好，有人吗？ 有人吗？', },
				{ npcid: 1001, des: '大胆，酆都重地。何人胆敢在此喧哗！' },
				{ npcid: 1, des: '敢问你们两位是？' },
				{ npcid: 1002, des: '我俩二人乃是黑白无常，你阳寿已尽，轮回至此，我二人在此等候多时了。' },
				{ npcid: 1, des: '黑白无常？鬼门关？我真的挂了？这怎么可能！！！我记得。。。好像是有个陨石。。。' },
				{ npcid: 1, des: '然后，Ummmmmmm~~~~卧槽，我记起来了，我是被陨石砸死的。' },
				{ npcid: 1002, des: '既来此地，速去幽冥殿报道，盘算你前世因来世果。', event: [['createPlayer_updateTask', '去找幽冥殿盘算因果']] },
				{ npcid: 1, des: '。。。。。。幽冥殿？等等，第一次来啊，要我怎么走？' },
				{ npcid: 1002, des: '顺着黄泉路一直走就能看到幽冥殿了', event: [['createPlayer_showTips', 'btn_mapUp'],], stop: true },
			],

			// 幽冥殿
			[
				{ npcid: 1, des: '这里该不会就是幽冥殿吧！是在东北地下吗？好冷啊！~~~~~' },
				{ npcid: 1007, des: '吾乃功曹是也，何人到此，报上名来！！' },
				{ npcid: 1, des: '我想想，我叫啥来着~~~', event: [['createPlayer_showDialog', 1]], stop: true },
				{ npcid: 1007, des: '好了，找到你了。你前世未犯重罪，不必受地狱之苦，直接可以去转世投胎。' },
				{ npcid: 1007, des: '跟我去见阎王大人。' },
				{ npcid: 1, des: '拜见阎王爷(心里嘀咕着:这不是龙王吗?)。' },
				{ npcid: 1005, des: '哈哈哈，有缘人，你可知你为何来此？你胸前玉牌又是何物？', },
				{ npcid: 1, des: '小人不知(心里嘀咕着:不死我来这干嘛？)。这玉牌也不是我的。' },
				{ npcid: 1005, des: '此玉牌乃女娲补天之遗物，深藏问道成仙之奥秘。你因它而死，也将因它而生。万事万物皆有定法。' },
				{ npcid: 1, des: '？？？？？？' },
				{ npcid: 1005, des: '有缘人，将来你会明白的。判官，将孽镜台拿来。' },
				{ npcid: 1006, des: '属下遵命。' },
				{ npcid: 1006, des: '此乃孽镜台，镜中的你就是转生之后的样子。你想清楚了再决定，出了这幽冥殿，你想改就难了。', event: [['createPlayer_showTips', 'box_boss']], stop: true },
				{ npcid: 1, des: '我决定好了，请让我投胎转世吧！' },
				{ npcid: 1005, des: '好！既然如此，功曹你带他去见地藏王菩萨吧。', event: [['createPlayer_showTips', 'btn_mapUp'], ['createPlayer_updateTask', '去找地藏王菩萨']], stop: true },

			],

			// 轮回道
			[
				{ npcid: 1009, des: '有缘人，你来了。' },
				{ npcid: 1, des: '？？？。。。您就是传说中的地藏王菩萨？请问我该如何投胎转世呢？' },
				{ npcid: 1009, des: '有缘人，来到此地一切皆是缘法。你再往前一步就是阳界。正所谓众生平等，千人千面，有短有长。' },
				{ npcid: 1009, des: '不会有全知全能的人，但总会有人在某些方面有着超乎常人的聪慧，这就是天赋。你靠近过来,这就是你的六根五识盘，拿好了！！！', event: [['createPlayer_showDialog', 3]], stop: true },
				{ npcid: 1, des: '哦哦，我决定好我的天赋了（把命盘递给了菩萨）。' },
				{ npcid: 1009, des: '（菩萨偷偷瞄了一眼你的命数盘，一脸的笑容）好好好，果然是有趣之人！你且去吧，跳入轮回之海开始你的另一段故事！！！', event: [['createPlayer_showTips', 'box_boss']], stop: true },
			],
			null
		];

		/**
		 * 切换场景
		 */
		public changeMap(index): void {
			// 禁用按钮
			this.btn_mapUp.disabled = true;
			this.box_boss.disabled = true;
			this.curMap = index;
			// 场景描写
			this.ui_sceneTalk.parseSceneTalk(this.sceneConfigList[index]);
			// 背景图
			this.img_sceneBg.skin = 'image/common/scene/zdmap_icon_' + this.sceneBgList[index] + '.jpg';
			// 清地图
			this.box_boss.removeChildren();
			this.clearObjView();
			// 移动的按钮
			let mapName0 = this.mapNameList[index - 1];
			let mapName1 = this.mapNameList[index];
			let mapName2 = this.mapNameList[index + 1];
			this.btn_mapCenter.label = '' + mapName1;
			this.btn_mapCenter.labelColors = '#1a5062';
			this.btn_mapCenter.skin = 'image/main/frame_didian_2.png';
			// this.lbl_sceneName.text = '' + mapName1;
			if (mapName0) {
				this.btn_mapDown.visible = true;
				this.btn_mapDown.label = '' + mapName0;
				this.btn_mapDown.labelColors = '#63491a';
				this.btn_mapDown.skin = 'image/main/btn_didian_01.png';
			}
			else {
				this.btn_mapDown.visible = false;
			}

			if (mapName2) {
				this.btn_mapUp.visible = true
				this.btn_mapUp.label = '' + mapName2;
				this.btn_mapUp.labelColors = '#63491a';
				this.btn_mapUp.skin = 'image/main/btn_didian_01.png';
			}
			else {
				this.btn_mapUp.visible = false;
			}
			// Npc
			let npcList = this.npcConfigList[index];
			for (let npcConfig of npcList) {
				let npcUI = new view.npc.NpcIconItem();
				let npcObj = new GameObject.Npc();
				// Npc 名字
				npcObj.feature.dwCretTypeId = npcConfig;
				npcObj.objName = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME('' + npcConfig);
				npcUI.setData(npcObj);
				this.addObjView(npcUI);
			}
			// 怪物
			let monsterList = this.monsterConfigList[index];
			if (monsterList && monsterList.length == 1) {
				let monsterUI = new view.scene.MonsterInSceneItemV15();
				let monsterObj = new GameObject.Monster();
				monsterObj.feature.dwCretTypeId = monsterList[0];
				monsterObj.objName = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + monsterList[0]);
				monsterUI.setData(monsterObj);
				monsterUI.clickHander = Laya.Handler.create(this, () => {
					let progerUI = new view.npc.NpcProgressItem();
					switch (monsterList[0]) {
						// 孽冤镜
						case 200003:
							progerUI.setData('镜面上泛起涟漪...', 3000);
							progerUI.closeHandler = Laya.Handler.create(this, () => {
								this.showDialog(2)
							})
							break;
						// 轮回道
						case 200005:
							progerUI.setData('轮回之门正在开启...', 3000);
							progerUI.closeHandler = Laya.Handler.create(this, () => {
								// this.lbl_finaName.text = this.playerName;
								this.showDialog(3)
							})
							break;
					};
					progerUI.centerY = 0;
					this.addChild(progerUI);
					this.box_boss.disabled = true;
				}, null, false);
				this.box_boss.addChild(monsterUI);
			}
		}


		/**
		 * 添加UI对象
		 */
		public addObjView(uiObj): void {
			for (let i = 1; i < 4; i++) {
				if ((this['box_' + i] as Laya.Box).numChildren == 0) {
					this['box_' + i].addChild(uiObj)
				}
			}
		}

		/**
		 * 清视野
		 */
		public clearObjView(): void {
			this.box_1.removeChildren();
			this.box_2.removeChildren();
			this.box_3.removeChildren();
			this.box_boss.removeChildren();
		}


		public addEvent(): void {

			// 向前进
			EventManage.onWithEffect(this.btn_mapUp, Laya.UIEvent.CLICK, this, () => {
				this.changeMap(this.curMap + 1);
			});

			// 向后退
			EventManage.onWithEffect(this.btn_mapDown, Laya.UIEvent.CLICK, this, () => {
				TipsManage.showTips('劝君更进一杯酒，身前有路莫回头');
			});

			this.addLcpEvent();
		}


		public addLcpEvent() {
			// 解析对白
			GameApp.LListener.on('createPlayer_parseTalk', this, (index) => {
				this.ui_npcTalk.parseTalkList(this.talkConfigList[index]);
			});

			// 提示
			GameApp.LListener.on('createPlayer_showTips', this, (btn) => {
				this.showTipsImage(this[btn]);
			});

			// 更新任务提示
			GameApp.LListener.on('createPlayer_updateTask', this, (des) => {
				this.lbl_tipsDes.text = '' + des;
			});

			// 弹出dialog
			GameApp.LListener.on('createPlayer_showDialog', this, (index) => {
				this.showDialog(index);
			});

			// 新玩家进入游戏打开欢迎界面
			GameApp.LListener.once(ProtoCmd.NEW_PLAYER_WelcomeDialog, this, this.welcomeDialog);

		}

		public Dispose(isbool) {
			GameApp.LListener.offCaller('createPlayer_parseTalk', this);
			GameApp.LListener.offCaller('createPlayer_showTips', this);
			GameApp.LListener.offCaller('createPlayer_updateTask', this);
			GameApp.LListener.offCaller('createPlayer_showDialog', this);
			PopUpManager.Dispose(this);
		}

		/**
		 * 显示提示按钮
		 * @param btn 
		 * @param rotation 
		 */
		public showTipsImage(btn: Laya.Button): void {
			btn.disabled = false;
			btn.alpha = 1;
			GameUtil.addEffectButton(btn);
		}


		/**
		 * 显示对话框
		 * @param index 0标识关闭 
		 */
		public showDialog(index): void {
			switch (index) {
				// 关闭弹窗
				case 0:
					Laya.Dialog.manager.closeAll();
					this.ui_npcTalk.parseTalkList()
					break;
				// 选择角色界面
				case 1:
					new view.createPlayer.CreateAvatarDialog().setData().show()
					break;
				// 随机天赋界面
				case 2:
					new view.createPlayer.CreateAvatarTalentDialog().setData().show()
					break;
				// 最终信息界面
				case 3:
					new view.createPlayer.CreateAvatarFinallyDialog().setData().show()
					break;
			}
		}


		/**
		 * 创角协议回调
		 * @param data 
		 */
		public createPlayerRet(msg: ProtoCmd.CreatePlayerRet): void {
			// 单服单角色，这里可以扩展
			let selector: ProtoCmd.SelectPlayer = new ProtoCmd.SelectPlayer();
			selector.setValue("nselectidx", 0);
			selector.setValue("szName", msg.getValue('szPlayerName'));
			selector.setValue("btmapsubline", 1);
			lcp.send(selector, this, this.selectPlayerRet);
			GameApp.GameEngine.isLogin = true;
			GameApp.SDKManager.createRole(msg.getValue('dwUserOnlyId'), msg.getValue('szPlayerName'));
		}

		/**
		 * 选择界面登录
		 * @param data 
		 */
		public selectPlayerRet(data: any): void {
			let msgData: ProtoCmd.SelectPlayerRet = new ProtoCmd.SelectPlayerRet(data);
			if (msgData.getValue('nErrorCode') == 0) {
				// 创建账号成功,并成功登录游戏
				this.showDialog(0);
				GameApp.GameEngine.gamesvrIdType = msgData.getValue('gamesvr_id_type');
				GameApp.MainPlayer.onlyId = msgData.getValue('dwUserOnlyId');
				GameApp.MainPlayer.objName = msgData.getValue('szName');
				// 这里重置一下socket,启用重连协议进入服务器
				GameApp.Socket.resetSocket(FunctionUtils.ipbytestoipstr(msgData.getValue('ip')), msgData.getValue('port'));
			}
			else {
				TipsManage.showTips("选择昵称失败：" + msgData.getValue('nErrorCode'))
			}
			msgData.clear();
		}


		// 全部资质点
		public totalZiZhiPoint: number;
		public welcomeDialog(): void {
			// 判定等级和任务情况，是否触发（等级1级 任务为空，领取第一个主线任务）
			if (Object.keys(GameApp.GameEngine.taskInfo).length == 0) {
				let des = '恭喜你\n成功转生到武侠世界。\n'
				des += '您的出身：' + LangConfig.JOB_TYPEDES[EnumData.JOB_TYPE[this.job]] + '\n';
				des += '您的性别：  ' + LangConfig.SEX_TYPEDes[EnumData.SEX_TYPE[this.sex]] + ' \n';
				new view.dialog.WelcomeDialog().setData(des).popup(true);
			}
			// 进入了游戏
			// 初始化性格天赋界面
			let pkt1 = new ProtoCmd.QuestClientData();
			pkt1.setString(ProtoCmd.JS_sendTianFuZiZhi, null, null, this, (jsonData: ProtoCmd.itf_JS_talentXingGeInfo) => {
				// 全部资质点
				this.totalZiZhiPoint = jsonData.TotalZiZhiPoint;
				// 资质
				GameApp.MainPlayer.talentInfo = jsonData.zztab;
				// 性格、标签
				GameApp.MainPlayer.xingGeInfo = jsonData.tftab;
			});
			lcp.send(pkt1);

		}
	}
}