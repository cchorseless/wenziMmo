/**Created by the LayaAirIDE*/
module view.compart {
	export class SceneItem extends ui.compart.SceneItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
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

			this.initSelfPlayer();
			this.addPlayer(null);
			this.addEvent();
			// this.killStatus();
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
		 * 初始化自己的角色
		 */
		public initSelfPlayer(): void {
			this.box_self.addChild(new view.compart.SelfPlayerInSceneItem());
		}

		/**
		 * 添加怪物
		 * @param obj 
		 */
		public addMonster(obj: GameObject.Creature): void {
			let monster: view.compart.MonsterInSceneItem = new view.compart.MonsterInSceneItem();
			monster.tempId = obj.tempId;
			let childNum = this.hbox_monster01.numChildren + this.hbox_monster02.numChildren + this.hbox_monster03.numChildren;
			let mod = childNum % 12;
			switch (Math.floor(mod / 4)) {
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
			console.log('addMonster==>当前场景内怪物数据' + (childNum + 1))
		}

		/**
		 * 移除怪物
		 * @param obj 
		 */
		public removeMonster(obj: GameObject.Creature): void {
			let find = false;
			for (let child of this.hbox_monster01._childs) {
				if (child.tempId == obj.tempId) {
					(child as view.compart.MonsterInSceneItem).removeSelf();
					find = true;
					break
				}
			}
			if (!find) {
				for (let child of this.hbox_monster02._childs) {
					if (child.tempId == obj.tempId) {
						(child as view.compart.MonsterInSceneItem).removeSelf();
						find = true;
						break
					}
				}
			}
			if (!find) {
				for (let child of this.hbox_monster03._childs) {
					if (child.tempId == obj.tempId) {
						(child as view.compart.MonsterInSceneItem).removeSelf();
						find = true;
						break
					}
				}
			}
			if (!find) {
				throw new Error('没有在视野中发现' + obj.tempId);
			}
			console.log('removeMonster==>当前场景内怪物数据' + (this.hbox_monster01.numChildren + this.hbox_monster02.numChildren + this.hbox_monster03.numChildren))
		}

		/**
		 * 添加玩家
		 * @param obj 
		 */
		public addPlayer(obj): void {
			for (let i = 0; i < 4; i++) {
				this.hbox_player01.addChild(new view.compart.OtherPlayerInSceneItem())
				this.hbox_player02.addChild(new view.compart.OtherPlayerInSceneItem())
			}

		}

		/**
		 * 移除玩家
		 * @param obj 
		 */
		public removePlayer(obj): void {

		}
		/**
		 * 攻击状态缓动
		 */
		public killStatus():void{
		// 	this.cek_mainKill.clickHandler = Laya.Handler.create(this, () => {
		// 		if (this.cek_mainKill.selected) {
		// 			Laya.Tween.to(this.box_killOpen, { scaleY: 0 }, 500, Laya.Ease.bounceOut);
		// 		}
		// 		else {
		// 			Laya.Tween.to(this.box_killOpen, { scaleY: 1 }, 500, Laya.Ease.bounceOut);
		// 		}
		// 	}, null, false);
		}


	}
}