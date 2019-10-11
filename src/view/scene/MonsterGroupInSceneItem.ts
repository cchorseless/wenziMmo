/**Created by the LayaAirIDE*/
module view.scene {
	export class MonsterGroupInSceneItem extends ui.scene.MonsterGroupInSceneItemUI {
		constructor() {
			super();
			// this.anchorX = this.anchorY = 0.5
			// this.scaleY = -1;
		}
		/**
		 * 展开
		 */
		public changeToBig(): void {
			Laya.Tween.to(this, { width: 640 }, 500, Laya.Ease.bounceOut);
			Laya.Tween.to(this.hbox_0, { space: 19 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_1, { space: 23 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_2, { space: 31 }, 500, null, null, null, true);
		}

		/**
		 * 缩小
		 */
		public changeToSmall(): void {
			Laya.Tween.to(this, { width: 545 }, 500, Laya.Ease.bounceOut);
			Laya.Tween.to(this.hbox_0, { space: 0 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_1, { space: 0 }, 500, null, null, null, true);
			Laya.Tween.to(this.hbox_2, { space: 0 }, 500, null, null, null, true);
		}


		/**
		 * 添加怪物
		 * @param obj 
		 */
		public addMonster(monster: view.scene.MonsterInSceneItem): boolean {
			// 优先添加BOX_ONLY
			if (this.box_only.visible && this.box_only.numChildren == 0) {
				monster.scale(1.5, 1.5);
				monster.centerY = 0;
				monster.centerX = 0;
				this.box_only.addChild(monster);
				return true
			}
			else {
				this.box_only.visible = false;
				if (this.box_only.numChildren == 1) {
					let _monsterItem = this.box_only.getChildAt(0).removeSelf() as view.scene.MonsterInSceneItem;
					this.addMonster(_monsterItem);
				}
			}


			for (let i = 0; i < 12; i++) {
				if (this['box_' + i].numChildren == 0) {
					// 第一排
					if (i < 3) {
						monster.scale(0.7, 0.7);
					}
					// 第二排
					else if (i >= 3 && i < 7) {
						monster.scale(0.6, 0.6);
					}
					// 第三排
					else {
						monster.scale(0.5, 0.5);
					}
					monster.centerY = 0;
					monster.centerX = 0;
					this['box_' + i].addChild(monster);
					return true
				}
			}
		}
		/**
		 * 清除所有怪物
		 */
		public clearAllMonster(): void {
			this.box_only.removeChildren();
			this.box_only.visible = true;
			for (let i = 0; i < 12; i++) {
				(this['box_' + i] as Laya.Box).removeChildren();
			}
		}
	}
}