/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_InfoDialog extends ui.wuXue.WuXue_InfoDialogUI {
		public static self: WuXue_InfoDialog;
		public canLvUp: boolean = false;
		public skillID;
		public quailtyArr = [0, 1, 1.2, 1.4, 1.6, 2.4];
		public configID;
		public curBox;
		public needUpDate = false;

		// public 
		constructor() {
			super();
			WuXue_InfoDialog.self = this;
			// this.panel_skillDes.vScrollBarSkin = '';
			// this.panel_skillEffDes.vScrollBarSkin = "";
		}
		public item: ProtoCmd.stSkillLvlBase;
		public setData(s: ProtoCmd.stSkillLvlBase, tabid = 0, isRefrash = true) {
			this.hbox_eff.removeChildren();
			this.hbox_eff['sortItem'] = (items) => { };
			if (isRefrash) {
				for (let i = 0; i < 5; i++) {
					let box = new Laya.Box();
					box.top = box.bottom = box.right = box.left = 0;
					this.VS_view.addItem(box);
				}
			}
			this.item = s;
			let configID = s.configID;
			this.configID = configID;
			let curLv = s.subLevel;
			let zizhi = SheetConfig.mydb_magic_tbl.getInstance(null).QUALIFICATIONS(configID);
			this.skillID = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(configID);
			// 技能类型
			let skillType = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLTYPE(configID);

			let effID = SheetConfig.mydb_magic_tbl.getInstance(null).ATTRIBUTE_EFFECT(configID);
			let effID1 = effID + '';
			let effData = GameUtil.parseEffectidToObj([effID1]);
			for (let i = 0; i < effData.des.length; i++) {
				this.hbox_eff.addChild(new WuXue_Skill_Effect_item().setData(effData.des[i], true, curLv, zizhi));
			}
			let shuxing = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEXTRAPROP(configID);

			this.html_lv.style.font = 'STKaiti';
			this.html_lv.style.fontSize = 24;
			// this.html_lv.style.align = 'center';
			// GameApp.MainPlayer.skill_stage[GameApp.MainPlayer.taoluPageID]
			let maxLv = s.level * 15;

			this.html_lv.innerHTML = "<span style='color:#63491a'>LV." + curLv
				+ '</span>' + "<span style='color:#63491a'>/" + maxLv + '</span>';

			let str_Act = SheetConfig.mydb_magic_tbl.getInstance(null).ACTIVATION_CONDITIONS(configID);
			if (str_Act == "0") {
				str_Act = "无条件"
			}
			let stage = SheetConfig.mydb_magic_tbl.getInstance(null).LEVEL(configID);
			let quality = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLQUALITY(configID);
			let name = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(configID);
			// this.html_skillName.style.align = 'center';
			this.html_skillName.style.fontFamily = 'STKaiti';
			this.html_skillName.style.fontSize = 24;
			name = name.split('_')[0];
			switch (quality) {
				case 1:
					if ((stage - 1) == 0) {
						this.html_skillName.innerHTML = "<span style='color:#4f5575;'>" + name + "</span>"
					} else {
						this.html_skillName.innerHTML = "<span style='color:#4b674b;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#4b674b'>+" + (stage - 1) + "</span>"
					}
					break;
				case 2:
					if ((stage - 1) == 0) {
						this.html_skillName.innerHTML = "<span style='color:#4f5575;'>" + name + "</span>"
					} else {
						this.html_skillName.innerHTML = "<span style='color:#4f5575;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#4f5575'>+" + (stage - 1) + "</span>"
					}
					break;
				case 3:
					if ((stage - 1) == 0) {
						this.html_skillName.innerHTML = "<span style='color:#6e4b70;'>" + name + "</span>"
					} else {
						this.html_skillName.innerHTML = "<span style='color:#6e4b70;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#6e4b70'>+" + (stage - 1) + "</span>"
					}
					break;
				case 4:
					if ((stage - 1) == 0) {
						this.html_skillName.innerHTML = "<span style='color:#9f6b39;'>" + name + "</span>"
					} else {
						this.html_skillName.innerHTML = "<span style='color:#9f6b39;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#9f6b39'>+" + (stage - 1) + "</span>"
						break;
					}
				case 5:
					if ((stage - 1) == 0) {
						this.html_skillName.innerHTML = "<span style='color:#8f3535;'>" + name + "</span>";
					} else {
						this.html_skillName.innerHTML = "<span style='color:#8f3535;'>" + name + "</span>"
							+ "<span style='color:#ffffff;stroke:2.5;strokeColor:#8f3535'>+" + (stage - 1) + "</span>";
					}

					break;
			}
			let power = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_CAPABILITY(configID);
			// let zizhi = SheetConfig.mydb_magic_tbl.getInstance(null).QUALIFICATIONS(configID);
			let kValue = curLv / 150 + this.quailtyArr[quality]
			let curPower = Math.floor(power + zizhi * (curLv - 1) * kValue)
			this.html_power.style.fontFamily = 'STXingkai';
			this.html_power.style.fontSize = 24;
			this.html_power.innerHTML = "<span style='color:#000000;'>战力：</span>"
				+ "<span style='color:#bf4747;'>+" + curPower + "</span>"

			this.ui_skill.setData(configID);
			this.showVS_Show(tabid, !isRefrash)
			this.addEvent();
		}
		/**
		 * 
		 * @param id   界面ID
		 * @param boo  是否刷新
		 */
		public showVS_Show(id, boo) {
			this.VS_view.selectedIndex = id;
			this.curBox = this.VS_view.getChildAt(id);
			if (boo) {
				this.curBox.removeChildren();
			}
			if (this.needUpDate) {
				this.curBox.removeChildren();
			}
			if (this.curBox.numChildren <= 0) {
				let panel = new Laya.Panel();
				panel.vScrollBarSkin = '';
				panel.top = panel.bottom = panel.right = panel.left = 0;
				this.curBox.addChild(panel);
				let o;
				switch (id) {
					case 0:
						o = new WuXue_infoDiao_VS_info();
						o.setData(this.configID)
						panel.addChild(o);
						break;
					case 1:
						o = new WuXue_LevelUp_Item();
						o.setData(this.configID)
						panel.addChild(o);
						this.curBox.addChild(panel);
						break;
					case 2:
						o = new WuXue_StageUp_item();
						o.setData(this.configID)
						panel.addChild(o);
						this.curBox.addChild(panel);
						break;
					case 3:
						o = new WuXue_Up_Grasp_Item();
						o.setData(this.configID)
						panel.addChild(o);
						this.curBox.addChild(panel);
						break;
						
				}
			}




		}
		public upDateView() {
			this.needUpDate = true;
			switch (this.tab_info.selectedIndex) {
				case 0:
					this.setData(GameApp.MainPlayer.skillInfo[this.skillID], 0, false)
					break;
				case 1:
					this.setData(GameApp.MainPlayer.skillInfo[this.skillID], 1, false)
					break;
				case 2:
					this.setData(GameApp.MainPlayer.skillInfo[this.skillID], 2, false)
					break;
				case 3:
					this.setData(GameApp.MainPlayer.skillInfo[this.skillID+1], 3, false)
					break;
				case 4:
					this.setData(GameApp.MainPlayer.skillInfo[this.skillID], 4, false)
					break;
			}
		}

		public addEvent(): void {
			GameApp.LListener.on(ProtoCmd.WX_upData_panel_waigong, this, function () {
				this.upDateView()

			})
			GameApp.LListener.on(ProtoCmd.WX_upData_Dialog, this, function (data) {
				this.setData(data)
			})
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				// GameApp.GameEngine.wuxueDataID = -1;
				// GameApp.LListener.offCaller(ProtoCmd.WX_upData_Dialog, this);
				this.close();
			});
			this.tab_info.on(Laya.UIEvent.CLICK, this, () => {
				// this.VS_show.selectedIndex = this.tab_wuxue.selectedIndex;
				this.VS_view.selectedIndex = this.tab_info.selectedIndex;
				this.showVS_Show(this.tab_info.selectedIndex, false);
			})
			// 升级
			// this.btn_lvUp.on(Laya.UIEvent.CLICK, this, () => {
			// 	// if (this.canLvUp) {
			// 	let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.upgradeSkill, [this.skillID]);
			// 	lcp.send(pkt);
			// 	// }
			// });
			/**
			  * 测试技能经验值增加
			  */
			// this.img_test.on(Laya.UIEvent.CLICK, this, function () {
			// 	let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.addSkillExp, [this.skillID, 20101, 10]);
			// 	lcp.send(pkt);
			// })
			// 穿戴或者卸下

		}


	}
}