/**Created by the LayaAirIDE*/
module view.scene {
	export class SceneV3Item extends ui.scene.SceneV3ItemUI implements itf.SceneItem {
		constructor() {
			super();
			this.top = this.bottom = this.right = 0;
			this.addEvent();
			this.name = 'SceneV3Item';
		}
		public setData(): void {
			this.panel_monster.hScrollBarSkin = '';
			this.panel_player.hScrollBarSkin = '';
			this.hbox_monster['sortItem'] = (items) => { };
			this.hbox_player['sortItem'] = (items) => { };
			let ui_monsterGroup = new view.scene.MonsterGroupInSceneItem();
			this.hbox_monster.addChild(ui_monsterGroup);
		}

		public addEvent(): void {
			// 场景信息界面
			// EventManage.onWithEffect(this.box_sceneMore, Laya.UIEvent.CLICK, this, () => {
			// 	new view.scene.SceneInfoDialog().setData().popup(true);
			// });
			//好友
			// EventManage.onWithEffect(this.btn_friend, Laya.UIEvent.CLICK, this, () => {
			// 	new view.main.Main_FriendListDialog().popup();
			// });
			// //活跃
			// EventManage.onWithEffect(this.btn_brisk, Laya.UIEvent.CLICK, this, () => {
			// 	new view.main.Main_BriskDialog().popup();
			// });
			// 当前地图界面
			// EventManage.onWithEffect(this.btn_worldMap, Laya.UIEvent.CLICK, this, () => { PanelManage.openNorthMapPanel() });
			// 自动战斗
			// EventManage.onWithEffect(this.btn_autoAtk, Laya.UIEvent.CLICK, this, () => {
			// 	this.btn_autoAtk.selected = !this.btn_autoAtk.selected;
			// 	// 自动战斗
			// 	if (this.btn_autoAtk) {
			// 		GameApp.MainPlayer.startAutoAtk()
			// 	}
			// 	else {
			// 		GameApp.MainPlayer.stopAutoAtk()
			// 	}
			// });
		}

		/**
		 * 刷新界面
		 */
		public updateUI(): void {
			console.log('刷新了' + this.name)
			// 清除怪物
			this.clearMonster();
			// 清除其他玩家
			this.clearPlayer();
			// 更新角色
			GameApp.SceneManager.updateSelfPlayer(this);
			// 更新地图
			this.updateMapInfo();
		}

		/**
		 * 展开
		 */
		public changeSelfSize(show): void {
			if (show) {
				Laya.Tween.to(this, { width: 640 }, 300, null, null, null, true);
				Laya.Tween.to(this.hbox_player, { space: 50 }, 300, null, null, null, true);
			}
			else {
				Laya.Tween.to(this, { width: 545 }, 300, null, null, null, true);
				Laya.Tween.to(this.hbox_player, { space: 5 }, 300, null, null, null, true);
			}
			for (let item of this.hbox_monster._childs) {
				(item as view.scene.MonsterGroupInSceneItem).changeSelfSize(show);
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
			this.hbox_player.addChild(playerUI);
			if (obj.curHero) {
				GameApp.SceneManager.addHero(obj.curHero)
			}
		}


		/**
		 * 清除所有玩家
		 */
		public clearPlayer(): void {
			this.hbox_player.removeChildren();
		}

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