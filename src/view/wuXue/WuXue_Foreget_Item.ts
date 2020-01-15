/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_Foreget_Item extends ui.wuXue.WuXue_Foreget_ItemUI {
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

			this.html_1.style.fontFamily = this.html_0.style.fontFamily = 'STKaiti';
			this.html_1.style.fontSize = this.html_0.style.fontSize = 24;
			this.html_1.style.align = this.html_0.style.align = 'center';
			this.html_0.innerHTML = "<span style='color:#bf4747;'>【 升级材料返还 】</span>";
			this.html_1.innerHTML = "<span style='color:#bf4747;'>【 领悟材料返还 】</span>";
			let curLv = skillBaes.subLevel

			let num = 80 * (curLv-1) + ((curLv - 2) * (curLv-1)) / 2 * 135
			this.lab_getNum.text = num + '';
			let itemID = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLS_QUALITY_UP_ITEM(configID);
			let reGetNum = SheetConfig.mydb_magic_tbl.getInstance(null).RETURN_DEBRIS(configID);
			this.ui_1.setData(itemID, reGetNum);
		}
		public addEvent() {
			this.btn_foreget.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.deleteSkill, [this.skillID], 0, this,
					function (res) {
						console.log(res);
					})
				lcp.send(pkt);
				WuXue_InfoDialog.self.close();
			})
		}
	}
}