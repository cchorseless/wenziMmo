/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleFuBenInfoV3Item extends ui.scene.BattleFuBenInfoV3ItemUI {
		public static CHANGETAOLU = 'changetaolu';
		public static self: BattleFuBenInfoV3Item;
		public curTouchTaoLuID;
		public unlockNeed = 30;

		public isAuto = false;

		public skillDes: Skill_DesDialog = null;


		public costMPArr = {};
		constructor() {
			super();
			BattleFuBenInfoV3Item.self = this;
			this.addEvent();

		}
		public showNeed(str: string) {
			console.log('showwwww' + str)
			this.html_need.innerHTML = str;
			console.log('needddddddddddd' + this.html_need.innerHTML)
		}
		public setData() {
			this.img_cantSkill.visible = false;
			let key = 400
			if (GameApp.MainPlayer.skillShotButton[key]) {
				GameApp.MainPlayer.defaultTaoLuID = GameApp.MainPlayer.skillShotButton[key].i64Id.int64ToNumber();
			} else {
				GameApp.MainPlayer.defaultTaoLuID = 0;
			}
			this.curTouchTaoLuID = GameApp.MainPlayer.defaultTaoLuID;

			this.setView();
		}
		public setView() {
			for (let i = 0; i < 4; i++) {
				// this.ui_cut0.setData(i)
				this['ui_cut' + i].setData(i);
				this['ui_cut' + i].setButton(i == GameApp.MainPlayer.defaultTaoLuID)
			}
			let myLv = GameApp.MainPlayer.level;
			// let unlockNum = Math.floor(myLv / this.unlockNeed);
			let unlockNum = 6;
			for (let i = 1; i < 7; i++) {
				if (i <= unlockNum) {
					let key = this.curTouchTaoLuID * 100 + i - 1
					if (GameApp.MainPlayer.skillShotButton[key]) {
						let skill = GameApp.MainPlayer.skillShotButton[key].i64Id.int64ToNumber();
						let skillBase = GameApp.MainPlayer.skillInfo[(skill + '')];
						this['ui_skill' + i].setData(true, i, skillBase)
					} else {
						this['ui_skill' + i].setData(true, i)
					}
				} else {
					this['ui_skill' + i].setData(false, i)
				}
			}
			this.changeMP(GameApp.MainPlayer.ability.nowMP, GameApp.MainPlayer.ability.nMaxMP)
		}
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
			let self = this;
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
			for (let i = 0; i < 4; i++) {
				this['ui_cut' + i].on(Laya.UIEvent.CLICK, this, function () {
					if (this.isAuto) {
						TipsManage.showTips('自动战斗中不能切换套路~');
					} else {
						if (i == this.curTouchTaoLuID) {
							return;
						}
						this.changeTab(i);
					}

				})
			}
			for (let i = 1; i < 7; i++) {
				let touchBegin = false;
				this['ui_skill' + i].on(Laya.UIEvent.MOUSE_DOWN, this, function () {
					// touchBegin = Laya.Browser.now();
					touchBegin = true;
					Laya.timer.once(3000, self, function aa() {
						if (!touchBegin) {
							Laya.timer.clear(this, aa)
							return;
						}
						self.skillDes = new Skill_DesDialog();
						if (!self['ui_skill' + i].skillConfigID) {
							return;
						}
						self.skillDes.setData(self['ui_skill' + i].skillConfigID);
						self.addChild(self.skillDes);
						self.skillDes.anchorX = self.skillDes.anchorY = 0.5;
						let x1 = self['ui_skill' + i].x + self['ui_skill' + i].width * 0.5;
						let y1 = self['ui_skill' + i].y - self.skillDes.height * 0.5 + 14;
						self.skillDes.x = x1;
						self.skillDes.y = y1

					})
				})
				this['ui_skill' + i].on(Laya.UIEvent.MOUSE_OUT, this, function () {
					// touchBegin = Laya.Browser.now();
					if (touchBegin) {
						touchBegin = false;
						if (self.skillDes != null) {
							// self.skillDes.parent.removeChild(self.skillDes);
							self.skillDes.removeSelf();
							self.skillDes = null;
							return;
						}
					}
				})
				this.on(Laya.UIEvent.MOUSE_UP, this, function () {
					// touchBegin = Laya.Browser.now();
					if (touchBegin) {

						touchBegin = false
						if (self.skillDes != null) {
							self.skillDes.removeSelf();
							self.skillDes = null;
							return;
						}
					}
				})

				this['ui_skill' + i].on(Laya.UIEvent.CLICK, this, function () {
					if (touchBegin) {
						touchBegin = false;
						if (self.skillDes != null) {
							// self.skillDes.parent.removeChild(self.skillDes);
							self.skillDes.removeSelf();
							self.skillDes = null;
							// return;
						}
					}
					if (!this.isAuto) {
						if (this['ui_skill' + i].isCD) {
							TipsManage.showTips('技能CD中~');
						} else {
							if (!self['ui_skill' + i].skillConfigID) {
								return;
							}
							let costMP = SheetConfig.mydb_magic_tbl.getInstance(null).CONSUMPTION_MANA(self['ui_skill' + i].skillConfigID);
							if (costMP <= GameApp.MainPlayer.ability.nowMP) {
								for (let o in GameApp.MainPlayer.allMonster) {
									GameApp.MainPlayer.startHandAtk0(GameApp.MainPlayer.allMonster[o], self['ui_skill' + i].skillID);
									return;
								}
							} else {
								TipsManage.showTips('能量值不足，无法释放~');
							}

						}
					} else {
						if (this['ui_skill' + i].isCD) {
							TipsManage.showTips('技能CD中，无法释放~');
						} else {
							TipsManage.showTips('自动战斗中，无法主动释放~');
						}
					}
				})
			}
			this.btn_auto.on(Laya.UIEvent.CLICK, this, function () {
				this.isAuto = !this.isAuto;
				if (this.isAuto) {
					this.btn_auto.label = '手动';

				} else {
					this.btn_auto.label = '自动';
				}
				this.autoFight();
			})
			GameApp.LListener.on(BattleFuBenInfoV3Item.CHANGETAOLU, this, function () {
				if (GameApp.MainPlayer.skillShotButton[400]) {
					GameApp.MainPlayer.defaultTaoLuID = GameApp.MainPlayer.skillShotButton[400].i64Id.int64ToNumber();
					this.curTouchTaoLuID = GameApp.MainPlayer.defaultTaoLuID;
					this.setView()
				}


			})
			//最大和当前蓝量
			// GameApp.MainPlayer.ability.nMaxMP;
			// GameApp.MainPlayer.ability.nowMP;
		}
		public stopAuto() {
			this.isAuto = false;
			if (this.isAuto) {
				this.btn_auto.label = '手动';

			} else {
				this.btn_auto.label = '自动';
			}
			this.autoFight();
		}
		public startAuto() {
			this.isAuto = true;
			if (this.isAuto) {
				this.btn_auto.label = '手动';

			} else {
				this.btn_auto.label = '自动';
			}
			this.autoFight();
		}
		public autoFight() {
			let self = this;
			// let costMPArr = {};
			Laya.timer.loop(1000, self, fight)
			function fight() {
				if (self.isAuto) {
					// GameApp.MainPlayer.startHandAtk0(GameApp.MainPlayer.allMonster[o], self.useSkillID[self.skillState[i].id]);
					for (let i = 1; i < 5; i++) {
						if (self['ui_skill' + i].skillConfigID > 0) {
							this.costMPArr[i] = SheetConfig.mydb_magic_tbl.getInstance(null).CONSUMPTION_MANA(self['ui_skill' + i].skillConfigID);
						}
					}
					self.doFight();
				} else {
					Laya.timer.clear(self, fight)
				}
			}
		}
		public doFight() {
			let self = this;
			let costID = this.chooseSkillIDForFight();
			let costNum = this.costMPArr[costID]
			if (GameApp.MainPlayer.ability.nowMP > costNum) {
				for (let o in GameApp.MainPlayer.allMonster) {
					GameApp.MainPlayer.startHandAtk0(GameApp.MainPlayer.allMonster[o], self['ui_skill' + costID].skillID);
					return;
				}
			} else {
				delete (this.costMPArr[costID])
				delete this.costMPArr[costID];
				if (Object.keys(this.costMPArr).length == 0) {
					for (let o in GameApp.MainPlayer.allMonster) {
						GameApp.MainPlayer.startHandAtk0(GameApp.MainPlayer.allMonster[o]);
						return;
					}
				} else {
					this.doFight();
				}
			}
		}
		public chooseSkillIDForFight() {
			let keys = Object.keys(this.costMPArr);
			let cost = GameUtil.numberRandInt(0, keys.length);
			return keys[cost]
		}
		public changeTab(id) {
			if (GameApp.MainPlayer.ability.nowMP >= 1) {
				let pkt1 = new ProtoCmd.AvatarSetSkillShortCutsEnDeCoder();
				pkt1.setValue('oldcol', 0);
				pkt1.setValue('oldrow', 4);
				pkt1.shortcuts.emShortCuts = 1;
				let skill = 100 + id;
				pkt1.shortcuts.i64Id = ProtoCmd.Int64.numberToInt64(id)
				pkt1.shortcuts.btCol = 0;
				pkt1.shortcuts.btRow = 4;
				lcp.send(pkt1);
			} else {
				TipsManage.showTips('当前能量不足，不能切换武学套路')
			}
		}
		public allSkillCD() {
			for (let i = 1; i < 7; i++) {
				this['ui_skill' + i].showCD(1);
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