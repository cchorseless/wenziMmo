/**Created by the LayaAirIDE*/
module view.common {
	export class CreateAvatarPanel extends ui.common.CreateAvatarPanelUI {
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
			this.panel_scene.vScrollBarSkin = '';
			this.vbox_scene['sortItem'] = (items) => { };
			this.vbox_left['sortItem'] = (items) => { };
			this.panel_0.vScrollBarSkin = '';
			this.panel_1.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.vbox_1['sortItem'] = (items) => { };
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_talk.selectedIndex = index;
			}, null, false);
			this.box_bigMap.scale(0, 0);
			this.addDiFuTalk();
			this.addRenJianTalk();
			this.initSelf();
		}

		public initSelf(): void {
			this.alpha = 0;
			this.box_npcTalk.visible = false;
			// 加载动作
			let playerObj = new GameObject.Player();
			playerObj.skeBoneRes = 'sk/player/ZJ_GH.sk';
			let playerUI = new view.scene.PlayerInSceneItem();
			playerUI.setData(playerObj);
			playerUI.scale(1, 1);
			playerUI.centerX = playerUI.centerY = 0;
			// playerUI.box_info.visible = false;
			this.box_self.addChild(playerUI);
			// 加载过长动画
			let cg = new SkeletonUtil.SkeletonGroup();
			cg.loadRes(['sk/new/MH.sk'], () => {
				cg.pos(Laya.stage.width / 2, Laya.stage.height / 2);
				this.img_cg.addChild(cg);
				let playIndex = 0;
				cg.play(playIndex, false, false, null, 0.5);
				this.img_cg.on(Laya.UIEvent.CLICK, this, () => {
					playIndex += 1;
					if (playIndex >= 6) {
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

		public curMap = 1;// 当前进度：1：鬼门关 2：黄泉路 3：幽冥殿 4：奈何桥 5：轮回道
		public mapNameList = [null, '鬼门关', '黄泉路', '幽冥殿', '奈何桥', '轮回道', null];
		public mapIconList = [null, "016", "018", "030", "021", "020", null];
		public sceneBgList = [null, '001', '002', '003', '004', '005', null]
		public npcConfigList = [null, [1001, 1002], [1003, 1004], [1005, 1006, 1007], [1008], [1009], null];
		public monsterConfigList = [null, [], [200002, 200002, 200002], [200003], [200004], [200005], null];
		// 场景对白
		public sceneConfigList = [
			null,
			['你感觉身体轻飘飘的，感觉周围阴冷无比，你睁开眼睛环顾四周。',
				'不远处两名身穿官服的男子，不时传出咯咯咯的冷笑。',
				'身穿白色官服的人满面笑容，身材高瘦，面色惨白，口吐长舌，其头上官帽写有"一见生财"四字。',
				'身穿黑色官服的面容凶悍，身宽体胖，个小面黑，官帽上写有"天下太平"四字',
				'这时你才看清眼前是一座阴气森森的鬼府大门，随着你的寻问，大门逐渐打开。',
				'露出一片青黑色的符砖地面，整个空间黑雾缭绕，雾中不断传出冷笑。',
				'白无常语气平和，说出来的话有着让人平静下来的魔力。',
				'黑无常一边说着，一边拿笔在一本小册子上写着。',
				'白无常说完，轻轻推了你一下，你就走进了这条黄泉路。',
				'当你再一回头，不要说黑白无常，就连鬼门关都消失了。',
			],
			[
				'刚出这鬼门关，踏上黄泉路，眼前出现了两个鬼卒。',
				'一个鬼卒牛首人身，长相憨厚，手持一条黑色锁链，专门羁押恶鬼',
				'一个鬼卒马面人身，一头白发，身材较矮，手持一柄斩马刀，喜欢咧嘴傻笑',
				'你点了点头走上了自己应该走的道路，这个时候黄泉路的全貌才显现出来。',
				'万鬼咆哮的黄泉路，一条不见尽头的漆黑通道。',
				'犹如浓墨晕染，唯一的亮色便是道旁盛开的彼岸花。',
				'此花猩红如血，在黄泉路中显得妖艳无比。',
				'你情不自禁的采了几朵，就在这时你忽然想起之前牛头的叮嘱。',
				'将采好的花收起来，抵住诱惑向着幽冥殿前进'
			],
			[
				'不知走了多久，眼前忽然出现了一座巍峨的宫殿.还未等他反应过来，一人来到他面前。',
				'雄伟庄严的鬼都王殿，远远看去，通体青黑，表面有光华流转不定。',
				'散发着强大而又恐怖的气息，沿着石阶拾级而上。',
				'便可看到六根高可参天的石柱矗立殿前，殿内鬼影密布，雾气森森，依稀可见几尊庞大如魔神般的身影。',
				'眼前出现一男子身着冥府官服，手持一枚阴令。',
			],
			[
				'忘川河上唯一一座桥，桥面略低于水面。',
				'边是由骨头搭建的扶栏，在幽碧如渊的忘川河水映衬下。',
				'奈何桥显得尤其弱小可怜，仿佛随时桥面就会坍塌。',
				'来到奈何桥边，孟婆单手拿着碗静静的等待着。',
				'跟着孟婆来到一口锅前，锅中汤发出咕嘟咕嘟的声音，你好奇的往锅里一看。',
				'却看到锅中竟映出自己生前的所有事情，从出生到死去。',

			],
			[
				'一座形似远古祭坛的石台，石台连通六道石门，',
				'分别对应不同的轮回通道，正中央坐着一尊神色悲悯的大佛。',
				'往前走了几步才看到眼前是一个宽额大耳，满眼慈悲，身上袈裟光华流转不定。',
				'地藏王菩萨周身缠满恶鬼，无尽的戾气让其看起来似魔似佛',
				'你被地藏王菩萨掌心的一颗金色的光球所吸引，呆呆的看着它。',
				'还未等你说话，只见地藏王菩萨一挥手，眼前泛起耀眼的白光。',
				'而你只感觉天旋地转，直接晕了过去。',
			],
			null
		]
		// 剧情对白
		public talkConfigList = [null,
			// 鬼门关
			[
				{ 1: '这是哪里？？？你好，有人吗？ 有人吗？', 'delay': 30 },
				{ 1001: '大胆，酆都重地。何人胆敢在此喧哗！' },
				{ 1: '敢问你们两位是？' },
				{ 1001: '我们二人乃是黑白无常，你阳寿已尽，轮回至此，我二人再次等候多时了。' },
				{ 1: '黑白无常？鬼门关？我真的死了？这怎么可能！！！我记得。。。好像是有个陨石。。。然后。。。咦？我脖子上的这个吊坠是哪来的。。。' },
				{ 1002: '无需废话，既来此地，速去幽冥殿报道，盘算你前世因来世果。' },
				{ 1: '。。。。。。幽冥殿？我第一次来啊，要怎么走？' },
				{ 1002: '顺着黄泉路一直走就能看到幽冥殿了', 'showTips': 'btn_mapUp', 'showTipsMode': 2 },
			],
			// 黄泉路
			[
				{ 1004: '啧啧啧，又来一个倒霉鬼！！！', 'delay': 60 },
				{ 1003: '哈哈哈，新来的，瞅啥呢？麻溜滴，小跑过来！！！' },
				{ 1: '...看两位面相奇特，骨骼惊奇，想必是牛头马面两位鬼差大哥了。' },
				{ 1003: '你还算聪明，知道我们是当差的。过来吧，手臂打开，腰杆挺直，老实一点！' },
				{ 1: '啊？这是要干啥？我身上可没啥宝贝，两位大哥还是放过我吧！' },
				{ 1004: '屁话！谁要你的东西。你以为幽冥殿是想来就来地方！请配合安检，老实一点。男的来找我' },
				{ 1003: '女的请过来找我' },
				{ 1: '！！！我是男是女来着？？？', 'showDialog': 1, 'stop': true },
				{ 1004: '等等，你脖子挂的是个啥东西？好像在哪里见过来着！' },
				{ 1: '啊！低头一看，发现脖子上不知何时挂了个奇怪的玉珏，散发着幽幽白光，似乎把心神都能吸进去了~~~' },
				{ 1003: '哈哈哈，现在不同以前了。不要你的东西，瞧给你吓得。看样子也不像危险品，诺，还给你。' },
				{ 1: '是是是，谢谢鬼差大哥！我怎么会带危险品来这，我老实得很，老实得很。' },
				{ 1004: '好了，你走吧。幽冥殿就在前面。', 'showTips': 'btn_mapUp', 'showTipsMode': 2 },

			],
			// 幽冥殿
			[
				{ 1007: '我是这幽冥殿的功曹，在此等候多时了。' },
				{ 1: '不知我现在应该怎么办。' },
				{ 1007: '随我去见阎王大人。' },
				{ 1: '见过阎王大人。' },
				{ 1005: '不必多礼，为你自己选一个出身吧。', 'showDialog': 2 },
				{ 1: '我选好了。' },
				{ 1005: '功曹带他去见判官吧！' },
				{ 1: '好！' },
				{ 1007: '这位是这幽冥殿的判官。' },
				{ 1006: '姓名！' },
				{ 1: '我的姓名是……', 'showDialog': 0 },
				{ 1006: '你一生未犯重罪，不必受地狱之苦，直接可以去转世投胎' },
				{ 1: '多谢判官！' },
				{ 1006: '不必谢我，这些都是你应得的。' },
				{ 1006: '此乃孽镜台，镜中的你就是转生之后的样子，看清楚了，出了这幽冥殿，你想改就难了。', 'showTips': 'box_boss', 'showTipsMode': 1, 'stop': true },
				{ 1: '我确定了。' },
				{ 1005: '好！既然如此功曹你带他去奈何桥吧。', 'updateTask': '去找地藏王菩萨', 'showTips': 'btn_mapUp', 'showTipsMode': 1 },

			],
			// 奈何桥
			[
				{ 1008: '你来了！' },
				{ 1: '见过孟婆！' },
				{ 1008: '不必多礼，随我去看看那孟婆汤吧。', },
				{ 1008: '此锅名为孟婆锅，锅内就是孟婆汤' },
				{ 1008: '喝了这碗孟婆汤，忘记前尘俗事。' },
				{ 1008: '选你来世的性格吧！', 'showTips': 'box_boss', 'stop': true },
				{ 1: '选好了！' },
				{ 1008: '来世做个好人，继续往前走，地藏王菩萨在那里等着你呢。', 'showTips': 'btn_mapUp', 'showTipsMode': 1 },

			],
			// 轮回道
			[
				{ 1009: '有缘人，你来了。' },
				{ 1: '？？？。。。您就是传说中的地藏王菩萨？请问我该如何投胎转世呢？' },
				{ 1009: '有缘人，来到此地一切皆是缘法。你再往前一步就是阳界。正所谓众生平等，这世间不会有全知全能的人，但总会有人在某些方面有着超乎常人的聪慧，这就是天赋。' },
				{ 1: '我懂了！看来这里需要选择我的转世天赋！！！' },
				{ 1009: '正是，正所谓千人千面，有短有长。你且过来，这就是你的六根五识盘，拿好了！！！', 'showDialog': 5, 'stop': true },
				{ 1: '谢谢菩萨，我已经选好了。（把命盘递给了菩萨）' },
				{ 1009: '（菩萨偷偷瞄了一眼你的命数盘，一脸的笑容）好好好，果然是有趣之人！你且去吧，跳入轮回之海开始你的另一段故事！！！', 'showTips': 'box_boss', 'showTipsMode': 1, 'stop': true },
			],

			null];

		/**
		 * 切换场景
		 */
		public changeMap(index): void {
			// 禁用按钮
			this.btn_mapUp.disabled = true;
			this.box_boss.disabled = true;
			this.curMap = index;
			// 更新小地图自己的标识
			let _btn_fengDu = this.ui_fengDu['btn_900' + index];
			this.ui_fengDu.img_selfOn.pos(_btn_fengDu.x, _btn_fengDu.y);

			for (let i = 1; i < 6; i++) {
				this['btn_' + i].gray = (i != index);
			}
			// 场景描写
			this.addSceneTalk();
			// 剧情对白
			this.parseTalkList(this.curMap);
			// 背景图
			this.img_sceneBg.skin = 'image/common/scene/zdmap_icon_' + this.sceneBgList[index] + '.png';
			// 清地图
			this.vbox_left.removeChildren();
			this.box_boss.removeChildren();
			this.ui_item.clearAllMonster();
			// 移动的按钮
			let mapName0 = this.mapNameList[index - 1];
			let mapName1 = this.mapNameList[index];
			let mapName2 = this.mapNameList[index + 1];
			this.btn_mapCenter.label = '' + mapName1;
			this.btn_mapCenter.skin = 'image/map/smallMap/smallmap_icon_' + this.mapIconList[index] + '.png';
			this.lbl_sceneName.text = '' + mapName1;
			if (mapName0) {
				this.btn_mapDown.visible = this.img_mapLineDown.visible = true;
				this.btn_mapDown.label = '' + mapName0;
				this.btn_mapDown.skin = 'image/map/smallMap/smallmap_icon_' + this.mapIconList[index - 1] + '.png';
			}
			else {
				this.btn_mapDown.visible = this.img_mapLineDown.visible = false;
			}

			if (mapName2) {
				this.btn_mapUp.visible = this.img_mapLineUp.visible = true
				this.btn_mapUp.label = '' + mapName2;
				this.btn_mapUp.skin = 'image/map/smallMap/smallmap_icon_' + this.mapIconList[index + 1] + '.png';
			}
			else {
				this.btn_mapUp.visible = this.img_mapLineUp.visible = false;
			}
			// Npc
			let npcList = this.npcConfigList[index];
			for (let npcConfig of npcList) {
				let npcUI = new view.compart.NpcIconItem();
				let npcObj = new GameObject.Npc();
				// Npc 名字
				npcObj.feature.dwCretTypeId = npcConfig;
				npcObj.objName = SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME('' + npcConfig);
				npcUI.setData(npcObj);
				this.vbox_left.addChild(npcUI);
			}
			// 怪物
			let monsterList = this.monsterConfigList[index];
			if (monsterList.length > 1) {
				for (let monConfig of monsterList) {
					let monsterUI = new view.scene.MonsterInSceneItem();
					let npcObj = new GameObject.Monster();
					npcObj.feature.dwCretTypeId = monConfig;
					npcObj.objName = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + monConfig);
					monsterUI.setData(npcObj);
					this.ui_item.addMonster(monsterUI);
				}
			}
			// 只有一个怪物
			else if (monsterList.length == 1) {
				let monsterUI = new view.scene.MonsterInSceneItem();
				let monsterObj = new GameObject.Monster();
				monsterObj.feature.dwCretTypeId = monsterList[0];
				monsterObj.objName = SheetConfig.mydb_monster_tbl.getInstance(null).NAME('' + monsterList[0]);
				monsterUI.scale(1.5, 1.5)
				monsterUI.setData(monsterObj);
				monsterUI.collectHander = Laya.Handler.create(this, () => {
					let progerUI = new view.npc.NpcProgressItem()
					switch (monsterList[0]) {
						// 孽冤镜
						case 200003:
							progerUI.setData('镜面上泛起涟漪...', 3000);
							progerUI.closeHandler = Laya.Handler.create(this, () => { this.showDialog(true, 3) })
							break;
						// 孟婆汤
						case 200004:
							progerUI.setData('吨吨吨吨吨吨...', 3000);
							progerUI.closeHandler = Laya.Handler.create(this, () => {
								// 拉取随机的天赋 性格数据
								let pkt1 = new ProtoCmd.QuestClientData();
								pkt1.setString(ProtoCmd.JS_sendTianFuZiZhi, null, null, this, (jsonData: ProtoCmd.itf_JS_talentXingGeInfo) => {
									console.log(jsonData);
									// 天赋
									GameApp.MainPlayer.talentInfo = jsonData.zztab;
									// 性格
									GameApp.MainPlayer.xingGeInfo = jsonData.tftab;
									this.lbl_totleZZ.text = '' + jsonData.TotalZiZhiPoint + '点';
									// 刷新界面
									this.updateTalentXingGe();
								});
								lcp.send(pkt1);
								this.parseTalkList(this.curMap)
							})
							break;
						// 轮回道
						case 200005:
							progerUI.setData('轮回之门正在开启...', 3000);
							progerUI.closeHandler = Laya.Handler.create(this, () => {
								this.lbl_finaName.text = this.playerName;
								// 拉取姓名九宫和生成八字
								let pkt2 = new ProtoCmd.QuestClientData();
								pkt2.setString(ProtoCmd.JS_birthdateAndCompellation, null, null, this, (jsonData: ProtoCmd.itf_JS_talentXingGeInfo) => {
									console.log(jsonData);
									this.showDialog(true, 6);
								});
								lcp.send(pkt2);

							})
							break;
					};
					this.box_uiScene0.addChild(progerUI);
					this.box_boss.disabled = true;
				}, null, false);
				this.box_boss.addChild(monsterUI);
			}

		}

		public addEvent(): void {
			// 随机名字
			EventManage.onWithEffect(this.btn_randomName, Laya.UIEvent.CLICK, this, this.randomName);
			// 确定名字
			this.btn_nameSure.on(Laya.UIEvent.CLICK, this, () => {
				if (!this.input_name.text) {
					TipsManage.showTips('请输入昵称')
				}
				else {
					this.playerName = this.input_name.text;
					this.lbl_playerName.text = this.input_name.text;
					console.log('=========>', this.playerName);
					// 确定了人物形象
					// 名字
					this.lbl_finaName.text = this.playerName;
					this.lbl_finaName1.text = this.playerName;
					// 立绘
					let sexDes = '';
					if (this.sex == 1) {
						sexDes = 'nan';
					} else {
						sexDes = 'nv';
					}
					this.img_avatar.skin = 'image/common/' + sexDes + '0' + this.job + '.png';
					this.img_finallyavatar.skin = 'image/common/' + sexDes + '0' + this.job + '.png';
					this.showDialog(false);

				}
			});
			// 性别
			// 男
			EventManage.onWithEffect(this.box_nan, Laya.UIEvent.CLICK, this, () => {
				this.viw_sex.selectedIndex = 0;
				this.btn_nan.selected = true;
				this.btn_nv.selected = false;
				this.sex = 1;
			});
			// 女
			EventManage.onWithEffect(this.box_nv, Laya.UIEvent.CLICK, this, () => {
				this.viw_sex.selectedIndex = 1;
				this.btn_nan.selected = false;
				this.btn_nv.selected = true;
				this.sex = 2;
			});
			// 确定性别
			EventManage.onWithEffect(this.btn_sexSure, Laya.UIEvent.CLICK, this, () => {
				if (this.sex) {
					let sexDes = '';
					if (this.sex == 1) {
						sexDes = 'nan';
					} else {
						sexDes = 'nv';
					}
					this.img_job1.skin = 'image/common/' + sexDes + '01_half.png';
					this.img_job2.skin = 'image/common/' + sexDes + '02_half.png';
					this.img_job3.skin = 'image/common/' + sexDes + '03_half.png';
					this.showDialog(false);
				}
			});
			// 选择职业
			for (let i = 1; i < 4; i++) {
				EventManage.onWithEffect(this['img_job' + i], Laya.UIEvent.CLICK, this, () => {
					this.viw_chuShendes.selectedIndex = i - 1;
					this.job = i;// 职业
					this.lbl_chuShenDes.text = '转世出身：' + ['隐门传人', '奇侠怪盗', '灭门孤儿'][i - 1];
					for (let j = 1; j < 4; j++) {
						this['btn_job' + j].selected = i == j;
						this['img_job' + j].gray = i != j;
					}
				});
			}
			// 确定职业
			EventManage.onWithEffect(this.btn_jobSure, Laya.UIEvent.CLICK, this, () => {
				if (this.job) {
					this.showDialog(false);
				}
			});

			// 确定形象
			EventManage.onWithEffect(this.btn_avatarSure, Laya.UIEvent.CLICK, this, () => {
				this.createAvatar();
			});
			// 重选姓名
			EventManage.onWithEffect(this.btn_avatarBack, Laya.UIEvent.CLICK, this, () => {
				this.viw_0.selectedIndex = 0;
				let addTalk = { 1006: '那好，再看看孽冤镜吧。', 'showTips': 'box_boss', 'showTipsMode': 1, 'stop': true };
				(this.talkConfigList[this.curMap] as Array<any>).unshift(addTalk);
			});

			// 性格资质随机
			EventManage.onWithEffect(this.btn_randomXingGe, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.JS_randomXingGeValue, null, null, this, (jsonData) => {
					console.log(jsonData);
					GameApp.MainPlayer.xingGeInfo = jsonData;
					this.updateTalentXingGe();
				})
				lcp.send(pkt);
			});
			// 地图展开
			this.btn_showMap.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_showMap.selected = !this.btn_showMap.selected;
				this.showBigMap(this.btn_showMap.selected);
			});
			// 性格资质确定
			EventManage.onWithEffect(this.btn_xingGeSure, Laya.UIEvent.CLICK, this, () => {
				this.showDialog(false);
			});

			// 随机天赋
			EventManage.onWithEffect(this.btn_randomtalent, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.JS_randomZiZhiValue, null, null, this, (jsonData) => {
					console.log(jsonData);
					GameApp.MainPlayer.talentInfo = jsonData;
					this.updateTalentXingGe();
				})
				lcp.send(pkt);
			});

			// 确定天赋
			EventManage.onWithEffect(this.btn_talentSure, Laya.UIEvent.CLICK, this, () => {
				this.showDialog(false);
			});

			/**
			 * 最终结束
			 */
			EventManage.onWithEffect(this.btn_finallySure, Laya.UIEvent.CLICK, this, () => {
				this.showDialog(false);
				// 睁眼动画
				let cg = new SkeletonUtil.SkeletonGroup();
				cg.loadRes(['sk/new/Zhenyan.sk'], () => {
					cg.pos(Laya.stage.width / 2, Laya.stage.height / 2);
					Laya.stage.addChild(cg);
					PanelManage.openJuQingModePanel();
					cg.play(0, false, false, Laya.Handler.create(this, () => {
						Laya.Tween.to(cg, { alpha: 1 }, 1000, null, Laya.Handler.create(this, () => {
							cg.destroy(true);
						}))
					}), 0.5);
				})

			});

			// 向前进
			EventManage.onWithEffect(this.btn_mapUp, Laya.UIEvent.CLICK, this, () => {
				this.changeMap(this.curMap + 1);
			});

			// 向后退
			EventManage.onWithEffect(this.btn_mapDown, Laya.UIEvent.CLICK, this, () => {
				TipsManage.showTips('劝君更进一杯酒，身前有路莫回头');
			});
			// 跳过对白
			this.box_npcTalk.on(Laya.UIEvent.CLICK, this, () => {
				if (this.curTalkContext) {
					this.lbl_napSay.text += this.curTalkContext.substr(1);
					this.btn_jumpTalk.text = '【点击继续】';
					this.curTalkContext = null;
				}
				else {
					// 对白停止
					if (this.curTalkInfo && this.curTalkInfo['stop']) {
						return
					}
					this.parseTalkList(this.curMap);
				}
			});
		}
		// 当前对白内容
		public curTalkInfo;
		// 当前对白文本内容
		public curTalkContext: string;
		/**
		 * 解析对白
		 * @param index 
		 */
		public parseTalkList(index): void {
			this.lbl_napSay.text = '';
			let talkList = this.talkConfigList[index];
			this.curTalkInfo = talkList.shift();
			if (this.curTalkInfo) {
				let npcID = Object.keys(this.curTalkInfo)[0];
				this.btn_jumpTalk.text = '【跳过对白】';
				// 当前对白内容
				this.curTalkContext = this.curTalkInfo[npcID];
				// 有延时
				Laya.timer.frameOnce(this.curTalkInfo['delay'] || 1, this, () => {
					// 显示自己
					if (npcID == '1') {
						this.box_selfAvatar.visible = true;
						this.box_npcAvatar.visible = false;
					}
					else {
						// 半身像
						this.img_npcHalf.skin = 'image/common/npc/npc_half_' + SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_NUMBER(npcID) + '.png';
						// 名字
						this.lbl_npcName.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(npcID);
						this.box_selfAvatar.visible = false;
						this.box_npcAvatar.visible = true;
					}
					// 添加字
					Laya.timer.frameLoop(5, this, this.updateTalkLabel);
					this.box_npcTalk.visible = true;
				})
			}
			else {
				this.box_npcTalk.visible = false;
			}
		}

		/**
		 * 添加剧情对白
		 */
		public updateTalkLabel(): void {
			if (!this.curTalkContext) {
				this.btn_jumpTalk.text = '【点击继续】';
				if (this.curTalkInfo) {
					// 弹窗
					if (this.curTalkInfo['showDialog'] != null) {
						this.showDialog(true);
					}
					// 更新任务信息
					if (this.curTalkInfo['updateTask'] != null) {
						this.lbl_tipsDes.text = '' + this.curTalkInfo['updateTask'];
					};
					// 点击提示
					let btn = this.curTalkInfo['showTips'];
					let mode = this.curTalkInfo['showTipsMode'];
					if (btn != null) {
						this.showTipsImage(this[btn], mode);
					};
					// 停止
					let stop = this.curTalkInfo['stop'];
					if (stop) {
						this.box_npcTalk.visible = false;
					}
				}
				Laya.timer.clear(this, this.updateTalkLabel);
				return
			}
			this.lbl_napSay.text += this.curTalkContext.substr(0, 1);
			this.curTalkContext = this.curTalkContext.substr(1);
		}

		/**
		 * 显示提示按钮
		 * @param btn 
		 * @param rotation 
		 */
		public showTipsImage(btn: Laya.Button, mode): void {
			btn.disabled = false;
			btn.alpha = 1;
			GameUtil.addEffectButton(btn)
		}

		// 随机角色姓名
		private randomName(): void {
			let index = RandomUtils.randomInt(1, 101);
			let index2 = RandomUtils.randomInt(1, 101);
			let xingShi = SheetConfig.randomNameSheet.getInstance(null).SURNAME('' + index);
			let mingZi = '';
			if (this.sex == EnumData.SEX_TYPE.SEX_MAN) {
				mingZi = SheetConfig.randomNameSheet.getInstance(null).BOYNAME('' + index);
			}
			else {
				mingZi = SheetConfig.randomNameSheet.getInstance(null).GIRLNAME('' + index);
			}
			this.input_name.text = xingShi + mingZi;
		}

		/**
		 * 添加地府聊天
		 */
		public addDiFuTalk(): void {
			Laya.timer.frameOnce(RandomUtils.randomInt(30, 80), this, () => {
				let box = new Laya.Box();
				box.width = 300;
				box.height = 46;
				let div = new Laya.HTMLDivElement();
				div.style.width = 300;
				div.style.leading = 5;
				div.style.fontSize = 18;
				div.innerHTML = '[系统]：' + RandomUtils.randomName(6) + '因作恶多端，轮回道畜生道。';
				box.addChild(div);
				this.vbox_1.addChild(box);
				Laya.timer.frameOnce(1, this, () => {
					this.panel_1.scrollTo(0, this.vbox_1.height);
				})
				this.addDiFuTalk();
			})

		}

		/**
		 * 添加人间聊天
		 */
		public addRenJianTalk(): void {
			Laya.timer.frameOnce(RandomUtils.randomInt(30, 80), this, () => {
				let box = new Laya.Box();
				box.width = 300;
				box.height = 46;
				let div = new Laya.HTMLDivElement();
				div.style.width = 300;
				div.style.leading = 5;
				div.style.fontSize = 18;
				div.innerHTML = '[世界]：' + RandomUtils.randomName(6) + '降生了，净重6斤二两8钱。';
				box.addChild(div);
				this.vbox_0.addChild(box);
				Laya.timer.frameOnce(1, this, () => {
					this.panel_0.scrollTo(0, this.vbox_0.height);
				})
				this.addRenJianTalk();
			})
		}


		/**
		 * 添加场景对话
		 */
		public addSceneTalk(): void {
			Laya.timer.frameOnce(60, this, () => {
				let sceneInfo = this.sceneConfigList[this.curMap];
				if (sceneInfo && sceneInfo.length > 0) {
					let box = new Laya.Box();
					box.left = box.right = 0;
					let div = new Laya.HTMLDivElement();
					div.style.width = 640;
					div.style.leading = 5;
					div.style.fontSize = 20;
					box.height = 40;
					div.innerHTML = sceneInfo.shift();
					box.addChild(div);
					this.vbox_scene.addChild(box);
					Laya.timer.frameOnce(1, this, () => {
						this.panel_scene.scrollTo(0, this.vbox_scene.height);
					})
					this.addSceneTalk();
				}
			})

		}

		/**
		 * 显示对话框
		 * @param isShow 
		 */
		public showDialog(isShow, index = 0): void {
			if (isShow) {
				this.viw_0.scale(0, 0);
				this.viw_0.selectedIndex = index || this.curTalkInfo['showDialog'];
				Laya.Tween.to(this.viw_0, { scaleX: 1, scaleY: 1 }, 200);
				this.img_dialog.visible = true;
			}
			else {
				Laya.Tween.to(this.viw_0, { scaleX: 0, scaleY: 0 }, 200, null, Laya.Handler.create(this, () => {
					this.img_dialog.visible = false;
					this.parseTalkList(this.curMap);
				}));
			}
		}
		/**
		 * 创建角色
		 */
		private createAvatar(): void {
			if (!this.playerName) {
				TipsManage.showTips('你还没有地府注册过')
				return
			}
			if (!this.sex) {
				TipsManage.showTips('是男是女不知道，容易多多少少')
				return
			}
			if (!this.job) {
				TipsManage.showTips('出身没选过，往哪投胎呢')
				return
			}
			// 角色名称
			GameApp.MainPlayer.objName = this.playerName;
			let createusr = new ProtoCmd.CreatePlayer();
			createusr.setValue('szAccount', GameApp.MainPlayer.playerAccount);
			createusr.setValue('countryId', 1);
			createusr.playerinfo.setValue('szName', this.playerName);
			createusr.playerinfo.feature.setValue('sex', this.sex);
			createusr.playerinfo.feature.setValue('job', this.job);
			// 创角协议
			lcp.send(createusr, this, this.createPlayerRet);
		}


		/**
		 * 创角协议回调
		 * @param data 
		 */
		public createPlayerRet(data: any): void {
			let msg = new ProtoCmd.CreatePlayerRet(data);
			let errorcode = msg.getValue('errorcode');
			console.log('==========errorcode', errorcode)
			if (errorcode == 0) {
				// 创建账号成功
				this.showDialog(false);
				// 单服单角色，这里可以扩展
				let selector: ProtoCmd.SelectPlayer = new ProtoCmd.SelectPlayer();
				selector.setValue("nselectidx", 0);
				selector.setValue("szName", msg.getValue('szPlayerName'));
				selector.setValue("btmapsubline", 1);
				lcp.send(selector, this, this.selectPlayerRet)
				GameApp.GameEngine.isLogin = true;

				GameApp.SDKManager.createRole(msg.getValue('dwUserOnlyId'), msg.getValue('szPlayerName'))
			}
			else {
				let strmsg: string;
				switch (errorcode) {
					case -10:
						strmsg = '有非法字符';
						break;
					case -14:
						strmsg = '昵称名检查没通过';
						break;
					case -15:
						strmsg = '昵称名不能超过4个以上的数字';
						break;
					case -16:
						strmsg = '当前服务器正在维护';
						break;
					case -70:
						strmsg = '昵称重复';
						break;
					default:
						strmsg = '昵称重复';
						break;
				}
				TipsManage.showTips(strmsg);
			}
			msg.clear();
			msg = null;
		}

		/**
		 * 选择界面登录
		 * @param data 
		 */
		public selectPlayerRet(data: any): void {
			let msgData: ProtoCmd.SelectPlayerRet = new ProtoCmd.SelectPlayerRet(data);
			if (msgData.getValue('nErrorCode') == 0) {
				GameApp.GameEngine.gamesvrIdType = msgData.getValue('gamesvr_id_type');
				GameApp.MainPlayer.onlyId = msgData.getValue('dwUserOnlyId');
				GameApp.MainPlayer.objName = msgData.getValue('szName');
				// 这里重置一下socket,启用重连协议进入服务器
				GameApp.Socket.resetSocket(FunctionUtils.ipbytestoipstr(msgData.getValue('ip')), msgData.getValue('port'));
			} else {
				TipsManage.showTips("选择昵称失败：" + msgData.getValue('nErrorCode'))
			}
			msgData.clear();

		}

		/**
		 * 更新天赋性格
		 */
		public updateTalentXingGe(): void {
			// 渲染人格界面
			let keys = Object.keys(GameApp.MainPlayer.xingGeInfo);
			for (let i = 1; i < 9; i++) {
				if (GameApp.MainPlayer.xingGeInfo[i]) {
					this['btn_xingGe' + i].visible = true;
					this['btn_xingGe' + i].label = '' + SheetConfig.attribute.getInstance(null).NAME('' + GameApp.MainPlayer.xingGeInfo[i].id);
				}
				else {
					this['btn_xingGe' + i].visible = false;
				}
			}
			// 渲染天赋界面
			for (let i = 1; i < 6; i++) {
				let count = GameApp.MainPlayer.talentInfo[i];
				// 阶数
				this['lbl_jieShudes' + i].text = '' + count;
			}


		}

		/**
		 * 展示地图
		 * @param isShow 
		 */
		public showBigMap(isShow): void {
			if (isShow) {
				this.box_bigMap.visible = true;
				Laya.Tween.to(this.box_bigMap, { scaleX: 1, scaleY: 1 }, 300)
			}
			else {
				Laya.Tween.to(this.box_bigMap, { scaleX: 0, scaleY: 0 }, 300, null, Laya.Handler.create(this, () => {
					this.box_bigMap.visible = false;
				}))
			}
		}
	}
}