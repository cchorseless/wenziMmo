/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_MiJi_VS_Info_Item extends ui.wuXue.WuXue_MiJi_VS_Info_ItemUI {
		public item;
		public hasStudy = false;
		public itemID;
		public canStudy = false;
		public dialogSkillID;

		public configID;
		constructor() {
			super();
			this.addEvent();
		}
		/**
		 * 
		 * @param item 单条背包数据
		 */
		public setData(item: ProtoCmd.ItemBase) {
			this.item = item;
			let configID = item.dwBaseID;
			this.configID = configID;
			let hasNum = item.dwCount;
			this.itemID = configID;
			let skillID = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVUPID(configID);
			let skillConfigID = parseInt(skillID) * 100 + 1;
			let exclude = SheetConfig.mydb_magic_tbl.getInstance(null).EXCLUSION_SKILLS(skillConfigID);
			let excludeArr = exclude.split('|');
			let skillType = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLTYPE(skillConfigID);
			this.img_skillType.skin = this.img_skillType.skin = "image/common/wuxue/img_" + skillType + ".png"
			let needNum = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMSTORE(configID);
			this.img_bg.skin = "image/common/daoju/quality_5.png";
			this.img_icon.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(configID) + '.png';
			this.lab_name.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(configID);
			for (let i in GameApp.MainPlayer.skillInfo) {
				for (let j = 0; j < excludeArr.length; j++) {
					if (excludeArr[j] == i) {
						this.hasStudy = true;
						this.dialogSkillID = i;
						break;
					}
				}
			}
			//是否已经学习该技能
			if (this.hasStudy) {
				this.box_not.visible = false;
				this.box_had.visible = true;
				this.lab_hasNum.text = '数量：' + hasNum;
				this.btn_study.label = '获取';
				this.btn_study.skin = 'image/common/button_qianwang_yellow.png'

			} else {
				this.box_not.visible = true;
				this.box_had.visible = false;
				this.html_hasNum.style.fontFamily = 'STkaiti';
				this.html_hasNum.style.fontSize = 20;
				//碎片是否足够
				if (needNum <= hasNum) {
					this.canStudy = true;
					this.img_progress.width = this.img_progress_bg.width;
					this.html_hasNum.innerHTML = "<span style='color:#38ad32'>" + hasNum + "</span>"
						+ "<span style='color:#000000'>" + '/ ' + LangConfig.getBigNumberDes(needNum) + "</span>";
					this.btn_study.label = '学习';
					this.btn_study.skin = 'image/common/button_qianwang_red.png'
				} else {
					this.canStudy = false;
					this.html_hasNum.innerHTML = "<span style='color:#c43939'>" + hasNum + "</span>"
						+ "<span style='color:#000000'>" + '/ ' + LangConfig.getBigNumberDes(needNum) + "</span>";
					let k = hasNum / needNum;
					this.img_progress.width = this.img_progress_bg.width * k;
					this.btn_study.label = '获取';
					this.btn_study.skin = 'image/common/button_qianwang_yellow.png'
				}
			}

		}

		public addEvent() {
			this.btn_study.on(Laya.UIEvent.CLICK, this, function () {
				if (this.hasStudy) {
					let o = new WuXue_Get_Cookie_Dialog();
					o.setData(this.configID)
					o.popup();
				} else {
					if (this.canStudy) {
						let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.useSkillItem, [this.itemID], 0, this,
							function (res) {
								console.log(res);
							})
						lcp.send(pkt);
					} else {
						let o = new WuXue_Get_Cookie_Dialog();
						o.setData(this.configID)
						o.popup();
					}

				}

			})
			this.img_bg.on(Laya.UIEvent.CLICK, this, function () {
				if (this.hasStudy) {
					let o = new WuXue_InfoDialog();
					o.setData(GameApp.MainPlayer.skillInfo[this.dialogSkillID], 3)
					o.popup();
				} else {
					return;
				}
			})

		}
	}
}