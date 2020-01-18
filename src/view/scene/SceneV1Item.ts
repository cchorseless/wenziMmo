/**Created by the LayaAirIDE*/
module view.scene {
	export class SceneV1Item extends ui.scene.SceneV1ItemUI {
		public ui_Content: BattleFuBenInfoV1Item
		constructor() {
			super();
		}
		//心魔
		public setData(): void {
			this.ui_Content = new BattleFuBenInfoV1Item();
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

			this.addEvent();

		}

		public changeBelong(name){
			this.lbl_guiShu.text =name;
		}
		public addEvent(): void {
			GameApp.LListener.on(ProtoCmd.BossBelong,this,function(name){
				this.changeBelong(name)
			})
			GameApp.LListener.on(ProtoCmd.UPDATE_BOSSHP, this, (jsonData) => {
				this.lab_hp.text = jsonData.now + '/' + jsonData.max;
				this.img_xueTiao.width = this.img_xueTiao_BG.width * (jsonData.now / jsonData.max)
			})
			GameApp.LListener.on(ProtoCmd.GeRenBoss_FB_Info, this, (jsonData) => {
				console.log(jsonData);
				// flag 0未通关  1通关
				GameApp.GameEngine.curFuBenMsg = null;
				if (jsonData.flag == 0) {
					GameApp.GameEngine.curFuBenMsg = {
						curNum: 1,
						maxNum: 1,
						fubenStr: "击杀怪物",
						item: jsonData.item
					}
					this.ui_Content.setData(jsonData, 1)
					if (this.box_content.numChildren > 0) {
						this.box_content.removeChildren();
					}
					this.box_content.addChild(this.ui_Content);
					new scene.BattleRewardInfoV0Item().popup();
				} else {
					GameApp.GameEngine.curFuBenMsg = {
						curNum: 0,
						maxNum: 1,
						fubenStr: "击杀怪物",
						item: jsonData.item
					}
					this.ui_Content.setData(jsonData, 0)
					if (this.box_content.numChildren > 0) {
						this.box_content.removeChildren();
					}
					this.box_content.addChild(this.ui_Content);
				}


			})
		}

		public leaveFuBen() {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_GeRenBoss_Leave);
			lcp.send(pkt);
			GameApp.LListener.offCaller(ProtoCmd.GeRenBoss_FB_Info, this);
		}

		public addLcpEvent() {

		}

		public destroy(isBool = true) {
			GameApp.LListener.offCaller(ProtoCmd.GeRenBoss_FB_Info, this);
			super.destroy(true)
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
								itemUI.lbl_itemName.text = '';
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
			this.box_bossInfo.visible = false;
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
				this.box_bossInfo.visible = true;
				let iconID = SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE('' + configID);
				this.ui_Boss.img_icon.skin = 'image/common/npc/npc_icon_' + iconID + '.png';
				this.viw_0.selectedIndex = isBoss;
				this.lbl_guiShu.text =obj.feature.dwMasterTmpID;
				this.lbl_xuetiaoCount.text = 'x1'
				this.lab_hp.text = obj.ability.nowHP + '/' + obj.ability.nMaxHP
				this.img_xueTiao.width = this.img_xueTiao_BG.width * (obj.ability.nowHP / obj.ability.nMaxHP)
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