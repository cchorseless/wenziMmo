/**Created by the LayaAirIDE*/
module view.scene {
	export class SceneV1Item extends ui.scene.SceneV1ItemUI implements itf.SceneItem {
		constructor() {
			super();
		}

		public setData(): void {
			this.panel_0.vScrollBarSkin = '';
			this.panel_1.vScrollBarSkin = '';
			this.panel_2.hScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.vbox_1['sortItem'] = (items) => { };
			this.hbox_2['sortItem'] = (items) => { };

			let ui_monsterGroup = new view.scene.MonsterGroupInSceneItem();
			ui_monsterGroup.changeToBig();
			this.hbox_2.addChild(ui_monsterGroup);
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

		public addEvent(): void {
			EventManage.onWithEffect(this.btn_exit, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.FB_ChuMoLeave);
				lcp.send(pkt);
			});

			this.addLcpEvent();
		}

		public addLcpEvent() {
			GameApp.LListener.on(ProtoCmd.FB_ChuMoRightPlane, this, (jsonData: ProtoCmd.itf_FB_MainFBjindu) => {
				console.log(jsonData);
				this.lbl_leftTime.text = '' + jsonData.sec + '秒';
				this.lbl_tongGuanTiaoJian.text = '' + jsonData.tiaojian + '(' + jsonData.curcnt + '/' + jsonData.totalcnt + ')';
				if (this.vbox_0.numChildren > 0) {
					for (let i = 0; jsonData.item[i]; i++) {
						let itemBase = new ProtoCmd.ItemBase();
						let new_ui = new view.compart.DaoJuWithNameItem();
						new_ui.setData(itemBase);
						this.vbox_0.addChild(new_ui);
					}
				}
			})
		}

		public Dispose() {
			GameApp.LListener.offCaller(ProtoCmd.FB_ChuMoRightPlane, this);
			PopUpManager.Dispose(this);
		}


		public updateUI(): void {
			this.clearMonster();
			this.clearPlayer();
			// 更新怪物
			// 更新角色
			this.updateSelfPlayer();
			// 更新地图
			this.updateMapInfo();
		}

		/**
		 * 刷新地图
		 */
		public updateMapInfo(): void {

		}


		/**
  		* 刷新自己的角色
  		*/
		public updateSelfPlayer(): void {
			let selfPlayerUI: view.scene.PlayerInSceneItem = GameApp.MainPlayer.ui_item;
			if (selfPlayerUI == null) {
				let _uiItem = new view.scene.PlayerInSceneItem();
				_uiItem.setData(GameApp.MainPlayer);
				_uiItem.scale(0.8, 0.8);
				_uiItem.centerX = _uiItem.centerY = 0;
				this.box_self.addChild(_uiItem);
			}
			else {
				selfPlayerUI.updateUI();
				selfPlayerUI.scale(0.7, 0.7);
				selfPlayerUI.centerX = selfPlayerUI.centerY = 0;
				this.box_self.addChild(selfPlayerUI);
			}
		}

		/**
		 * 初始化弟子
		 */
		public updateDiziPlayer(): void {
			let _uiItem = new view.scene.PlayerInSceneItem();
			_uiItem.setData(GameApp.MainPlayer);
			_uiItem.scale(0.6, 0.6);
			this.box_dizi.addChild(_uiItem);
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
			// 配置表ID
			let configID = (obj as GameObject.Monster).feature.dwCretTypeId;
			// 判断是否是BOSS,最多两个BOSS
			let isBoss = SheetConfig.mydb_monster_tbl.getInstance(null).BOSS('' + configID);
			if (isBoss) {
				// 切换成BOSS模式
				this.viw_0.selectedIndex = isBoss;
				// 添加BOSS
				if (this.box_bossPos0.numChildren == 0) {
					this.box_bossPos0.addChild(monster);
				}
				else {
					this.box_bossPos1.addChild(monster);
				}
			}
			// 小怪根据模式添加
			else {
				// BOSS模式
				if (this.viw_0.selectedIndex) {
					if (this.vbox_0.numChildren == this.vbox_1.numChildren) {
						this.vbox_0.addChild(monster);
					}
					else {
						this.vbox_1.addChild(monster);
					}
				}
				// 小怪模式
				else {
					for (let _ui of this.hbox_2._childs) {
						// 添加成功
						if ((_ui as view.scene.MonsterGroupInSceneItem).addMonster(monster)) {
							return
						}
					}
					// 添加不成功创建后添加
					let ui_monsterGroup = new view.scene.MonsterGroupInSceneItem();
					ui_monsterGroup.addMonster(monster);
					this.hbox_2.addChild(ui_monsterGroup);
				}
			}




		}


		/**
		 * 清除所有怪物
		 */
		public clearMonster(): void {
			this.vbox_0.removeChildren();
			this.vbox_1.removeChildren();
			this.box_bossPos0.removeChildren();
			this.box_bossPos1.removeChildren();
			for (let i = 0; i < this.hbox_2.numChildren; i++) {
				if (i == 0) {
					(this.hbox_2.getChildAt(i) as view.scene.MonsterGroupInSceneItem).clearAllMonster();
				}
				else {
					(this.hbox_2.getChildAt(i) as view.scene.MonsterGroupInSceneItem).removeSelf();
				}
			}
		}


		public addPlayer(obj): void {
		}
		public clearPlayer(): void {
		}
	}
}