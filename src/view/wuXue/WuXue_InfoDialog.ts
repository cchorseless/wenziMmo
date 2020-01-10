/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_InfoDialog extends ui.wuXue.WuXue_InfoDialogUI {
		public canLvUp: boolean = false;
		public skillID;
		public shuxingNameArr = ['', '金', '木', '水', '火', '土'];
		public configID;
		// public 
		constructor() {
			super();
			// this.panel_skillDes.vScrollBarSkin = '';
			// this.panel_skillEffDes.vScrollBarSkin = "";
		}
		public item: ProtoCmd.stSkillLvlBase;
		public setData(s: ProtoCmd.stSkillLvlBase) {
			this.hbox_eff['sortItem'] = (items) => { };
			for (let i = 0; i < 5; i++) {
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.VS_view.addChild(box);
			}
			this.item = s;
			let configID = s.configID;
			this.configID = configID;
			let wuxueType = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLTYPE(configID)
			if (wuxueType == 1) {
				this.lab_type.text = '外功型'
			} else if (wuxueType == 4) {
				this.lab_type.text = '内功型'
			}
			this.skillID = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(configID);
			// 技能类型
			let skillType = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLTYPE(configID);

			let effID = SheetConfig.mydb_magic_tbl.getInstance(null).ATTRIBUTE_EFFECT(configID);
			let effID1 = effID + '';
			let effData = GameUtil.parseEffectidToObj([effID1]);
			for (let i = 0; i < effData.des.length; i++) {
				this.hbox_eff.addChild(new view.compart.SinglePropsItem().setData(effData.des[i]));
			}
			let shuxing = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEXTRAPROP(configID);
			if (shuxing > 0) {
				this.img_shuxing.visible = true;
				this.img_shuxing.skin = "image/common/skill/icon_wx_" + shuxing + ".png"
			} else {
				this.img_shuxing.visible = false;
			}
			this.lab_shuxing_Name.text = this.shuxingNameArr[shuxing]
			this.html_lv.style.font = 'STkaiti';
			this.html_lv.style.fontSize = 26;
			this.html_lv.style.align = 'center';
			this.html_lv.innerHTML = "<span style='color:#ff8b8b'>LV." + 1
				+ '</span>' + "<span style='color:#000000'>/" + 10 + '</span>';
			// let needItemID = SheetConfig.mydb_magic_tbl.getInstance(null).ITEM_ID(configID);
			// let needItemNum = SheetConfig.mydb_magic_tbl.getInstance(null).NUMBER(configID);

			// let o = new view.compart.DaoJuWithNameItem();
			// let itemBase = new ProtoCmd.ItemBase()
			// //needItemID
			// itemBase.dwBaseID = 20101;
			// itemBase.dwCount = needItemNum
			// o.setData(itemBase)
			// o.lbl_itemName.visible =false;
			// this.ui_needItem.addChild(o)
			// this.lbl_skillType.text = '' + LangConfig.enSkillTypeDes[EnumData.enSkillType[skillType]];
			// 技能名称

			this.lab_NeedName1.text = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(configID);
			this.lbl_useDes1.text = SheetConfig.mydb_magic_tbl.getInstance(null).PROFICIENCY_ACQUISITION(configID);
			let str_Act = SheetConfig.mydb_magic_tbl.getInstance(null).ACTIVATION_CONDITIONS(configID);
			if (str_Act == "0") {
				str_Act = "无条件"
			}
			this.lab_LvUpDetail.text = str_Act;
			this.lbl_skillName.text = '' + SheetConfig.mydb_magic_tbl.getInstance(null).NAME(configID).split('_')[0];
			// 经验
			// let expMax = Math.max(SheetConfig.mydb_magic_tbl.getInstance(null).PROFICIENCY(configID), 1);
			// this.lbl_expDes.text = s.dwexp + '/' + expMax;
			// this.img_exp.width = this.img_expBg.width * Math.min(s.dwexp / expMax, 1);
			// if (s.dwexp >= expMax) {
			// 	this.canLvUp = true;
			// }
			// logo
			this.ui_skill.setData(configID);
			this.showVS_Show(0, false)
			this.addEvent();
		}
		/**
		 * 
		 * @param id   界面ID
		 * @param boo  是否刷新
		 */
		public showVS_Show(id, boo) {
			let box = this.VS_view.getChildAt(id);
			if (boo) {
				box.removeChildren();
			}
			if (box.numChildren <= 0) {
				let panel = new Laya.Panel();
				panel.vScrollBarSkin = '';
				panel.top = panel.bottom = panel.right = panel.left = 0;
				let o;
				box.addChild(panel);
				switch (id) {
					case 0:
						o = new WuXue_infoDiao_VS_info();
						o.setData(this.configID)
						break;
					case 1:
						o = new WuXue_infoDiao_VS_info();
						o.setData(this.configID)
						break;
				}

				panel.addChild(o);
			}
			this.VS_view.selectedIndex = id;
		}

		public addEvent(): void {
			GameApp.LListener.on(ProtoCmd.WX_upData_Dialog, this, function (data) {
				this.setData(data)
			})
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				// GameApp.GameEngine.wuxueDataID = -1;
				// GameApp.LListener.offCaller(ProtoCmd.WX_upData_Dialog, this);
				this.close();
			});
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