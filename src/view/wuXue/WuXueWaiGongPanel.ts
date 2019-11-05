/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXueWaiGongPanel extends ui.wuXue.WuXueWaiGongPanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.initUI();
			this.addEvent();
		}

		public initUI(): void {
			this.tab_0.selectedIndex = 0
			this.viw_0.selectedIndex = 0;
			this.list_0.vScrollBarSkin = '';
			this.list_1.vScrollBarSkin = '';
			this.list_2.vScrollBarSkin = '';
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false);
			for (let i = 0; i < 3; i++) {
				this['list_' + i].itemRender = view.wuXue.WuXue_InfoItem
				this['list_' + i].array = [];
				this['list_' + i].repeatX = 2;

			}
			this.ui_item1.lbl_buWei.text = '攻击武学';
			this.ui_item2.lbl_buWei.text = '攻击武学';
			this.ui_item3.lbl_buWei.text = '攻击武学';
			this.ui_item4.lbl_buWei.text = '攻击武学';
			this.ui_item5.lbl_buWei.text = '身法武学';
			this.ui_item6.lbl_buWei.text = '招架武学';
			for (let key in GameApp.MainPlayer.skillInfo) {
				let _skillBase = GameApp.MainPlayer.skillInfo[key];
				let configID = _skillBase.configID;
				let skillType = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLTYPE(configID);
				switch (skillType) {
					// 英雄
					case EnumData.enSkillType.HeroSkill:
						break;
					// 招式
					case EnumData.enSkillType.ZhaoShi:
						this.list_0.array.push(_skillBase);
						break;
					// 身法
					case EnumData.enSkillType.ShenFa:
						this.list_1.array.push(_skillBase);
						break;
					// 招架
					case EnumData.enSkillType.ZhaoJia:
						this.list_2.array.push(_skillBase);
						break;
				}
			}

			for (let i = 0; i < 3; i++) {
				(this['list_' + i] as Laya.List).renderHandler = Laya.Handler.create(this, (cell: view.wuXue.WuXue_InfoItem, index) => {
					cell.setData(cell.dataSource)
				}, null, false)
			}
			// 初始化已装备的技能
			let keys = Object.keys(GameApp.MainPlayer.skillShotButton);
			if (keys.length > 0) {
				for (let key in GameApp.MainPlayer.skillShotButton) {
					this.updateSkilButton(key);
				}
			}
			else {
				this.showDefaultSkillInfo();
			}


		}

		public addEvent(): void {
			// 模式切换
			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});
			// 返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			// 内功
			this.btn_neiGong.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueNeiGongPanel()
			});
			// 生活技能
			this.btn_lifeSkill.on(Laya.UIEvent.CLICK, this, () => {
				// PanelManage.openWuXueLifeSkillPanel();
			});
			// 合道
			this.btn_heDao.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueHeDaoPanel();
			});
			//技能更换

		}

		public updateSkilButton(btRow): void {
			let _skillShot: ProtoCmd.stShortCuts = GameApp.MainPlayer.skillShotButton[btRow];
			let _skillBase = GameApp.MainPlayer.skillInfo[_skillShot.i64Id.int64ToNumber()];
			if (_skillBase) {
				let skill_ui = new view.wuXue.WuXue_logoItem();
				skill_ui.setData(_skillBase.configID);
				switch (btRow) {
					case EnumData.emSkillShotButtonType.NeiGong_1:
						this.ui_item1.addItem(skill_ui);
						break;
					case EnumData.emSkillShotButtonType.NeiGong_2:
						this.ui_item2.addItem(skill_ui);
						break;
					case EnumData.emSkillShotButtonType.NeiGong_3:
						this.ui_item3.addItem(skill_ui);
						break;
					case EnumData.emSkillShotButtonType.NeiGong_4:
						this.ui_item4.addItem(skill_ui);
						break;
					case EnumData.emSkillShotButtonType.ZhaoJia_1:
						this.ui_item5.addItem(skill_ui);
						break;
					case EnumData.emSkillShotButtonType.ShenFa_1:
						this.ui_item6.addItem(skill_ui);
						break;
				}
			}
		}


		/**
		 * 更改技能说明
		 * @param config 
		 */
		public changeSkillInfo(config, lvl): void {
			// 技能名称
			this.lbl_skillName.text = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(config);
			// 技能描述
			this.lbl_skillDes.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_DESCRIPTION(config);
			this.btn_1.visible = this.btn_2.visible = this.btn_3.visible = this.btn_4.visible = this.btn_5.visible = true;
			for (let i = 1; i < 6; i++) {
				this['btn_' + i].selected = i < lvl;
			}
		}

		/**
		 * 显示默认的技能信息
		 */
		public showDefaultSkillInfo(): void {
			// 每个职业默认一个基础技能
			let defaultConfigID = GameApp.MainPlayer.default_skill;
			// 技能名称
			this.lbl_skillName.text = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(defaultConfigID).split('_')[0];
			// 技能描述
			this.lbl_skillDes.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_DESCRIPTION(defaultConfigID);
			this.btn_1.visible = this.btn_2.visible = this.btn_3.visible = this.btn_4.visible = this.btn_5.visible = false;
		}
	}
}