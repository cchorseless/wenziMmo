/**Created by the LayaAirIDE*/
module view.compart {
	export class SceneItem extends ui.compart.SceneItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.vbox_all['sortItem'] = (items) => { };
			this.panel_monster.hScrollBarSkin = '';
			this.panel_player.hScrollBarSkin = '';
			this.hbox_monster01['sortItem'] = (items) => { };
			this.hbox_monster02['sortItem'] = (items) => { };
			this.hbox_monster03['sortItem'] = (items) => { };
			this.hbox_player01['sortItem'] = (items) => { };
			this.hbox_player02['sortItem'] = (items) => { };
			this.panel_monster.left = 0;
			this.panel_player.left = 0;
			this.hbox_monster01.space = 1;
			this.hbox_monster02.space = 1;
			this.hbox_monster03.space = 1;
			this.hbox_player01.space = 1;
			this.hbox_player02.space = 1;
			this.addEvent();
		}

		public addEvent(): void {

		}

		/**
		 * 展开
		 */
		public changeToBig(): void {
			Laya.Tween.to(this, { left: 5 }, 500, Laya.Ease.bounceOut);
			Laya.Tween.to(this.panel_player, { left: 10 }, 500, null, null, null, true);
			Laya.Tween.to(this.panel_monster, { left: 10 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_monster01, { space: 30 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_monster02, { space: 30 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_monster03, { space: 30 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_player01, { space: 30 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_player02, { space: 30 }, 500, null, null, null, true);
		}

		/**
		 * 缩小
		 */
		public changeToSmall(): void {
			Laya.Tween.to(this, { left: 115 }, 500, Laya.Ease.bounceOut);
			Laya.Tween.to(this.panel_player, { left: 0 }, 500, null, null, null, true);
			Laya.Tween.to(this.panel_monster, { left: 0 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_monster01, { space: 1 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_monster02, { space: 1 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_monster03, { space: 1 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_player01, { space: 1 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_player02, { space: 1 }, 500, null, null, null, true);
		}

		/**
		 * 添加怪物
		 * @param obj 
		 */
		public addMonster(obj): void {
			let monster: view.compart.MonsterInSceneItem = new view.compart.MonsterInSceneItem();
			let childNum = this.hbox_monster01.numChildren + this.hbox_monster02.numChildren + this.hbox_monster03.numChildren;
			while (childNum >= 4) {
				childNum = childNum % 4;
			}
			switch (childNum) {
				case 0:
				case 3:
					this.hbox_monster01.addChild(monster);
					break;
				case 1:
					this.hbox_monster02.addChild(monster);
					break;
				case 2:
					this.hbox_monster03.addChild(monster);
					break;
				default:
					this.hbox_monster01.addChild(monster);
			}
		}
		/**
		 * 移除怪物
		 * @param obj 
		 */
		public removeMonster(obj): void {

		}
		/**
		 * 添加玩家
		 * @param obj 
		 */
		public addPlayer(obj): void {

		}

		/**
		 * 移除玩家
		 * @param obj 
		 */
		public removePlayer(obj): void {

		}


	}
}