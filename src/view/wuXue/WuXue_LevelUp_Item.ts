/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_LevelUp_Item extends ui.wuXue.WuXue_LevelUp_ItemUI {
		public configID;
		public textArr = ['基本拳脚', '基本刀剑', '基本长兵', '基本奇门']
		public skillID;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(configID) {
			this.configID = configID;
			this.lab_effText.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEFFECT(configID);
			this.box_else.y = this.lab_effText.y + this.lab_effText.height + 10;
			let cost = SheetConfig.mydb_magic_tbl.getInstance(null).CONSUMPTION_MANA(configID);
			this.height = this.box_else.y + this.box_else.height + 10;
			this.lab_cost.text = cost + '';


			let skillID = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(configID);
			this.skillID = skillID;
			let curLvNum = SheetConfig.mydb_magic_tbl.getInstance(null).getNumOfSkillID(skillID);
			let stage = SheetConfig.mydb_magic_tbl.getInstance(null).LEVEL(configID)
			let power = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_CAPABILITY(configID)
			let skillBase = GameApp.MainPlayer.skillInfo[skillID];
			let curLv = skillBase.getValue('sublevel');
			this.html_powe.style.fontSize = 26;
			this.html_powe.style.align = 'center';
			let spanLv = curLvNum - stage;
			let needCost = SheetConfig.mydb_magic_tbl.getInstance(null).NUMBER2(configID);

			let needCost5Bet = needCost * 5;
			let curHasItem = GameUtil.findItemInBag(25, GameApp.GameEngine.bagItemDB);
			this.lab_lvup_cost.text = needCost + '';
			this.lab_lvup_five_times.text = needCost5Bet + '';
			this.lab_haveNum.text = curHasItem + '';
			if (spanLv >= 5) {
				this.btn_five.disabled = false;
			}
			else {
				this.btn_five.disabled = true;
			}
			if (curHasItem < needCost5Bet) {
				this.btn_five.disabled = true;
			} else {
				this.btn_five.disabled = false;
			}
			if (curHasItem < needCost) {
				this.btn_one.disabled = true;
			} else {
				this.btn_one.disabled = false;
			}

			if (stage < curLvNum) {
				let nextPower = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_CAPABILITY(parseInt(configID) + 1);
				let span = nextPower - power;
				this.box_NotmaxLv.visible = true;
				this.box_lvUp.visible = true;
				this.btn_max.visible = false;
				this.box_max.visible = false;
				this.lab_tips.text = '玩家等级需要达到50级';
				this.html_powe.innerHTML = "<span style='color:#000000;fontFamily:STXingkai;'>【&nbsp;&nbsp;&nbsp;" + '战力：' + '</span>'
					+ "<span style='color:#bf4747;fontFamily:STXingkai;'>" + power + '</span>'
					+ "<span style='color:#38ad32'>+" + span + '</span>'
					+ "<span style='color:#000000;fontFamily:STXingkai;'>】" + '&nbsp;&nbsp;&nbsp;' + '</span>';
				this.lab_curLv.text = 'LV.' + stage;
				this.lab_nextLv.text = 'LV.' + (stage + 1);
				let effID = SheetConfig.mydb_magic_tbl.getInstance(null).ATTRIBUTE_EFFECT(configID);
				let effID0 = effID + '';
				let effData = GameUtil.parseEffectidToObj([effID0]);
				for (let i = 0; i < effData.des.length; i++) {
					if (i < 2) {
						this['ui_eff' + i].setData(effData.des[i], true)
					}
				}
				let effID1 = SheetConfig.mydb_magic_tbl.getInstance(null).ATTRIBUTE_EFFECT(parseInt(configID) + 1);
				let effID1_1 = effID1 + '';
				let effData1 = GameUtil.parseEffectidToObj([effID1_1]);
				for (let i = 0; i < effData1.des.length; i++) {
					if (i < 2) {
						this['ui_nexteff' + i].setData(effData1.des[i], true)
					}
				}
			}
			else {
				this.box_NotmaxLv.visible = false;
				this.box_lvUp.visible = false;
				this.btn_max.visible = true;
				this.box_max.visible = true;
				this.lab_tips.text = '升阶可提升等级上限';
				this.lab_curLv.text = 'LV.' + stage;
				this.html_powe.innerHTML = "<span style='color:#000000;fontFamily:STXingkai;'>【&nbsp;&nbsp;&nbsp;" + '战力：' + '</span>'
					+ "<span style='color:#bf4747;fontFamily:STXingkai;'>" + power + '</span>'
					+ "<span style='color:#000000;fontFamily:STXingkai;'>】" + '&nbsp;&nbsp;&nbsp;' + '</span>'
				let effID = SheetConfig.mydb_magic_tbl.getInstance(null).ATTRIBUTE_EFFECT(configID);
				let effID0 = effID + '';
				let effData = GameUtil.parseEffectidToObj([effID0]);
				for (let i = 0; i < effData.des.length; i++) {
					if (i < 2) {
						this['ui_eff' + i].setData(effData.des[i], true)
					}
				}
			}
		}
		public addEvent() {
			this.btn_one.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.skillLevelUp, [1, this.skillID], 0, this,
					function (res) {
						console.log(res);
						this.lab_curLv.text = '2'
					})
				lcp.send(pkt);
			})
			this.btn_five.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.skillLevelUp, [1, this.skillID], 0, this,
					function (res) {
						console.log(res);
						this.lab_curLv.text = '7'
					})
				lcp.send(pkt);
			})
			this.btn_max.on(Laya.UIEvent.CLICK, this, function () {
				WuXue_InfoDialog.self.tab_info.selectedIndex = 2;
				WuXue_InfoDialog.self.showVS_Show(2, false)
			})

		}
	}
}