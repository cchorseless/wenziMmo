/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleFuBenInfoV3Item extends ui.scene.BattleFuBenInfoV3ItemUI {
		public static self: BattleFuBenInfoV3Item;
		public curTouchTaoLuID;// 当前套路ID
		public isAuto = false;
		public skillDes: Skill_DesDialog = null;

		public costMPArr = {};
		constructor() {
			super();
			BattleFuBenInfoV3Item.self = this;
			this.addEvent();
		}

		/**
		 * 跟新任务条件
		 */
		public showNeed(str: string) {
			this.html_need.innerHTML = str;
		}

		public setData() {
			// 异常状态
			this.img_cantSkill.visible = false;
			this.setView();
		}


		public setView() {
			let nowTaoLu = GameApp.MainPlayer.defaultTaoLuID;
			this.curTouchTaoLuID = nowTaoLu;
			// 套路切页
			for (let i = 0; i < 4; i++) {
				this['ui_cut' + i].setData(i);
				this['ui_cut' + i].setButton(i == nowTaoLu)
			}
			// 技能赋值
			for (let i = 1; i < 7; i++) {
				let key = nowTaoLu * 100 + i - 1;
				if (GameApp.MainPlayer.skillShotButton[key]) {
					let skill = GameApp.MainPlayer.skillShotButton[key].i64Id.int64ToNumber();
					let skillBase = GameApp.MainPlayer.skillInfo[skill + ''];
					this['ui_skill' + i].setData(i, skillBase);
				}
				else {
					this['ui_skill' + i].setData(i);
				}
			}

			this.changeMP(GameApp.MainPlayer.ability.nowMP, GameApp.MainPlayer.ability.nMaxMP)
		}

		/**
		 * 更改耗蓝
		 * @param curMP 
		 * @param maxMP 
		 */
		public changeMP(curMP, maxMP) {
			this.html_MP.style.fontFamily = 'STkaiti';
			this.html_MP.style.fontSize = 26;
			if (curMP < 1) {
				this.html_MP.innerHTML = "<span style='color:#8d8989;'>" + curMP + '</span>'
					+ "<span style='color:#000000;'>/" + maxMP + '</span>'
			} else {
				this.html_MP.innerHTML = "<span style='color:#bf4747;'>" + curMP + '</span>'
					+ "<span style='color:#000000;'>/" + maxMP + '</span>'
			}
		}

		public addEvent(): void {
			/**
			 * 离开副本
			 */
			EventManage.onWithEffect(this.btn_exit, Laya.UIEvent.CLICK, this, () => {
				if (main.Main_tanSuoItem.self.canLeave) {
					if (GameApp.MainPlayer.curFuBenID > 0) {
						main.Main_tanSuoItem.self.leaveFuBen();
					}
					PanelManage.Main.changeMode(0);
				}
				else {
					TipsManage.showTips('暂时不可退出副本')
				}
			})

			// 切换套路
			for (let i = 0; i < 4; i++) {
				this['ui_cut' + i].on(Laya.UIEvent.CLICK, this, () => {
					if (this.isAuto) {
						TipsManage.showTips('自动战斗中不能切换套路~');
					}
					else {
						if (i == this.curTouchTaoLuID) {
							return;
						}
						this.changeTab(i);
					}
				})
			}

			// 自动战斗
			this.btn_auto.on(Laya.UIEvent.CLICK, this, () => {
				this.isAuto = !this.isAuto;
				if (this.isAuto) {
					this.btn_auto.label = '手动';
					this.autoFight();
					Laya.timer.frameLoop(64, this, this.autoFight)
				}
				else {
					this.btn_auto.label = '自动';
				}
			});

			// 监听切换套路
			GameApp.LListener.on(view.wuXue.WuXue_Skill_Circle.skillAdd + '40', this, () => {
				if (GameApp.MainPlayer.skillShotButton[400]) {
					this.setView()
				}
			})

		}


		public destroy(isbool = true) {
			GameApp.LListener.offCaller(view.wuXue.WuXue_Skill_Circle.skillAdd + '40', this)
			super.destroy(true);
		}

		/**
		 * 自动战斗
		 */
		public autoFight() {
			// 自动战斗
			if (this.isAuto) {
				let targeter = GameApp.MainPlayer.findAttackTarget();
				if (targeter) {
					// 找技能
					let skillID = 999;
					for (let i = 1; i < 7; i++) {
						let ui_skill: BattleSkillItem = this['ui_skill' + i];
						if (ui_skill.checkSelfCanUse()) {
							skillID = ui_skill.skillItemBase.skillid;
							this['ui_skill' + i].useSelf();
							break
						}
					}
					// 公共CD
					this.commonCd();
					// 进行攻击
					GameApp.MainPlayer.tryAttack(targeter, skillID)
				}
			}
			else {
				Laya.timer.clear(this, this.autoFight)
			}
		}

		/**
		 * 公共CD
		 */
		public commonCd() {
			for (let i = 1; i < 7; i++) {
				// 公共CD
				this['ui_skill' + i].showCD();
			}
		}


		/**
		 * 切换套路
		 * @param id 
		 */

		public changeTab(id) {
			if (GameApp.MainPlayer.ability.nowMP >= 1) {
				let pkt1 = new ProtoCmd.AvatarSetSkillShortCutsEnDeCoder();
				pkt1.setValue('oldcol', 0);
				pkt1.setValue('oldrow', 4);
				pkt1.shortcuts.emShortCuts = 1;
				pkt1.shortcuts.i64Id = ProtoCmd.Int64.numberToInt64(id)
				pkt1.shortcuts.btCol = 0;
				pkt1.shortcuts.btRow = 4;
				lcp.send(pkt1);
			}
			else {
				TipsManage.showTips('当前能量不足，不能切换武学套路')
			}
		}


		public deBuffCantPlaySkill(time: number) {
			this.img_cantSkill.visible = true;
			this.btn_auto.mouseEnabled = false;
			Laya.timer.once(time * 1000, this, function () {
				this.img_cantSkill.visible = false;
				this.btn_auto.mouseEnabled = true;
			})
		}

	}
}