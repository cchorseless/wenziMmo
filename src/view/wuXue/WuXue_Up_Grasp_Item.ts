/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_Up_Grasp_Item extends ui.wuXue.WuXue_Up_Grasp_ItemUI {
		public configID;
		public skillID;
		public skillBase;
		public isMax = false;
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
			let skillBaes = GameApp.MainPlayer.skillInfo[skillID];
			this.skillBase = skillBaes;
			let curZZ = SheetConfig.mydb_magic_tbl.getInstance(null).QUALIFICATIONS(configID);
			let curStage = skillBaes.level;
			//当前品质下有几个阶段
			if (skillID == 999 || skillID == 1000) {
				this.isMax = true;
				this.box_Not.visible = false;
				this.box_NotFull.visible = false;
				this.Max.visible = true;
				this.ui_max.setData(configID);
				this.lab_max_ZZ.text = curZZ + '';
			} else {
				let stageNum = 5;
				let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(configID);
				if (quality == stageNum) {
					this.isMax = true;
				} else {
					this.isMax = false;
				}
			}
			if (this.isMax) {
				this.box_Not.visible = false;
				this.box_NotFull.visible = false;
				this.Max.visible = true;
				this.ui_max.setData(configID);
				this.lab_max_ZZ.text = curZZ + '';
			} else {
				this.box_Not.visible = true;
				this.box_NotFull.visible = true;
				this.Max.visible = false;
				this.ui_skill0.setData(configID);
				let nextConfigID = (skillID + 1) * 100 + curStage;
				let nextZZ = SheetConfig.mydb_magic_tbl.getInstance(null).QUALIFICATIONS(nextConfigID);
				this.ui_skill1.setData(nextConfigID);
				this.lab_lastZZ.text = curZZ + '';
				this.lab_nextZZ.text = nextZZ + '';
				let costItemID = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLS_QUALITY_UP_ITEM(configID);
				let costItemNum = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLS_QUALITY_NUMBER(configID);
				let hasNum = GameUtil.findItemInBag(costItemID, GameApp.GameEngine.bagItemDB);
				let itemname = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(costItemID);
				this.img_bg.skin = 'image/common/daoju/quality_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(costItemID) + '.png';
				let icon = SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(costItemID);
				this.img_icon.skin = 'image/common/daoju/itemicon_' + icon + '.png';
				this.lab_cookieName.text = itemname;
				this.html_cookie_Num.style.fontFamily = 'STKaiti';
				this.html_cookie_Num.style.fontSize = 20;
				if (hasNum >= costItemNum) {
					this.html_cookie_Num.innerHTML = "<span style='color:#63491a;'>(</span>"
						+ "<span style='color:#38ad32;'>" + costItemNum + "</span>"
					+"<span style='color:#63491a;'>/" + hasNum + ")</span>"
				} else {
					this.html_cookie_Num.innerHTML = "<span style='color:#63491a;'>(</span>"
						+ "<span style='color:#bf4747;'>" + costItemNum + "</span>"
					+"<span style='color:#63491a;'>/" + hasNum + ")</span>"
				}


			}

		}
		public addEvent() {
			this.btn_grasp.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.skillRareUp, [this.skillID], 0, this,
					function (res) {
						console.log(res);
						// this.lab_curLv.text = '7'
					})
				lcp.send(pkt);
				GameApp.MainPlayer.upGraspSkillID = this.skillID
			})
		}
	}
}