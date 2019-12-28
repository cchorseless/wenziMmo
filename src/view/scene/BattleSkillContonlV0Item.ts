/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleSkillContonlV0Item extends ui.scene.BattleSkillContonlV0ItemUI {
		// public isAuto = false;
		public skillState = [
			{ id: 1, state: 1 },
			{ id: 2, state: 1 },
			{ id: 3, state: 1 },
			{ id: 4, state: 1 },
			{ id: 5, state: 1 }]
		public useSkillID: { [index: number]: any } = {};
		public autoFight: boolean = false;;
		constructor() {
			super();
			this.setData();
		}
		public skillID = [];
		public setData(): void {
			this.addEvent();
			// this.init_skillView()
		}
		public addEvent(): void {
			this.btn_show0.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_0.selectedIndex = 1;
			})
			this.btn_show1.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_0.selectedIndex = 0;
			})
			this.btn_autoAttack.on(Laya.UIEvent.CLICK, this, function () {
				// this.isAuto = !this.isAuto;
				this.startAuto()
			})
			this.btn_autoAttack1.on(Laya.UIEvent.CLICK, this, function () {
				// this.isAuto = !this.isAuto;
				this.startAuto()
			})
			for (let i = 1; i < 6; i++) {
				this['btn_kill' + i].on(Laya.UIEvent.CLICK, this, () => {
					for (let o = 0; o < this.skillState.length; o++) {
						if (this.skillState[o].id == i) {
							if (this.skillState[o].state == 0) {
								TipsManage.showTips("技能还在CD中")
							} else {
								if (this.useSkillID[i]) {
									for (let o in GameApp.MainPlayer.allMonster) {
										this.autoFight = false
										GameApp.MainPlayer.startHandAtk0(GameApp.MainPlayer.allMonster[o], this.useSkillID[i]);
										break;
									}
								}
							}
						}
					}
				})
			}
		}
		public upDateSkillView(id) {
			// let keys = Object.keys(this.useSkillID);
			for (let i in this.useSkillID) {
				if (id == this.useSkillID[i]) {
					this.skillCDShow(i, id);
				}
			}
		}
		public skillCDShow(touchSkillBtnID, skillConfigID) {
			let configID = GameApp.MainPlayer.skillInfo[skillConfigID.toString()].configID;
			// let cd = SheetConfig.mydb_magic_tbl.getInstance(null).ATTACK_INTERVAL(configID);
			let cd = 5
			this['btn_kill' + touchSkillBtnID].gray = true;
			for (let i = 0; i < this.skillState.length; i++) {
				if (this.skillState[i].id == touchSkillBtnID) {
					this.skillState[i].state = 0;
				}
			}
			Laya.timer.once(cd * 1000, this, function () {
				this['btn_kill' + touchSkillBtnID].gray = false;
				for (let i = 0; i < this.skillState.length; i++) {
					if (this.skillState[i].id == touchSkillBtnID) {
						this.skillState[i].state = 1;
					}
				}
			})
		}
		public startAuto() {
			this.autoFight = !this.autoFight;
			if (this.autoFight) {
				this.btn_autoAttack.selected = true;
				this.btn_autoAttack1.selected = true;
			} else {
				this.btn_autoAttack.selected = false;
				this.btn_autoAttack1.selected = false;
			}
			let self = this;
			Laya.timer.loop(1000, self, fight)
			function fight() {
				if (self.autoFight) {
					for (let i = 0; i < self.skillState.length; i++) {
						if (self.skillState[i].state == 1) {
							if (self.useSkillID[self.skillState[i].id]) {
								for (let o in GameApp.MainPlayer.allMonster) {
									GameApp.MainPlayer.startHandAtk0(GameApp.MainPlayer.allMonster[o], self.useSkillID[self.skillState[i].id]);
									return;
								}
							}
						}
					}
				} else {
					Laya.timer.clear(self, fight)
				}

			}

		}
		public init_skillView(): void {
			this.skillID = [];
			this.useSkillID = {};
			let selfSkill = GameApp.MainPlayer.skillShotButton;
			let keys = Object.keys(selfSkill);
			for (let i = 1; i < 5; i++) {
				this['btn_kill' + i].skin = 'image/common/frame_ketianjia.png';
			}
			if (keys.length > 0) {
				for (let key of keys) {
					if (parseInt(key) > 5) {
						return;
					}
					let showDetailID = (selfSkill[key]).i64Id.int64ToNumber();
					if (GameApp.MainPlayer.skillInfo[showDetailID.toString()]) {
						let configID = GameApp.MainPlayer.skillInfo[showDetailID.toString()].configID;
						let icon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(configID);
						this['btn_kill' + key].skin = "image/common/skill/skill_icon_" + icon + ".png";
						this.skillID.push(showDetailID);
						this.useSkillID[key] = showDetailID;
					}
				}
				// let defaulticon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(defaultConfigID);
				// this.btn_kill5.skin = "image/common/skill/skill_icon_" + id + ".png";
				// this.useSkillID[5] = id;
			}
			else {
				let defaultConfigID: string = GameApp.MainPlayer.default_skill;
				// let defaulticon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(defaultConfigID);
				// let id = ['20001', '20065', '20017'][GameApp.MainPlayer.job - 1];
				// this.btn_kill1.skin = "image/common/skill/skill_icon_" + defaulticon + ".png";
				this.skillID = [defaultConfigID];
				// this.useSkillID[1] = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(defaultConfigID);
				// this.useSkillID[1] = defaulticon;
			}

		}
		/**
		 * 合击技能
		 */
		public init_hejiskillView(job): void {
			//合击技能
			let skillInfo = GameApp.MainPlayer.skillInfo;
			if (parseInt(job) > 0) {
				let index = '500' + job;
				if (skillInfo[index]) {
					let heji_icon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(skillInfo[index].configID)
					this.btn_kill5.skin = "image/common/skill/skill_icon_" + heji_icon + ".png";
				}
			} else {
				this.btn_kill5.skin = 'image/common/frame_ketianjia.png';
			}
		}
	}
}