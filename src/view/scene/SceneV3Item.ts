/**Created by the LayaAirIDE*/
module view.scene {
	export class SceneV3Item extends ui.scene.SceneV3ItemUI implements itf.SceneItem {
		public ui_Content: BattleFuBenInfoV2Item;
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_0.vScrollBarSkin = '';
			this.panel_2.hScrollBarSkin = '';
			this.hbox_2['sortItem'] = (items) => { };
			this.hbox_0['sortItem'] = (items) => { };
			let ui_monsterGroup2 = new view.scene.MonsterGroupInSceneV1Item();
			this.hbox_2.addChild(ui_monsterGroup2);
			this.viw_0.setIndexHandler = Laya.Handler.create(this, (index) => {
				let keys = Object.keys(GameApp.MainPlayer.allMonster);
				for (let key of keys) {
					// 把所有小怪全部重新添加
					let monsterObj = GameApp.MainPlayer.allMonster[key];
					// 配置表ID
					let configID = (monsterObj as GameObject.Monster).feature.dwCretTypeId;
					// 判断是否是BOSS,最多两个BOSS
					let isBoss = SheetConfig.mydb_monster_tbl.getInstance(null).BOSS('' + configID);
					if (!isBoss) {
						this.addMonster(monsterObj);
					}
				}
			}, null, false);
			this.ui_Content = new BattleFuBenInfoV2Item();
			// this.box_content.addChild(ui_Content);
			this.addEvent();

		}


		public addEvent(): void {
			GameApp.LListener.on(ProtoCmd.map_CaiLiaoFubenPlane2, this, (jsonData) => {
				console.log(jsonData);
				// GameApp.GameEngine.curFuBenMsg = jsonData;
				GameApp.GameEngine.curFuBenMsg = null;
				GameApp.GameEngine.curFuBenMsg = {
					curNum: jsonData.KILLCNT,
					maxNum: jsonData.MAXCNT,
					fubenStr: "",
					item: jsonData.JiangLi
				}
				this.ui_Content.setData(jsonData)
				if (this.box_content.numChildren > 0) {
					this.box_content.removeChildren();
				}
				this.box_content.addChild(this.ui_Content);
				if (jsonData.KILLCNT >= jsonData.MAXCNT) {
					new scene.BattleRewardInfoV0Item().popup();
					this.leaveFuBen();
					return;
				}
			})
		}
		public leaveFuBen() {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_CaiLiaoFuBenLikai);
			lcp.send(pkt);
			GameApp.LListener.offCaller(ProtoCmd.map_CaiLiaoFubenPlane2, this);
		}

		public addLcpEvent() {

		}

		public destroy(isBool = true) {
			GameApp.LListener.offCaller(ProtoCmd.map_CaiLiaoFubenPlane2, this);
			this.destroy(true);
		}
		public addPlayer(obj): void {

		}

		/**
		 * 初始化
		 */
		public updateUI(): void {
			this.clearMonster();
			this.clearPlayer();
			// 更新怪物
			// 更新角色
			GameApp.SceneManager.updateSelfPlayer(this);
			// 更新地图
			this.updateMapInfo();
		}

		/**
		 * 刷新地图
		 */
		public updateMapInfo(): void {

		}

		public addDaoJu(obj: ProtoCmd.ItemBase): void {

			let itemUI = new view.compart.DaoJuWithNameItem();
			itemUI.setData(obj, EnumData.ItemInfoModel.SHOW_NONE);
			this.viw_0.selectedIndex = 0;
			for (let _ui of this.hbox_2._childs) {
				// 添加成功
				if ((_ui as view.scene.MonsterGroupInSceneV1Item).addItem(itemUI)) {
					// 拾取物品
					itemUI.on(Laya.UIEvent.CLICK, this, () => {
						let pkt = new ProtoCmd.MapItemEventPick();
						pkt.setValue('i64ItemID', obj.i64ItemID);
						pkt.setValue('wX', obj.mapX);
						pkt.setValue('wY', obj.mapY);
						lcp.send(pkt, this, (data) => {
							let cbpkt = new ProtoCmd.MapItemEventPick(data);
							if (cbpkt.getValue('btErrorCode') == 0) {
								TipsManage.showTips('拾取道具成功');
							}
						})
					});
					return
				}
			}

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
					case EnumData.emMonsterType._MON_TYPE_COLLECT_: case EnumData.emMonsterType._MON_TYPE_CITYGUARD_:
						monster = new view.scene.MonsterInSceneItemV15();
						break;
					case EnumData.emMonsterType._MON_TYPE_LITTLEBOSS_:
						monster = new view.scene.MonsterInSceneItemV1();
						break;
					case EnumData.emMonsterType._MON_TYPE_NORMAL_:
						monster = new view.scene.MonsterInSceneItemV0();
						break;
				}
				// monster = new view.scene.MonsterInSceneItemV0();
				monster.setData(obj);
			}
			// 配置表ID
			let configID = (obj as GameObject.Monster).feature.dwCretTypeId;
			// 判断是否是BOSS,最多三个BOSS
			let isBoss = SheetConfig.mydb_monster_tbl.getInstance(null).BOSS('' + configID);
			if (isBoss) {
				// 切换成BOSS模式
				this.viw_0.selectedIndex = isBoss;
				// 添加BOSS
				if (this.box_bossPos0.numChildren == 0) {
					this.box_bossPos0.addChild(monster)
				}
				else if (this.box_bossPos1.numChildren == 0) {
					this.box_bossPos1.addChild(monster);
				}
				else {
					this.box_bossPos2.addChild(monster);
				}
			}
			// 小怪根据模式添加
			else {
				// BOSS模式
				if (this.viw_0.selectedIndex) {
					this.hbox_0.addChild(monster);
				}
				// 小怪模式
				else {
					for (let _ui of this.hbox_2._childs) {
						// 添加成功
						if ((_ui as view.scene.MonsterGroupInSceneV1Item).addMonster(monster)) {
							return
						}
					}
					// 添加不成功创建后添加
					let ui_monsterGroup = new view.scene.MonsterGroupInSceneV1Item();
					ui_monsterGroup.addMonster(monster);
					this.hbox_2.addChild(ui_monsterGroup);
				}
			}
		}


		/**
		 * 清除所有怪物
		 */
		public clearMonster(): void {
			this.hbox_0.removeChildren();
			this.box_bossPos0.removeChildren();
			this.box_bossPos1.removeChildren();
			for (let i = 0; i < this.hbox_2.numChildren; i++) {
				if (i == 0) {
					(this.hbox_2.getChildAt(i) as view.scene.MonsterGroupInSceneV1Item).clearAllMonster();
				}
				else {
					(this.hbox_2.getChildAt(i) as view.scene.MonsterGroupInSceneV1Item).removeSelf();
				}
			}
		}

		public clearPlayer(): void {

		}
	}
}