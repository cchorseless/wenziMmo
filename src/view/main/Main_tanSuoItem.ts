/**Created by the LayaAirIDE*/
module view.main {
	export class Main_tanSuoItem extends ui.main.Main_tanSuoItemUI {
		static self: Main_tanSuoItem;
		constructor() {
			super();
			Main_tanSuoItem.self = this;
			
		}

		public addEvent() {

		}

		/**
		 * 切换 走房间 还是 技能
		 * @param mode 
		 */
		public changeMode(mode): void {
			this.viw_bottom.selectedIndex = mode;
		}



		public updateUI() {
			// let map: any = this.panel_0.getChildAt(0);
			// let img_selfOn: Laya.Image = map.img_selfOn;
			// let targgetBtn: Laya.Button = map['btn_' + GameApp.MainPlayer.roomId];
			// if (img_selfOn && targgetBtn) {
			//     img_selfOn.anchorX = img_selfOn.anchorY = 0.5;
			//     img_selfOn.width = targgetBtn.width;
			//     img_selfOn.height = targgetBtn.height;
			//     img_selfOn.pos(targgetBtn.x, targgetBtn.y)
			// }
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
						break;
						// 
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
		}


		/**
		 * 添加NPC
		 * @param obj 
		 */
		public addNpc(obj) {
			let npcIcon: view.npc.NpcIconItem = new view.npc.NpcIconItem();
			npcIcon.setData(obj);
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
	}
}