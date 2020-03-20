/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleSkillItem extends ui.scene.BattleSkillItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public skillItemBase: ProtoCmd.stSkillLvlBase;
		public leftCDTime = 0;// 剩余的CD时间

		/**
		 * 进入CD 公共cd1秒
		 * @param cd 
		 */
		public showCD(cd = 1000) {
			if (this.skillItemBase) {
				this.img_mask.visible = true;
				if (this.leftCDTime > cd) { return }
				this.img_mask.height = 69;
				cd = Math.max(cd, this.leftCDTime);
				Laya.Tween.to(this.img_mask, { height: 0 }, (cd), null, Laya.Handler.create(this, () => {
					this.img_mask.visible = false;
					this.img_mask.height = 69;
				}), 0, true)
			}
		}


		public setData(index: number, skill: ProtoCmd.stSkillLvlBase = null) {
			this.img_mask.visible = false;
			this.img_mask.height = 69;
			this.skillItemBase = skill;
			this.box_mpNeed.visible = Boolean(skill);
			if (skill) {
				this.img_lock.visible = false;
				this.img_unlock.visible = false;
				this.ui_item.visible = true;
				// 耗蓝
				let cost = SheetConfig.mydb_magic_tbl.getInstance(null).CONSUMPTION_MANA(skill.configID);
				this.lab_needMP.text = 'X' + cost;
				this.ui_item.setData(skill.configID);
			}
			else {

				this.img_lock.visible = false;
				this.img_unlock.visible = true;
				this.ui_item.visible = false;
				this.img_num.skin = 'image/common/wuxue/font_' + index + '.png'
			}
		}

		/**
		 * 检查自己是否可以用
		 */
		public checkSelfCanUse() {
			if (this.skillItemBase) {
				let useMp = SheetConfig.mydb_magic_tbl.getInstance(null).CONSUMPTION_MANA(this.skillItemBase.configID);
				return (!this.img_mask.visible) && (this.leftCDTime <= 0) && GameApp.MainPlayer.ability.nowMP >= useMp;
			}
		}

		public addEvent() {
			// this.on(Laya.UIEvent.MOUSE_DOWN, this, () => {
			// 	touchBegin = true;
			// 	Laya.timer.once(3000, this, () => {
			// 		if (!touchBegin) {
			// 			Laya.timer.clear(this, aa)
			// 			return;
			// 		}
			// 		this.skillDes = new Skill_DesDialog();
			// 		if (!this['ui_skill' + i].skillConfigID) {
			// 			return;
			// 		}
			// 		this.skillDes.setData(this['ui_skill' + i].skillConfigID);
			// 		this.addChild(this.skillDes);
			// 		this.skillDes.anchorX = this.skillDes.anchorY = 0.5;
			// 		let x1 = this['ui_skill' + i].x + this['ui_skill' + i].width * 0.5;
			// 		let y1 = this['ui_skill' + i].y - this.skillDes.height * 0.5 + 14;
			// 		this.skillDes.x = x1;
			// 		this.skillDes.y = y1

			// 	})
			// })
			// this.on(Laya.UIEvent.MOUSE_OUT, this, () => {
			// 	// touchBegin = Laya.Browser.now();
			// 	if (touchBegin) {
			// 		touchBegin = false;
			// 		if (this.skillDes != null) {
			// 			// self.skillDes.parent.removeChild(self.skillDes);
			// 			this.skillDes.removeSelf();
			// 			this.skillDes = null;
			// 			return;
			// 		}
			// 	}
			// })
			// this.on(Laya.UIEvent.MOUSE_UP, this, () => {
			// 	// touchBegin = Laya.Browser.now();
			// 	if (touchBegin) {
			// 		touchBegin = false
			// 		if (this.skillDes != null) {
			// 			this.skillDes.removeSelf();
			// 			this.skillDes = null;
			// 			return;
			// 		}
			// 	}
			// })
			// 攻击，使用技能
			this.on(Laya.UIEvent.CLICK, this, () => {
				if (!this.checkSelfCanUse()) {
					TipsManage.showTips('技能无法使用');
					return
				}
				let targeter = GameApp.MainPlayer.findAttackTarget();
				if (targeter) {
					this.useSelf();
					// 进入公共CD
					BattleFuBenInfoV3Item.self.commonCd();
					// 进行攻击
					GameApp.MainPlayer.tryAttack(targeter, this.skillItemBase.skillid);
				}
				else {
					TipsManage.showTips('无攻击目标');
				}
			})
		}

		/**
		 * 使用自己
		 */
		public useSelf() {
			if (!this.checkSelfCanUse()) { return }
			let CD = SheetConfig.mydb_magic_tbl.getInstance(null).CD(this.skillItemBase.configID);
			this.leftCDTime = CD;
			this.showCD(CD);
			let cd = () => {
				this.leftCDTime -= 100;
				if (this.leftCDTime <= 0) {
					Laya.timer.clear(this, cd)
				}
			}
			Laya.timer.loop(100, this, cd)
		}
	}
}