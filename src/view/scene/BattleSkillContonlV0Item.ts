/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleSkillContonlV0Item extends ui.scene.BattleSkillContonlV0ItemUI {
		constructor() {
			super();
			this.setData();
		}
		public skillID = [];
		public setData(): void {
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_show0.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_0.selectedIndex = 1;
			})
			this.btn_show1.on(Laya.UIEvent.CLICK, this, () => {
				this.viw_0.selectedIndex = 0;
			})
			for (let i = 1; i < 6; i++) {
				this['btn_kill' + i].on(Laya.UIEvent.CLICK, this, () => {
					let g = i - 1;
					if (this.skillID[g]) {
						// GameApp.MainPlayer.startHandAtk(GameApp.MainPlayer)
					}
				})
			}
		}
		public init_skillView(): void {
			this.skillID = [];
			let selfSkill = GameApp.MainPlayer.skillShotButton;
			let keys = Object.keys(selfSkill);
			for (let i = 1; i < 5; i++) {
				this['btn_kill' + i].skin = 'image/common/frame_ketianjia.png';
			}
			if (keys.length > 0) {
				for (let key of keys) {
					let showDetailID = (selfSkill[key]).i64Id.int64ToNumber();
					let configID = GameApp.MainPlayer.skillInfo[showDetailID.toString()].configID;
					let icon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(configID);
					this['btn_kill' + key].skin = "image/common/skill/skill_icon_" + icon + ".png";
					this.skillID.push(showDetailID);
				}
			}
			else {
				let defaultConfigID: string = GameApp.MainPlayer.default_skill;
				let defaulticon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(defaultConfigID);
				this.btn_kill1.skin = "image/common/skill/skill_icon_" + defaulticon + ".png";
				this.skillID = [defaultConfigID];
			}

		}
		/**
		 * 合击技能
		 */
		public init_hejiskillView(job): void {
			//合击技能
			let skillInfo = GameApp.MainPlayer.skillInfo;
			let index = '500' + job;
			let heji_icon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(skillInfo[index].configID)
			this.btn_kill5.skin = "image/common/skill/skill_icon_" + heji_icon + ".png";
		}
	}
}