/**Created by the LayaAirIDE*/
module view.main {
	export class Main_tanSuoItem extends ui.main.Main_tanSuoItemUI {
		static self: Main_tanSuoItem;
		constructor() {
			super();
			Main_tanSuoItem.self = this;
			this.panel_sceneDes.vScrollBarSkin = '';
			this.vbox_sceneDes['sortItem'] = (items) => { };
			this.addEvent();
		}
		public times = 1;
		public isClick: boolean = false;
		public intoInfo = [];
		public addEvent() {
			this.box_button.on(Laya.UIEvent.CLICK, this, () => {
				this.isClick = !this.isClick;
				this.init_shenSuo(this.isClick);
			})
		}

		/**
		 * 切换 走房间 还是 技能
		 * @param mode 
		 */
		public changeMode(mode): void {
			if(mode==1){
				this.ui_skill.setData();
			}
			this.viw_bottom.selectedIndex = mode;
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
			label1.text = SheetConfig.mapRoomSheet.getInstance(null).ROOMDES('' + GameApp.MainPlayer.roomId);
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
					case EnumData.emMonsterType._MON_TYPE_LITTLEBOSS_:
						monster = new view.scene.MonsterInSceneItemV1();
						monster.setData(obj,1);
						break;
					case EnumData.emMonsterType._MON_TYPE_NORMAL_:
						monster = new view.scene.MonsterInSceneItemV0();
						monster.setData(obj,1);
						break;
				}
				// monster = new view.scene.MonsterInSceneItemV0();
			}
			this.addCreatureObj(monster)
			// 配置表ID
			let configID = (obj as GameObject.Monster).feature.dwCretTypeId;
			// 判断是否是BOSS,最多三个BOSS
			let isBoss = SheetConfig.mydb_monster_tbl.getInstance(null).BOSS('' + configID);
			if (isBoss) {
				// 切换成BOSS模式

				// 添加BOSS
			}
			// 小怪根据模式添加
			else {

			}
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
					npcIcon = new view.scene.MonsterInSceneItemV15();
					npcIcon.init_npc(obj);
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
			}
			else {
				this.btn_xiangXia.skin = 'image/common/img_jiantou_bianzhang_01.png';
				this.img_sceneTxt.skin = 'image/main/main_tansuo/img_zhandou_juanzhou.png'
				this.panel_sceneDes.scrollTo(0, this.panel_sceneDes.contentHeight);
				this.img_sceneTxt.height = 210;
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
										box_npc.lbl_state.text = '？';
										box_npc.lbl_state.color = '#efc623';
										break;
									//可领取
									case EnumData.NPCSTATUS.ONETASKNORECEIV:
									case EnumData.NPCSTATUS.REPEATTASKNORECEIV:
										box_npc.lbl_state.text = '!';
										box_npc.lbl_state.color = '#efc623';
										break;
									//接了任务未达成
									case EnumData.NPCSTATUS.ONETASKNOT:
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