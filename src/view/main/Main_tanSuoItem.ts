/**Created by the LayaAirIDE*/
module view.main {
	export class Main_tanSuoItem extends ui.main.Main_tanSuoItemUI {
		static self: Main_tanSuoItem;
		public canLeave = false;
		constructor() {
			super();
			this.ui_skill.setData();
			Main_tanSuoItem.self = this;
			this.panel_sceneDes.vScrollBarSkin = '';
			this.vbox_sceneDes['sortItem'] = (items) => { };
			this.ui_skill.html_need.style.fontFamily = 'STkaiti';
			this.ui_skill.html_need.style.fontSize = 22;
			this.addEvent();
		}
		public times = 1;
		public isClick: boolean = false;
		public intoInfo = [];
		public mode = 0;
		public addEvent() {
			this.box_button.on(Laya.UIEvent.CLICK, this, () => {
				this.isClick = !this.isClick;
				this.init_shenSuo(this.isClick);
			})
			//主线
			GameApp.LListener.on(ProtoCmd.FB_ChuMoRightPlane, this, (jsonData: ProtoCmd.itf_FB_MainFBjindu) => {
				console.log('主线', jsonData, GameApp.MainPlayer.curFuBenID);
				// GameApp.GameEngine.curFuBenMsg = jsonData;
				GameApp.GameEngine.curFuBenMsg = null;
				GameApp.GameEngine.curFuBenMsg = {
					curNum: jsonData.curcnt,
					maxNum: jsonData.totalcnt,
					fubenStr: jsonData.tiaojian,
					item: GameApp.MainPlayer.zhuxianFuBenReward
				}
				if (jsonData.curcnt >= jsonData.totalcnt) {
					let p = new scene.BattleRewardInfoV0Item();
					p.setData(0);
					p.popup();
					GameApp.LListener.offCaller(ProtoCmd.FB_ChuMoRightPlane, this);
				}
				let s = "<span style='color:#ffed8f'>" + jsonData.tiaojian + "</span>"
					+ "<span style='color:#ffffff'>(" + jsonData.curcnt + "/" + jsonData.totalcnt + ")</span>";
				this.ui_skill.showNeed(s);
				// this.ui_skill.html_need.innerHTML = "<span style='color:#ffed8f'>" + jsonData.tiaojian + "</span>"
				// 	+ "<span style='color:#ffffff'>(" + jsonData.curcnt + "/" + jsonData.totalcnt + ")</span>";
				// this.ui_skill.html_need.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" + '主线副本' + "</span>"
				console.log(this.ui_skill.html_need.innerHTML)
			})
			//材料
			GameApp.LListener.on(ProtoCmd.map_CaiLiaoFubenPlane2, this, (jsonData) => {
				console.log('材料', jsonData, GameApp.MainPlayer.curFuBenID);
				// GameApp.GameEngine.curFuBenMsg = jsonData;
				GameApp.GameEngine.curFuBenMsg = null;
				GameApp.GameEngine.curFuBenMsg = {
					curNum: jsonData.KILLCNT,
					maxNum: jsonData.MAXCNT,
					fubenStr: "",
					item: jsonData.JiangLi
				}
				if (jsonData.KILLCNT >= jsonData.MAXCNT) {
					let p = new scene.BattleRewardInfoV0Item();
					p.setData(0);
					p.popup();
				}
				let s = "<span style='color:#ffed8f'>" + '击杀怪物' + "</span>"
					+ "<span style='color:#ffffff'>(" + jsonData.KILLCNT + "/" + jsonData.MAXCNT + ")</span>";
				this.ui_skill.showNeed(s);
				// this.ui_skill.html_need.innerHTML = 
			})
			//心魔
			GameApp.LListener.on(ProtoCmd.GeRenBoss_FB_Info, this, (jsonData) => {
				console.log('心魔', jsonData, GameApp.MainPlayer.curFuBenID);
				GameApp.GameEngine.curFuBenMsg = null;
				if (jsonData.flag == 0) {
					GameApp.GameEngine.curFuBenMsg = {
						curNum: 1,
						maxNum: 1,
						fubenStr: "击杀怪物",
						item: jsonData.item
					}
					let s = "<span style='color:#ffed8f'>" + GameApp.GameEngine.curFuBenMsg.fubenStr + "</span>"
						+ "<span style='color:#ffffff'>(" + GameApp.GameEngine.curFuBenMsg.curNum + "/" + GameApp.GameEngine.curFuBenMsg.maxNum + ")</span>";
					this.ui_skill.showNeed(s);
					// this.ui_skill.html_need.innerHTML =
					let p = new scene.BattleRewardInfoV0Item();
					p.setData(0);
					p.popup();
				} else {
					GameApp.GameEngine.curFuBenMsg = {
						curNum: 0,
						maxNum: 1,
						fubenStr: "击杀怪物",
						item: jsonData.item
					}
					let s = "<span style='color:#ffed8f'>" + GameApp.GameEngine.curFuBenMsg.fubenStr + "</span>"
						+ "<span style='color:#ffffff'>(" + GameApp.GameEngine.curFuBenMsg.curNum + "/" + GameApp.GameEngine.curFuBenMsg.maxNum + ")</span>";
					this.ui_skill.showNeed(s);
					// this.ui_skill.html_need.innerHTML = 
				}

			})
		}

		/**
		 * 切换 走房间 还是 技能
		 * @param mode 
		 */
		public changeMode(mode): void {
			this.mode = mode;
			if (mode == 1) {
				this.canLeave = false;
				this.ui_skill.setData();
				this.ui_skill.btn_exit.gray = true;
				Laya.timer.once(10000, this, function () {
					this.ui_skill.btn_exit.gray = false;
					this.canLeave = true;
				})
			} else {
				scene.BattleFuBenInfoV3Item.self.isAuto = false;
				this.leaveFuBen();
			}
			this.viw_bottom.selectedIndex = mode;
		}
		public destroy(isbool): void {
			//主线
			GameApp.LListener.offCaller(ProtoCmd.FB_ChuMoRightPlane, this);
			//材料
			GameApp.LListener.offCaller(ProtoCmd.map_CaiLiaoFubenPlane2, this);
			//心魔
			GameApp.LListener.offCaller(ProtoCmd.GeRenBoss_FB_Info, this);
			this.leaveFuBen();
			super.destroy(isbool);
		}
		public leaveFuBen() {
			console.log('离开副本')
			switch (GameApp.MainPlayer.curFuBenID) {
				// 心魔副本
				case EnumData.emRoomType.singleFuBen:
					let pkt = new ProtoCmd.QuestClientData();
					pkt.setString(ProtoCmd.FB_GeRenBoss_Leave);
					lcp.send(pkt);
					GameApp.MainPlayer.curFuBenID = -1;
					GameApp.MainPlayer.fubenMonsterPower = 0
					break;
				// 除魔副本
				case EnumData.emRoomType.chuMoFuBen:
					let pkt1 = new ProtoCmd.QuestClientData();
					pkt1.setString(ProtoCmd.FB_ChuMoLeave);
					lcp.send(pkt1);
					GameApp.MainPlayer.curFuBenID = -1;
					GameApp.MainPlayer.fubenMonsterPower = 0
					break;
				// 资源副本
				case EnumData.emRoomType.resourceFuBen:
					let pkt2 = new ProtoCmd.QuestClientData();
					pkt2.setString(ProtoCmd.FB_CaiLiaoFuBenLikai);
					lcp.send(pkt2);
					GameApp.MainPlayer.curFuBenID = -1
					GameApp.MainPlayer.fubenMonsterPower = 0;
					break;
				// 多人副本   只有boss的野外地图
				case EnumData.emRoomType.publicFuBen:

					break;
			}

		}
		public showSkillName(skillID) {
			let icon;
			let configID = GameApp.MainPlayer.skillInfo[skillID].configID;
			icon = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_EFFECTSID(configID);
			let item: any = this.box_self.getChildAt(0);
			// item.img_isfight.skin = 'image/common/skillName/1053.png'
			if (icon == 1000) {
				return;
			}
			item.img_isfight.skin = 'image/common/skillName/' + icon + '.png'
			item.img_isfight.visible = true;
			Laya.Tween.to(item.img_isfight, { scaleX: 1, scaleY: 1 }, 1000, null, Laya.Handler.create(this, () => {
				item.img_isfight.visible = false;
				item.img_isfight.scaleX = item.img_isfight.scaleY = 0.2;
			}))
		}


		/**
		 * 更新界面信息
		 */
		public updateUI() {
			this.lbl_roomName.text = GameApp.MainPlayer.mapName;
			//房间信息简介
			let label1 = new Laya.Label;
			label1.width = 590;
			label1.color = '#63491a';
			label1.font = 'FZXK';
			label1.fontSize = 22;
			label1.wordWrap = true;
			if (this.mode == 0) {
				label1.text = SheetConfig.mapRoomSheet.getInstance(null).ROOMDES('' + GameApp.MainPlayer.roomId);
			}
			// label1.text = SheetConfig.mapRoomSheet.getInstance(null).ROOMDES('14018');
			this.init_updataHieght(label1);
			// 更新主界面的UI信息
			GameApp.LListener.event(LcpEvent.UPDATE_UI_PLACE_DES)
		}

		public addPlayer(obj): void {
			let playerUI: view.scene.PlayerAndHeroInSceneV0Item = new view.scene.PlayerAndHeroInSceneV0Item();
			playerUI.setMaster(obj);
			this.addCreatureObj(playerUI);
			// if (obj.curHero) {
			// 	GameApp.SceneManager.addHero(obj.curHero)
			// }
		}


		/**
		 * 添加怪物
		 * @param obj 
		 */
		public addMonster(obj): void {
			let monster;
			if (obj.ui_item) {
				monster = obj.ui_item;
			}
			else {
				let configID = '' + obj.feature.dwCretTypeId
				let skePath: EnumData.emMonsterType = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_TYPE(configID)
				switch (skePath) {
					case EnumData.emMonsterType._MON_TYPE_COLLECT_:
					case EnumData.emMonsterType._MON_TYPE_CITYGUARD_:
						monster = new view.scene.MonsterInSceneItemV15();
						monster.setData(obj);
						break;
					// 
					case EnumData.emMonsterType._MON_TYPE_BIGBOSS_:
					case EnumData.emMonsterType._MON_TYPE_LITTLEBOSS_:
						monster = new view.scene.MonsterInSceneItemV1();
						monster.setData(obj, this.mode);
						break;
					case EnumData.emMonsterType._MON_TYPE_NORMAL_:
						monster = new view.scene.MonsterInSceneItemV0();
						monster.setData(obj, this.mode);
						break;
				}
				// monster = new view.scene.MonsterInSceneItemV0();
			}
			this.addCreatureObj(monster)
			// 配置表ID
			let configID = (obj as GameObject.Monster).feature.dwCretTypeId;

			//是否是任务目标
			let istarget = false;
			for (let index in GameApp.GameEngine.taskInfo) {
				let taskInfo = GameApp.GameEngine.taskInfo[index];
				if (taskInfo) {
					for (let i in taskInfo) {
						//目标怪物
						let id = GameUtil.taskTargetByString(taskInfo[i].targetdes);
						if (id != 0) {
							if (obj.feature.dwCretTypeId == id) {
								istarget = true;
							}
						}
					}
				}
			}
			if (monster.img_target) {
				if (istarget) {
					monster.img_target.visible = true;
				} else {
					monster.img_target.visible = false;
				}
			}
		}


		/**
		 * 添加NPC
		 * @param obj 
		 */
		public addNpc(obj) {
			let type = SheetConfig.mydb_npcgen_tbl.getInstance(null).TYPE('' + obj.feature.dwCretTypeId);
			let npcIcon;
			switch (type) {
				case 2:
					npcIcon = new view.npc.NpcIconItem();
					npcIcon.setData(obj);
					break;
				//功能npc
				case 3:
					npcIcon = new view.npc.NpcFunctionItem();
					npcIcon.setData(obj);
					break;
			}
			this.addCreatureObj(npcIcon);
		}


		public addCreatureObj(uiOBJ) {
			for (let i = 0; i < 8; i++) {
				let box = this['box_' + i] as Laya.Box
				if (box.numChildren == 0) {
					box.addChild(uiOBJ)
					return
				}
			}
		}
		public clearView() {
			for (let i = 0; i < 8; i++) {
				this['box_' + i].removeChildren()
			}
		}
		public init_shenSuo(v: boolean): void {
			if (v) {
				this.btn_xiangXia.skin = 'image/common/img_tansuojiantou.png';
				this.panel_sceneDes.scrollTo(0, this.panel_sceneDes.contentHeight);
				this.img_sceneTxt.skin = 'image/main/main_tansuo/img_zhandou-juanzhou_03.png'
				this.img_sceneTxt.height = 690;
				this.box_shijian.visible = false;
				this.box_button.y = 262
			}
			else {
				this.btn_xiangXia.skin = 'image/common/img_jiantou_bianzhang_01.png';
				this.img_sceneTxt.skin = 'image/main/main_tansuo/img_zhandou_juanzhou.png'
				this.panel_sceneDes.scrollTo(0, this.panel_sceneDes.contentHeight);
				this.img_sceneTxt.height = 210;
				this.box_button.y = 722
				this.box_shijian.visible = true;
			}
		}
		public init_updataHieght(label: Laya.Label): void {
			let allPlayer = GameApp.MainPlayer.allPlayer;
			let num = 0;
			for (let i in allPlayer) {
				num += 1;
			}
			if (num <= 50) {
				this.vbox_sceneDes.addChild(label);
			} else {
				this.intoInfo.push(label);
				Laya.timer.loop(500, this, this.upDataIntoInfo);
			}
			this.panel_sceneDes.scrollTo(0, this.panel_sceneDes.contentHeight);
		}
		/**
		 * 房间人数大于50，则每0.5秒刷新1条玩家进出信息,每十秒清空
		 */
		public upDataIntoInfo(): void {
			for (let i = this.times * 1; i < (this.times + 1); i++) {
				if (this.intoInfo[i]) {
					if (this.times == 20) {
						this.intoInfo = [];
						this.times = 0;
						Laya.timer.clear(this, this.upDataIntoInfo);
					} else {
						this.vbox_sceneDes.addChild(this.intoInfo[i]);
						this.times += 1;
					}
				} else {
					Laya.timer.clear(this, this.upDataIntoInfo);
				}
			}
		}
		/**
		 * 更新视野内的目标怪物
		 */
		public updataMonsterByTask(): void {
			for (let i = 0; i <= 7; i++) {
				let istarget = false;
				if (this['box_' + i]._childs.length > 0) {
					let box_mon = this['box_' + i]._childs[0];
					if (box_mon) {
						for (let index in GameApp.GameEngine.taskInfo) {
							let taskInfo = GameApp.GameEngine.taskInfo[index];
							if (taskInfo) {
								for (let inx in taskInfo) {
									//目标怪物
									let id = GameUtil.taskTargetByString(taskInfo[inx].targetdes);
									if (id != 0 && box_mon.item) {
										if (box_mon.item.feature.dwCretTypeId == id) {
											istarget = true;
										}
									}
								}
							}
						}
						if (box_mon.img_target) {
							if (istarget) {
								box_mon.img_target.visible = true;
							} else {
								box_mon.img_target.visible = false;
							}
						}
					}
				}
			}
		}
		/**
		 * 
		 * @param tarID   目标ID  返回对应box的ID，  如果是自己就返回999，自行处理   -1不存在
		 */
		public searchTarByID(tarID): number {
			let returnID = -1
			if (tarID == GameApp.MainPlayer.tempId) {
				returnID = 999;
				return returnID
			}

			for (let i = 0; i < 6; i++) {
				// this.box_0.getChildAt
				if (this['box_' + i].numChildren > 0) {
					let baseID = this['box_' + i].getChildAt(0).item.tempId
					// console.log('怪物Box' + i + '其中的怪物ID:' + baseID)
					if (baseID == tarID) {
						returnID = i;
						return returnID;
					}
				}

			}
			for (let i = 6; i < 8; i++) {
				if (this['box_' + i].numChildren > 0) {
					let baseID = this['box_' + i].getChildAt(0).item.tempId
					if (baseID == tarID) {
						returnID = i;
						return returnID;
					}
				}
			}
			return returnID;
		}
		/**
		 * 
		 * @param fightTar        攻击者
		 * @param dwTargetId      被攻击者
		 * @param skillID         技能ID
		 * @param dwActionTick    攻击特效到达时长
		 */
		public playFightAni(fightTar, dwTargetId, skillID, dwActionTick) {
			// let targeter = GameApp.MainPlayer.findViewObj(dwTargetId);
			let self = this;
			let fightID = this.searchTarByID(fightTar);
			let boxFightID;
			// let arr = [GameApp.MainPlayer.tempId,this.box_0.getChildAt(0).item.feature.dwCretTypeId]
			if (fightID === 999) {
				boxFightID = 'self'
			} else {
				boxFightID = fightID;
			}
			let targetID = this.searchTarByID(dwTargetId)
			let boxTargetID;
			if (targetID === 999) {
				boxTargetID = 'self'
			} else {
				boxTargetID = targetID;
			}
			if (fightID > -1 && targetID > -1) {
				let x1 = this['box_' + boxFightID].x + this['box_' + boxFightID].width * 0.5
				let y1 = this['box_' + boxFightID].y + this['box_' + boxFightID].height * 0.5
				let x2 = this['box_' + boxTargetID].x + this['box_' + boxTargetID].width * 0.5
				let y2 = this['box_' + boxTargetID].y + this['box_' + boxTargetID].height * 0.5
				// console.log('攻击者' + x1 + "~" + y1 + '被攻击者' + x2 + '~' + y2);

				let _skeGroup: SkeletonUtil.SkeletonGroup = new SkeletonUtil.SkeletonGroup();
				_skeGroup.rotation = -90;
				_skeGroup.loadRes(['sk/skill/fight/EFF_DG.sk'], () => {
					// _skeGroup.pos(fightPos[0]+ 100, fightPos[1])
					_skeGroup.pos(x1, y1)
					self.panel_fight.addChild(_skeGroup);
					_skeGroup.play(0, false)
					Laya.Tween.to(_skeGroup, { x: x2, y: y2 }, 500, null, Laya.Handler.create(this, () => {
						// _skeGroup.showChild(1);
						_skeGroup.play(1, false, true, Laya.Handler.create(this, () => {
							// self.panel_fight.removeChild(_skeGroup);
						}))
					}))
				})
			}
			else {
				TipsManage.showTips('技能没有找到目标对象');
			}
		}
		/**
		 * 更新npc的任务状态
		 * @param id npcid
		 * @param state npc状态
		 */
		public upDataNPCStateByTask(id, state): void {
			for (let i = 0; i <= 7; i++) {
				if (this['box_' + i]._childs.length > 0) {
					let box_npc = this['box_' + i]._childs[0];
					if (box_npc.item) {
						if (box_npc.item.taskState) {
							if (box_npc.item.feature.dwCretTypeId == id) {
								box_npc.item.taskState = state;
								switch (state) {
									//无任务
									case EnumData.NPCSTATUS.NOTASKALL:
										box_npc.lbl_state.text = '';
										break;
									//可交付
									case EnumData.NPCSTATUS.ONETASKCOMPLETE:
									case EnumData.NPCSTATUS.REPEATTASKCOMPLETE:
										box_npc.lbl_state.visible = true;
										box_npc.lbl_state.text = '？';
										box_npc.lbl_state.color = '#efc623';
										break;
									//可领取
									case EnumData.NPCSTATUS.ONETASKNORECEIV:
									case EnumData.NPCSTATUS.REPEATTASKNORECEIV:
										box_npc.lbl_state.visible = true;
										box_npc.lbl_state.text = '!';
										box_npc.lbl_state.color = '#efc623';
										break;
									//接了任务未达成
									case EnumData.NPCSTATUS.ONETASKNOT:
										box_npc.lbl_state.visible = true;
										box_npc.lbl_state.text = '？';
										box_npc.lbl_state.color = '#000000';
										break;
								}
							}
						}
					}
				}
			}
		}
	}
}