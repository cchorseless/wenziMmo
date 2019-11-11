/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXueWaiGongPanel extends ui.wuXue.WuXueWaiGongPanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.btn_waiGong.selected = true;
			this.initUI();
			this.addEvent();
		}
		public addEvent(): void {
			//武学界面刷新  快捷键
			GameApp.LListener.on(ProtoCmd.WX_upData_Hotkeys, this, function () {
				for (let i = 1; i < 7; i++) {
					this["ui_item" + i].removeItem();
					this["ui_item" + i].lbl_buWei.text = ""
				}
				let keys = Object.keys(GameApp.MainPlayer.skillShotButton);
				if (keys.length > 0) {
					for (let key in GameApp.MainPlayer.skillShotButton) {
						let skill_key = (GameApp.MainPlayer.skillShotButton[key]).i64Id.int64ToNumber();
						this.updateSkilButton(parseInt(key), skill_key.toString());
					}
				}
				else {
					this.showDefaultSkillInfo();
				}
				this.initSkillInfo(keys)
			})
			for (let i = 1; i < 7; i++) {
				this["ui_item" + i].on(Laya.UIEvent.CLICK, this, function () {
					for (let key in GameApp.MainPlayer.skillShotButton) {
						let basekey: number = parseInt(key);
						let skill_key;
						if (basekey == i) {
							skill_key = (GameApp.MainPlayer.skillShotButton[key]).i64Id.int64ToNumber();
							let _skillBase = GameApp.MainPlayer.skillInfo[skill_key.toString()];
							let skillLV = _skillBase.level;
							let configID = _skillBase.configID;

							this.changeSkillInfo(configID, skillLV)
						}

					}
					// this.changeSkillInfo()
				})
			}
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
			// 闭关
			this.btn_closeDoor.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueCloseDoorPanel();
			});
			// 合道
			this.btn_heDao.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueHeDaoPanel();
			});
			//技能更换

			//刷新面板
			GameApp.LListener.on(ProtoCmd.WX_upData_panel, this, function () {
				this.initUI();
			 })

		}

		public initUI(): void {
			for (let i = 1; i < 7; i++) {
				this["ui_item" + i].removeItem();
				this["ui_item" + i].lbl_buWei.text = ""
			}
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
			// this.ui_item1.lbl_buWei.text = '攻击武学';
			// this.ui_item2.lbl_buWei.text = '攻击武学';
			// this.ui_item3.lbl_buWei.text = '攻击武学';
			// this.ui_item4.lbl_buWei.text = '攻击武学';
			// this.ui_item5.lbl_buWei.text = '身法武学';
			// this.ui_item6.lbl_buWei.text = '招架武学';
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
			this.initSkillInfo(keys)
			if (keys.length > 0) {
				for (let key in GameApp.MainPlayer.skillShotButton) {
					let skill_key = (GameApp.MainPlayer.skillShotButton[key]).i64Id.int64ToNumber();
					this.updateSkilButton(parseInt(key), skill_key.toString());
				}
			}
			else {
				this.showDefaultSkillInfo();
			}
		}
		private initSkillInfo(keys) {
			if (keys.length <= 0) {
				return;
			}
			let useKey;
			keys.sort(function (a, b) { return a - b });
			useKey = keys[0]

			let showDetailID = (GameApp.MainPlayer.skillShotButton[useKey]).i64Id.int64ToNumber();
			let configID = GameApp.MainPlayer.skillInfo[showDetailID.toString()].configID;
			let lvNum = GameApp.MainPlayer.skillInfo[showDetailID.toString()].level;
			this.changeSkillInfo(configID, lvNum)
		}



		public updateSkilButton(btRow: number, skill_key: string): void {

			let _skillBase = GameApp.MainPlayer.skillInfo[skill_key];
			let nameStr = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(_skillBase.configID).split('_')[0];
			if (_skillBase) {
				let skill_ui = new view.wuXue.WuXue_logoItem();
				skill_ui.setData(_skillBase.configID);
				switch (btRow) {
					case EnumData.emSkillShotButtonType.WaiGong_1:
						this.ui_item1.addItem(skill_ui);
						this.ui_item1.lbl_buWei.text = nameStr;
						break;
					case EnumData.emSkillShotButtonType.WaiGong_2:
						this.ui_item2.addItem(skill_ui);
						this.ui_item2.lbl_buWei.text = nameStr;
						break;
					case EnumData.emSkillShotButtonType.WaiGong_3:
						this.ui_item3.addItem(skill_ui);
						this.ui_item3.lbl_buWei.text = nameStr;
						break;
					case EnumData.emSkillShotButtonType.WaiGong_4:
						this.ui_item4.addItem(skill_ui);
						this.ui_item4.lbl_buWei.text = nameStr;
						break;
					case EnumData.emSkillShotButtonType.ZhaoJia_1:
						this.ui_item5.addItem(skill_ui);
						this.ui_item5.lbl_buWei.text = nameStr;
						break;
					case EnumData.emSkillShotButtonType.ShenFa_1:
						this.ui_item6.addItem(skill_ui);
						this.ui_item6.lbl_buWei.text = nameStr;
						break;
				}
			}
		}


		/**
		 * 更改技能说明
		 * @param config   技能ID
		 * @param lv       该技能等级
		 */
		public changeSkillInfo(config: string, lvl: number): void {
			// 技能名称
			this.lbl_skillName.text = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(config);
			// 技能描述
			this.lbl_skillDes.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_DESCRIPTION(config);
			this.lbl_skillEffectDes.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEFFECT(config);
			this.btn_1.visible = this.btn_2.visible = this.btn_3.visible = this.btn_4.visible = this.btn_5.visible = true;
			for (let i = 1; i < 6; i++) {
				this['btn_' + i].selected = i < lvl;
				if (this['btn_' + i].selected == true) {
					this['btn_' + i].disabled = false;
				} else {
					this['btn_' + i].disabled = true;
				}
			}
			this.ui_skill.setData(config);

		}

		/**
		 * 显示默认的技能信息
		 */
		public showDefaultSkillInfo(): void {
			// 每个职业默认一个基础技能
			let defaultConfigID: string = GameApp.MainPlayer.default_skill;
			// 技能名称
			this.lbl_skillName.text = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(defaultConfigID).split('_')[0];
			// 技能描述
			this.lbl_skillDes.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_DESCRIPTION(defaultConfigID);
			this.ui_skill.setData(defaultConfigID);
			// this.btn_1.visible = this.btn_2.visible = this.btn_3.visible = this.btn_4.visible = this.btn_5.visible = false;
			for (let i = 1; i < 6; i++) {
				this['btn_' + i].selected = false;
				if (this['btn_' + i].selected == true) {
					this['btn_' + i].disabled = false;
				} else {
					this['btn_' + i].disabled = true;
				}
			}
			// GameApp.MainPlayer.skillShotButton[1] = GameApp.MainPlayer.skillInfo[defaultConfigID];
			this.lbl_skillEffectDes.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEFFECT(defaultConfigID);
			let loc = defaultConfigID.indexOf("01")
			let base = defaultConfigID.substring(0, loc);

			// let base = defaultConfigID
			this.updateSkilButton(1, base)
		}
	}
}