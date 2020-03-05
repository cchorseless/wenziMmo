/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_infoDiao_VS_info extends ui.wuXue.WuXue_infoDiao_VS_infoUI {
		public configID;
		constructor() {
			super();
			//  this.panel_inborn.vScrollBarSkin = '';
		}
		public setData(configID) {
			let cost = SheetConfig.mydb_magic_tbl.getInstance(null).CONSUMPTION_MANA(configID);
			this.lab_cost.text = cost + '';
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
			if (BuffID == '0') {
				this.box_buff.visible = false;
				return;
			}
			let BuffIDArr = BuffID.split('|');
			this.buff_0.visible = true;
			this.buff_0.setData(BuffIDArr[0], configID)
			for (let i = 0; i < 4; i++) {

			}
			let name = SheetConfig.mydb_magicbuff_tbl.getInstance(null).NAME(BuffIDArr[0]);
			this.lab_Name.text = name;
			let des = SheetConfig.mydb_magicbuff_tbl.getInstance(null).BUFFTIPS(BuffIDArr[0]);
			this.lab_des.text = des;
			let probability = SheetConfig.mydb_magicbuff_tbl.getInstance(null).BUFF_GAILV(BuffIDArr[0])
			this.lab_probability.text = (probability / 100) + '%';

			// this.lab_BuffName.text = name;
			// for (let i = 0; i < BuffIDArr.length; i++) {
			// 	this['buff_' + i].visible = true;
			// 	this['buff_' + i].setData(BuffIDArr[i])
			// }
		}
		public showTalent(configID) {
			let Lv = SheetConfig.mydb_magic_tbl.getInstance(null).LEVEL(configID)
			let skill = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(configID)
			let num = SheetConfig.mydb_magic_tbl.getInstance(null).getNumOfSkillID(skill);
			let newBaseConfigID = skill * 100 + num;

			let talentID = SheetConfig.mydb_magic_tbl.getInstance(null).TALENTID(newBaseConfigID);
			if (talentID != '0' && talentID) {
				let talentIDArr = talentID.split('`');
				for (let i = 0; i < talentIDArr.length; i++) {
					let talentName = SheetConfig.Martial_arts.getInstance(null).NAME(parseInt(talentIDArr[i]));
					let talentContent = SheetConfig.Martial_arts.getInstance(null).DESCRIBE(parseInt(talentIDArr[i]));
					let talentContentArr = talentContent.split('`');
					// let p = new laya.html.dom.HTMLDivElement()
					let p = new Laya.HTMLDivElement()
					p.width = this.panel_inborn.width - 30;
					p.style.fontSize = 22;
					p.style.bold = true;
					p.style.fontFamily = 'STKaiti';
					if (i < Lv) {
						// p.innerHTML = "<span style='color:#000000'>【" + talentName + '】</span>'
						// 	+ "<span style='color:#63491a'>" + talentContentArr[0] + '</span>'
						// 	+ "<span style='color:#38ad32'>" + talentContentArr[1] + '</span>'
						// 	+ "<span style='color:#63491a'>，突破</span>"
						// 	+ "<span style='color:#38ad32'>+" + (i + 1) + '</span>'
						// 	+ "<span style='color:#63491a'>激活</span>";

						p.innerHTML = "<span style='color:#000000'>【" + talentName + '】</span>'
							+ "<span style='color:#63491a'>" + talentContent + '</span>'
							+ "<span style='color:#63491a'>，突破</span>"
							+ "<span style='color:#38ad32'>+" + (i + 1) + '</span>'
							+ "<span style='color:#63491a'>激活</span>";
					} else {
						// p.innerHTML = "<span style='color:#777777'>【" + talentName + '】</span>'
						// 	+ "<span style='color:#777777'>" + talentContentArr[0] + '</span>'
						// 	+ "<span style='color:#777777'>" + talentContentArr[1] + '</span>'
						// 	+ "<span style='color:#777777'>，突破</span>"
						// 	+ "<span style='color:#777777'>+" + (i + 1) + '</span>'
						// 	+ "<span style='color:#777777'>激活</span>";
						p.innerHTML = "<span style='color:#777777'>【" + talentName + '】</span>'
							+ "<span style='color:#777777'>" + talentContent + '</span>'
							+ "<span style='color:#777777'>，突破</span>"
							+ "<span style='color:#777777'>+" + (i + 1) + '</span>'
							+ "<span style='color:#777777'>激活</span>";
					}
					p.y = i * (p.contextHeight + 5);
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
			this.panel_combo.height = 0;
			this.img_combo.height = 0;
			// let curPageComboType = GameApp.MainPlayer.comboTypeByPage[GameApp.MainPlayer.taoluPageID];
			// let comboID = SheetConfig.mydb_magic_tbl.getInstance(null).COMBINATION_SKILLSID(configID);
			// if (comboID != '0' && comboID) {
			// 	let comboIdArr = comboID.split('`')
			// 	for (let i = 0; i < comboIdArr.length; i++) {
			// 		let key = parseInt(comboIdArr[i])
			// 		if (key > 0) {
			// 			let comboName = SheetConfig.Skill_combination.getInstance(null).NAME(key);
			// 			let comboSkillID = SheetConfig.Skill_combination.getInstance(null).EFFECTID(key);
			// 			let comboSkillIDNum = SheetConfig.Skill_combination.getInstance(null).SKILLID(key);
			// 			let comboEff = SheetConfig.Skill_combination.getInstance(null).DESCRIBE(key);
			// 			let comboEffArr = comboEff.split('`');
			// 			let isActive = false;
			// 			for (let o in curPageComboType) {
			// 				if (parseInt(o) == comboSkillID) {
			// 					if (curPageComboType[o] >= comboSkillIDNum) {
			// 						isActive = true;
			// 					}
			// 				}
			// 			}
			// 			// let p = new laya.html.dom.HTMLDivElement()
			// 			let p = new Laya.HTMLDivElement()
			// 			p.width = this.panel_combo.width - 30;
			// 			p.style.fontSize = 22;
			// 			p.style.bold = true;
			// 			p.style.fontFamily = 'STKaiti';
			// 			if (isActive) {
			// 				p.innerHTML = "<span style='color:#000000'>【" + comboName + '】</span>'
			// 					+ "<span style='color:#63491a'>" + comboEffArr[0] + '</span>'
			// 					+ "<span style='color:#38ad32'>" + comboEffArr[1] + '</span>'
			// 					+ "<span style='color:#63491a'>" + comboEffArr[2] + '</span>';
			// 			} else {
			// 				p.innerHTML = "<span style='color:#777777'>【" + comboName + '】</span>'
			// 					+ "<span style='color:#777777'>" + comboEffArr[0] + '</span>'
			// 					+ "<span style='color:#777777'>" + comboEffArr[1] + '</span>'
			// 					+ "<span style='color:#777777'>" + comboEffArr[2] + '</span>';
			// 				// + "<span style='color:#777777'>" + comboEff + '</span>';
			// 			}
			// 			p.y = i * (p.contextHeight + 5);
			// 			this.panel_combo.addChild(p);
			// 		}
			// 	}
			// }
			// if (this.panel_combo.numChildren > 0) {
			// 	let num = this.panel_combo.numChildren * 22 + (this.panel_combo.numChildren - 1) * 5 + 10;
			// 	this.panel_combo.height = num;
			// } else {
			// 	this.panel_combo.height = -8;
			// 	this.img_combo.height = -10
			// 	this.panel_combo.visible = false;
			// 	this.img_combo.visible = false;
			// }
		}
	}
}