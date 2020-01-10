/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_infoDiao_VS_info extends ui.wuXue.WuXue_infoDiao_VS_infoUI {
		public configID;
		constructor() {
			super();
			//  this.panel_inborn.vScrollBarSkin = '';
		}
		public setData(configID) {
			this.configID = configID;
			this.lab_effText.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEFFECT(configID);
			// GameApp.MainPlayer.comboTypeByPage;
			this.showCombo(configID);

			this.showTalent(configID)
			this.showBuff(configID)
			this.lab_explain.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_DESCRIPTION(configID);
			this.reSize();
		}
		public reSize() {
			this.img_combo.y = this.lab_effText.y + this.lab_effText.height + 10;
			this.panel_combo.y = this.img_combo.y + this.img_combo.height + 8;
			this.img_inborn.y = this.panel_combo.y + this.panel_combo.height + 10;
			this.panel_inborn.y = this.img_inborn.y + this.img_inborn.height + 8;
			this.box_buff.y = this.panel_inborn.y + this.panel_inborn.height + 10;
			this.img_explain.y = this.box_buff.y + this.box_buff.height + 10;
			this.lab_explain.y = this.img_explain.y + this.img_explain.height + 8;
			this.height = this.lab_explain.y + this.lab_explain.height + 10;


		}
		public showBuff(configID) {
			let BuffID = SheetConfig.mydb_magic_tbl.getInstance(null).BUFFID(configID);
			let BuffIDArr = BuffID.split('|');
			for (let i = 0; i < 4; i++) {
				this['buff_' + i].visible = false;
			}
			for (let i = 0; i < BuffIDArr.length; i++) {
				this['buff_' + i].visible = true;
				this['buff_' + i].setData(BuffIDArr[i])
			}
		}
		public showTalent(configID) {
			let Lv = SheetConfig.mydb_magic_tbl.getInstance(null).LEVEL(configID)
			let skill = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(configID)
			let num = SheetConfig.mydb_magic_tbl.getInstance(null).getNumOfSkillID(skill);
			let newBaseConfigID = skill * 100 + num;

			let talentID = SheetConfig.mydb_magic_tbl.getInstance(null).TALENTID(newBaseConfigID);
			if (talentID != '0') {
				let talentIDArr = talentID.split('`');
				for (let i = 0; i < talentIDArr.length; i++) {
					let talentName = SheetConfig.Martial_arts.getInstance(null).NAME(talentIDArr[i]);
					let talentContent = SheetConfig.Martial_arts.getInstance(null).DESCRIBE(talentIDArr[i]);
					let p = new Laya.Label();
					p.width = this.panel_inborn.width - 30
					p.height = 22;
					p.wordWrap = true;
					if (i < Lv) {
						p.color = '#e78782';
					} else {
						p.color = '#000000';
					}
					p.fontSize = 20;
					p.font = 'fzxk';
					p.text = '[' + talentName + ']' + talentContent;
					p.y = i * (p.height + 5);
					this.panel_inborn.addChild(p);
				}
			}
			if (this.panel_inborn.numChildren > 0) {
				let heightNum = this.panel_inborn.numChildren * 22 + (this.panel_inborn.numChildren - 1) * 5 + 10;
				this.panel_inborn.height = heightNum;
			} else {
				this.panel_inborn.height = -8;
				this.img_inborn.height = - 10
				this.panel_inborn.visible = false;
				this.img_inborn.visible = false;
			}


		}
		public showCombo(configID) {
			let curPageComboType = GameApp.MainPlayer.comboTypeByPage[GameApp.MainPlayer.taoluPageID];
			let comboID = SheetConfig.mydb_magic_tbl.getInstance(null).COMBINATION_SKILLSID(configID);
			if (comboID != '0') {
				let comboIdArr = comboID.split('`')
				for (let i = 0; i < comboIdArr.length; i++) {
					let key = parseInt(comboIdArr[i])
					if (key > 0) {
						let comboName = SheetConfig.Skill_combination.getInstance(null).NAME(key);
						let comboSkillID = SheetConfig.Skill_combination.getInstance(null).EFFECTID(key);
						let comboSkillIDNum = SheetConfig.Skill_combination.getInstance(null).SKILLID(key);
						let comboEff = SheetConfig.Skill_combination.getInstance(null).DESCRIBE(key);
						let isActive = false;
						for (let o in curPageComboType) {
							if (parseInt(o) == comboSkillID) {
								if (curPageComboType[o] >= comboSkillIDNum) {
									isActive = true;
								}
							}
						}
						let p = new Laya.Label();
						p.width = this.panel_combo.width - 30;
						p.height = 22;
						p.wordWrap = true;
						if (isActive) {
							p.color = '#e78782';
						} else {
							p.color = '#000000';
						}
						p.fontSize = 20;
						p.font = 'fzxk';
						p.text = '[' + comboName + ']' + comboEff;
						p.y = i * (p.height + 5);
						this.panel_combo.addChild(p);
					}
				}
			}
			if (this.panel_combo.numChildren > 0) {
				let num = this.panel_combo.numChildren * 22 + (this.panel_combo.numChildren - 1) * 5 + 10;
				this.panel_combo.height = num;
			} else {
				this.panel_combo.height = -8;
				this.img_combo.height =-10
				this.panel_combo.visible = false;
				this.img_combo.visible = false;
			}

		}
	}
}