/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_InfoDialog extends ui.wuXue.WuXue_InfoDialogUI {
		public canLvUp:boolean = false;
		constructor() {
			super();
		}
		public item: ProtoCmd.stSkillLvlBase;
		public setData(s: ProtoCmd.stSkillLvlBase): WuXue_InfoDialog {
			this.item = s;
			let configID = s.configID;
			// 技能类型
			let skillType = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLTYPE(this.item.configID);
			let needItemID = SheetConfig.mydb_magic_tbl.getInstance(null).ITEM_ID(this.item.configID);
			let needItemNum = SheetConfig.mydb_magic_tbl.getInstance(null).NUMBER(this.item.configID);

			let o = new view.compart.DaoJuWithNameItem();
			let itemBase = new ProtoCmd.ItemBase()
			//needItemID
			itemBase.dwBaseID = 20101;
			itemBase.dwCount = needItemNum
			o.setData(itemBase)
			this.ui_needItem.addChild(o)
			this.lbl_skillType.text = '' + LangConfig.enSkillTypeDes[EnumData.enSkillType[skillType]];
			// 技能名称
			this.lbl_skillName.text = '' + SheetConfig.mydb_magic_tbl.getInstance(null).NAME(configID).split('_')[0];
			// 技能描述
			this.lbl_skillDes.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_DESCRIPTION(configID);
			this.lbl_skillEffectDes.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEFFECT(configID);
			this.btn_1.visible = this.btn_2.visible = this.btn_3.visible = this.btn_4.visible = this.btn_5.visible = true;
			for (let i = 1; i < 6; i++) {
				this['btn_' + i].selected = i < s.level;
				if (this['btn_' + i].selected == true) {
					this['btn_' + i].disabled = false;
				} else {
					this['btn_' + i].disabled = true;
				}
			}
			// 经验
			let expMax = Math.max(SheetConfig.mydb_magic_tbl.getInstance(null).PROFICIENCY(configID), 1);
			this.lbl_expDes.text = s.dwexp + '/' + expMax;
			this.img_exp.width = this.img_expBg.width * Math.min(s.dwexp / expMax, 1);
			if(s.dwexp >=expMax){
				this.canLvUp = true;
			}
			// logo
			this.ui_item.setData(configID);

			// 穿戴还是卸下
			let btow = GameApp.MainPlayer.checkSkillHadDress(s.skillid);
			if (btow) {
				this.btn_dress.label = '卸下';
			}
			else {
				this.btn_dress.label = '装备';
			}

			this.addEvent();
			return this
		}

		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			// 升级
			this.btn_lvUp.on(Laya.UIEvent.CLICK, this, () => {
				// let expMax = SheetConfig.mydb_magic_tbl.getInstance(null).PROFICIENCY(this.item.configID);
				if(this.canLvUp){
					
				}

			});
			// 穿戴或者卸下
			this.btn_dress.on(Laya.UIEvent.CLICK, this, () => {
				this.close()
				// 卸下
				let btow = GameApp.MainPlayer.checkSkillHadDress(this.item.skillid)
				if (btow) {
					let pkt = new ProtoCmd.AvatarDelSkillShortCutsEnDeCoder();
					pkt.shortcuts.btRow = btow;
					pkt.shortcuts.btCol = 1;
					lcp.send(pkt);
				}
				// 穿上
				else {
					let skillType = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLTYPE(this.item.configID);
					let btow = null;
					switch (skillType) {
						// 招式(1-4) 先卸下再穿上
						case EnumData.enSkillType.ZhaoShi:
							for (let i = 1; i < 5; i++) {
								if (!GameApp.MainPlayer.skillShotButton[i]) {
									btow = i;
									break
								}
							}
							break;
						// 招架5
						case EnumData.enSkillType.ZhaoJia:
							btow = 5
							break;
						// 身法6
						case EnumData.enSkillType.ShenFa:
							btow = 6
							break;
						// 内功(7-10)
						case EnumData.enSkillType.NeiGong:
							for (let i = 7; i < 11; i++) {
								if (!GameApp.MainPlayer.skillShotButton[i]) {
									btow = i;
									break
								}
							}
							break;
					}
					if (btow == null) {
						TipsManage.showTips('先卸下,再穿戴')
						return
					}
					let pkt = new ProtoCmd.AvatarSetSkillShortCutsEnDeCoder();
					pkt.setValue('oldcol', 1);
					pkt.setValue('oldrow', btow);
					pkt.shortcuts.emShortCuts = 1;
					pkt.shortcuts.i64Id = ProtoCmd.Int64.numberToInt64(this.item.skillid)
					pkt.shortcuts.btCol = 1;
					pkt.shortcuts.btRow = btow;
					lcp.send(pkt);

				}


			});

		}


	}
}