/**Created by the LayaAirIDE*/
module view.scene {
	export class SceneV3Item extends ui.scene.SceneV3ItemUI implements itf.SceneItem {
		constructor() {
			super();
			this.name = 'SceneV3Item';
		}
		public setData(): void {
			this.panel_monster.hScrollBarSkin = '';
			this.panel_player.hScrollBarSkin = '';
			this.hbox_monster['sortItem'] = (items) => { };
			this.hbox_player['sortItem'] = (items) => { };
			let ui_monsterGroup = new view.scene.MonsterGroupInSceneItem();
			this.hbox_monster.addChild(ui_monsterGroup);
			this.addEvent();
		}

		public addEvent(): void {
			// 场景信息界面
			EventManage.onWithEffect(this.box_sceneMore, Laya.UIEvent.CLICK, this, () => {
				new view.scene.SceneInfoDialog().setData().popup(true);
			});
			// 当前地图界面
			EventManage.onWithEffect(this.btn_worldMap, Laya.UIEvent.CLICK, this, () => { PanelManage.openNorthMapPanel() });
			// 自动战斗
			EventManage.onWithEffect(this.btn_autoAtk, Laya.UIEvent.CLICK, this, () => {
				this.btn_autoAtk.selected = !this.btn_autoAtk.selected;
				// 自动战斗
				if (this.btn_autoAtk) {
					GameApp.MainPlayer.startAutoAtk()
				}
				else {
					GameApp.MainPlayer.stopAutoAtk()
				}

			});
			// 变大变小
			// NPC竖条 展开缩放的动画
			EventManage.onWithEffect(this.btn_changSize, Laya.UIEvent.CLICK, this, () => {
				this.btn_changSize.selected = !this.btn_changSize.selected;
				if (this.btn_changSize.selected) {
					PanelManage.Main.showGroupNpcList(true);
					this.changeToBig();
				}
				else {
					PanelManage.Main.showGroupNpcList(false);
					this.changeToSmall();
				}
			})
		}

		/**
		 * 刷新界面
		 */
		public updateUI(): void {
			// 清除怪物
			this.clearMonster();
			// 清除其他玩家
			this.clearPlayer();
			// 更新角色
			this.updateSelfPlayer();
			// 更新地图
			this.updateMapInfo();
		}

		/**
		 * 展开
		 */
		public changeToBig(): void {
			Laya.Tween.to(this, { width: 640 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_player, { space: 50 }, 500, null, null, null, true);
			for (let item of this.hbox_monster._childs) {
				(item as view.scene.MonsterGroupInSceneItem).changeToBig();
			}
		}

		/**
		 * 缩小
		 */
		public changeToSmall(): void {
			Laya.Tween.to(this, { width: 545 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_player, { space: 5 }, 500, null, null, null, true);
			for (let item of this.hbox_monster._childs) {
				(item as view.scene.MonsterGroupInSceneItem).changeToSmall();
			}

		}

		/**
		 * 刷新自己的角色
		 */
		public updateSelfPlayer(): void {
			let selfPlayerUI: view.scene.PlayerInSceneItem = GameApp.MainPlayer.ui_item;
			if (selfPlayerUI == null) {
				let _uiItem = new view.scene.PlayerInSceneItem();
				_uiItem.setData(GameApp.MainPlayer);
				_uiItem.centerX = _uiItem.centerY = 0;
				this.box_self.addChild(_uiItem);
			}
			else {
				selfPlayerUI.updateUI();
				selfPlayerUI.centerX = selfPlayerUI.centerY = 0;
				this.box_self.addChild(selfPlayerUI);
			}
		}

		/**
		 * 初始化弟子
		 */
		public updateDiziPlayer(): void {
			let selfHero = GameApp.MainPlayer.curHero;
			// 判断自己有没有英雄
			if (selfHero) {
				let selfHeroUI: view.scene.HeroInSceneItem = selfHero.ui_item;
				if (selfHeroUI == null) {
					let _uiItem = new view.scene.HeroInSceneItem();
					_uiItem.setData(selfHero);
					// _uiItem.scale(0.8, 0.8);
					_uiItem.centerX = _uiItem.centerY = 0;
					this.box_diZi.addChild(_uiItem);
				}
				else {
					selfHeroUI.updateUI();
					// selfPlayerUI.scale(0.7, 0.7);
					selfHeroUI.centerX = selfHeroUI.centerY = 0;
					this.box_diZi.addChild(selfHeroUI);
				}
			}

		}

		/**
		 * 添加怪物
		 * @param obj 
		 */
		public addMonster(obj): void {
			let monster: view.scene.MonsterInSceneItem;
			if (obj.ui_item) {
				monster = obj.ui_item;
			}
			else {
				monster = new view.scene.MonsterInSceneItem();
				monster.setData(obj);
			}
			for (let _ui of this.hbox_monster._childs) {
				// 添加成功
				if ((_ui as view.scene.MonsterGroupInSceneItem).addMonster(monster)) {
					return
				}
			}
			// 添加不成功创建后添加
			let ui_monsterGroup = new view.scene.MonsterGroupInSceneItem();
			ui_monsterGroup.addMonster(monster);
			this.hbox_monster.addChild(ui_monsterGroup);
		}


		/**
		 * 添加英雄
		 */
		public addHero(obj: GameObject.Hero): void {
			let masterTempID = obj.feature.dwMasterTmpID;
			// 判断是否是自己
			if (masterTempID == GameApp.MainPlayer.tempId) {
				this.box_diZi.removeChildren();
				let ui_hero: view.scene.HeroInSceneItem = new view.scene.HeroInSceneItem();
				ui_hero.setData(obj);
				ui_hero.centerX = ui_hero.centerY = 0;
				this.box_diZi.addChild(ui_hero);
			}
			else {
				// 找到主人
				let masterObj = GameApp.MainPlayer.findViewObj(masterTempID, EnumData.CRET_TYPE.CRET_PLAYER);
				if (masterObj && masterObj.ui_item) {
					(masterObj.ui_item as view.scene.PlayerAndHeroInSceneV0Item).setHero(obj);
				}
			}
		}


		/**
		 * 清除所有怪物
		 */
		public clearMonster(): void {
			for (let i = 0; i < this.hbox_monster.numChildren; i++) {
				if (i == 0) {
					(this.hbox_monster.getChildAt(i) as view.scene.MonsterGroupInSceneItem).clearAllMonster();
				}
				else {
					(this.hbox_monster.getChildAt(i) as view.scene.MonsterGroupInSceneItem).removeSelf();
				}
			}
		}

		/**
		 * 添加玩家
		 * @param obj 
		 */
		public addPlayer(obj): void {
			let playerUI: view.scene.PlayerAndHeroInSceneV0Item = new view.scene.PlayerAndHeroInSceneV0Item();
			playerUI.setMaster(obj);
			// playerUI.scale(0.7, 0.7);
			this.hbox_player.addChild(playerUI);
		}


		/**
		 * 清除所有玩家
		 */
		public clearPlayer(): void {
			this.hbox_player.removeChildren();
		}

		/**
		 * 攻击状态模式缓动
		 */
		// public showBattleModel(isShow): void {
		// 	if (isShow) {
		// 		this.img_battleMode.visible = true;
		// 		Laya.Tween.to(this.img_battleMode, { scaleY: 1, scaleX: 1 }, 200);
		// 	}
		// 	else {
		// 		Laya.Tween.to(this.img_battleMode, { scaleY: 0, scaleX: 0 }, 200, null, Laya.Handler.create(this, () => { this.img_battleMode.visible = false }))
		// 	}
		// }

		/**
		 * 更新地图信息
		 */
		public updateMapInfo(): void {
			let roomId = GameApp.MainPlayer.roomId;
			// 房间名称
			this.lbl_roomName.text = '' + SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME('' + roomId);
			// 地图背景
			let bgRes = SheetConfig.mapRoomSheet.getInstance(null).SCENEPIC('' + roomId);
			this.img_bg.skin = 'image/common/scene/zdmap_icon_' + bgRes + '.png';
		}
	}
}