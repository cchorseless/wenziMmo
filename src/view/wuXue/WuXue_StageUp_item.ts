/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_StageUp_item extends ui.wuXue.WuXue_StageUp_itemUI {
		public configID;
		public skillID;
		public skillBase;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(configID) {
			this.configID = configID;
			this.lab_effText.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEFFECT(configID);
			this.box_else.y = this.lab_effText.y + this.lab_effText.height + 5;
			let cost = SheetConfig.mydb_magic_tbl.getInstance(null).CONSUMPTION_MANA(configID);
			this.height = this.box_else.y + this.box_else.height;
			this.lab_cost.text = cost + '';

			let skillID = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(configID);
			this.skillID = skillID;
			//当前品质下有几个阶段
			let stageNum = SheetConfig.mydb_magic_tbl.getInstance(null).getNumOfSkillID(skillID);
			//单个技能base
			let skillBaes = GameApp.MainPlayer.skillInfo[skillID];
			this.skillBase = skillBaes;
			//当前阶数
			let curStage = skillBaes.level;
			this.html_tianfu.style.fontFamily = 'STKaiti';
			this.html_tianfu.style.fontSize = 26;
			//当前伤害系数
			let curFightK_Value = SheetConfig.mydb_magic_tbl.getInstance(null).ATTACK_DAMAGE(configID);
			if (skillID == 999 || skillID == 1000) {
				this.box_had.visible = true;
				this.box_max.visible = true;
				this.box_notMax.visible = false;
				this.box_hasnot.visible = false;
				this.showNotFullName(this.html_maxStage, curStage);
				this.html_tianfu.innerHTML = "<span style='color:#bf4747;'>无下阶天赋</span>"
				this.lab_curLV.text = 'Lv.' + (curStage * 15);
				this.lab_k_curValue.text = curFightK_Value + '';
			} else {

				//未满级
				if (curStage < stageNum) {
					let nextConfigID = parseInt(configID) + 1;
					this.box_had.visible = false;
					this.box_max.visible = false;
					this.box_notMax.visible = true;
					this.box_hasnot.visible = true;
					this.lab_nextLV.text = 'LV.' + ((curStage + 1) * 15);
					this.showNotFullName(this.html_curStage, curStage);
					this.showNotFullName(this.html_nextStage, curStage + 1);
					let nextFightK_Value = SheetConfig.mydb_magic_tbl.getInstance(null).ATTACK_DAMAGE(nextConfigID);
					this.lab_k_nextValue.text = nextFightK_Value + '';

					let costItemID0 = SheetConfig.mydb_magic_tbl.getInstance(null).ITEM_ID(configID);
					let costItemNum0 = SheetConfig.mydb_magic_tbl.getInstance(null).NUMBER(configID);
					let hasNum0 = GameUtil.findItemInBag(parseInt(costItemID0), GameApp.GameEngine.bagItemDB)
					let costItemID1 = SheetConfig.mydb_magic_tbl.getInstance(null).ITEM_ID2(configID);
					let costItemNum1 = SheetConfig.mydb_magic_tbl.getInstance(null).NUMBER2(configID);
					let hasNum1 = GameUtil.findItemInBag(costItemID1, GameApp.GameEngine.bagItemDB)
					this.ui_need0.setData(costItemID0, costItemNum0, hasNum0);
					this.ui_need1.setData(costItemID1, costItemNum1, hasNum1);
					if (skillBaes.subLevel < (curStage * 15)) {
						this.lab_needLV.color = '#bf4747';
					} else {
						this.lab_needLV.color = '#38ad32';
					}
					this.lab_needLV.text = 'Lv.' + (curStage * 15);
					//下一阶的天赋ID
					let talentID = SheetConfig.mydb_magic_tbl.getInstance(null).TALENTID(parseInt(configID) + 1);
					//天赋名
					let talentName;
					let useTalentArr = talentID.split('`');
					let useTalentID = useTalentArr[(useTalentArr.length - 1)];
					if (useTalentID != '0') {
						talentName = SheetConfig.Martial_arts.getInstance(null).NAME(parseInt(talentID));
					}
					this.html_tianfu.innerHTML = "<span style='color:#bf4747;'>【" + talentName + "】</span>"

				} else {
					this.box_had.visible = true;
					this.box_max.visible = true;
					this.box_notMax.visible = false;
					this.box_hasnot.visible = false;
					this.showNotFullName(this.html_maxStage, curStage);
					this.html_tianfu.innerHTML = "<span style='color:#bf4747;'>无下阶天赋</span>"
				}

				this.lab_curLV.text = 'Lv.' + (curStage * 15);
				this.lab_k_curValue.text = curFightK_Value + '';
			}


		}
		public showNotFullName(ui: Laya.HTMLDivElement, stage: number) {
			let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(this.configID);
			if (!quality) {
				quality = 1;
			}
			ui.style.align = 'center';
			ui.style.fontFamily = 'STKaiti';
			ui.style.fontSize = 26;
			let name = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(this.configID);
			name = name.split('_')[0];
			switch (quality) {
				case 1:
					if ((stage - 1) == 0) {
						ui.innerHTML = "<span style='color:#4b674b;'>" + name + "</span>"
					} else {
						ui.innerHTML = "<span style='color:#4b674b;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#4b674b'>+" + (stage - 1) + "</span>";
					}
					break;
				case 2:
					if ((stage - 1) == 0) {
						ui.innerHTML = "<span style='color:#4f5575;'>" + name + "</span>"
					} else {
						ui.innerHTML = "<span style='color:#4f5575;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#4f5575'>+" + (stage - 1) + "</span>";
					}
					break;
				case 3:
					if ((stage - 1) == 0) {
						ui.innerHTML = "<span style='color:#6e4b70;'>" + name + "</span>"
					} else {
						ui.innerHTML = "<span style='color:#6e4b70;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#6e4b70'>+" + (stage - 1) + "</span>";
					}
					break;
				case 4:
					if ((stage - 1) == 0) {
						ui.innerHTML = "<span style='color:#9f6b39;'>" + name + "</span>"
					} else {
						ui.innerHTML = "<span style='color:#9f6b39;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#9f6b39'>+" + (stage - 1) + "</span>";
					}
					break;
				case 5:
					if ((stage - 1) == 0) {
						ui.innerHTML = "<span style='color:#8f3535;'>" + name + "</span>"
					} else {
						ui.innerHTML = "<span style='color:#8f3535;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#8f3535'>+" + (stage - 1) + "</span>";
					}
					break;
			}
		}
		public addEvent() {
			this.btn_goto.on(Laya.UIEvent.CLICK, this, function () {
				WuXue_InfoDialog.self.tab_info.selectedIndex = 3;
				WuXue_InfoDialog.self.showVS_Show(3, false)
			})
			this.btn_up.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.skillUpgrade, [this.skillID], 0, this,
					function (res) {
						console.log(res);
					})
				lcp.send(pkt);
			})
		}
	}
}