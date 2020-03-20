/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXueWaiGongPanel extends ui.wuXue.WuXueWaiGongPanelUI {
		constructor() {
			super();
			// this.panel_skillDes.vScrollBarSkin = "";
			// this.panel_skillEffDes.vScrollBarSkin = "";
		}
		public listData0;
		public listData1;
		public listData2;
		public setData(): void {
			this.btn_waigong.selected = true;
			let tab = 0;
			// key=400是默认武学套路的标记
			let key = 400;
			if (GameApp.MainPlayer.skillShotButton[key]) {
				tab = GameApp.MainPlayer.skillShotButton[key].i64Id.int64ToNumber();
			} else {
				tab = 0;
			}
			GameApp.MainPlayer.defaultTaoLuID = tab;
			this.initTab();
			this.addEvent();
			for (let i = 0; i < 4; i++) {
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.VS_show.addItem(box);
			}
			this.VS_show.selectedIndex = this.tab_wuxue.selectedIndex = tab;
			// GameApp.MainPlayer.taoluPageID = this.tab_wuxue.selectedIndex;
			this.setInitView(tab)
		}

		public initTab() {
			let tabStr = [];
			let data1 = GameUtil.findEquipInPlayer(EnumData.emEquipPosition.EQUIP_SHOULDER);
			if (data1) {
				GameApp.MainPlayer.skill_stage[0] = data1.dwLevel;
				tabStr.push('拳脚套路\nlv.' + data1.dwLevel)
			} else {
				tabStr.push('拳脚套路\nlv.0')
			}
			let data2 = GameUtil.findEquipInPlayer(EnumData.emEquipPosition.EQUIP_KNEE);
			if (data2) {
				GameApp.MainPlayer.skill_stage[1] = data2.dwLevel;
				tabStr.push('刀剑套路\nlv.' + data2.dwLevel)
			} else {
				tabStr.push('刀剑套路\nlv.0')
			}
			let data3 = GameUtil.findEquipInPlayer(EnumData.emEquipPosition.EQUIP_PENDANT);
			if (data3) {
				GameApp.MainPlayer.skill_stage[2] = data3.dwLevel;
				tabStr.push('长兵套路\nlv.' + data3.dwLevel)
			} else {
				tabStr.push('长兵套路\nlv.0')
			}
			let data4 = GameUtil.findEquipInPlayer(EnumData.emEquipPosition.EQUIP_FACE);
			if (data4) {
				GameApp.MainPlayer.skill_stage[3] = data4.dwLevel;
				tabStr.push('奇门套路\nlv.' + data4.dwLevel)
			} else {
				tabStr.push('奇门套路\nlv.0')
			}
			// tabStr += '拳脚套路\nlv.' + data1.dwLevel + ',' + '刀剑套路\nlv.' + data2.dwLevel + ',' + '长兵套路\nlv.' + data3.dwLevel + '奇门套路\nlv.' + data4.dwLevel;
			let str = tabStr.join(",");
			this.tab_wuxue.labels = str;
		}


		public setInitView(id) {
			let box = this.VS_show.getChildAt(id);
			if (box.numChildren <= 0) {
				let o = new WuXue_WaiGong_VS_Info()
				o.setData(id)
				box.addChild(o);
			}
			this.VS_show.selectedIndex = id;
		}

		/**
		 * 找到当前的
		 */
		public findCurWuXue_WaiGong_VS_Info(): WuXue_WaiGong_VS_Info {
			// 外面有一层BOX
			return this.VS_show.selection.getChildAt(0) as WuXue_WaiGong_VS_Info;

		}

		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.WX_upData_Hotkeys_waigong, this);
			GameApp.LListener.offCaller(ProtoCmd.WX_upData_panel_waigong, this);
			PopUpManager.Dispose(this);
		}


		public addEvent(): void {
			this.tab_wuxue.on(Laya.UIEvent.CLICK, this, () => {
				// this.VS_show.selectedIndex = this.tab_wuxue.selectedIndex;
				// GameApp.MainPlayer.taoluPageID = this.tab_wuxue.selectedIndex;
				this.setInitView(this.tab_wuxue.selectedIndex);
			})
			this.btn_miji.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueMiJiPanel();
			})
			this.btn_waigong.on(Laya.UIEvent.CLICK, this, () => {
				return;
			})
			this.btn_zaxue.on(Laya.UIEvent.CLICK,this,() => {
				PanelManage.openWuXueZaXuePanel();
			})
			// 返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this)
				PanelManage.openMainPanel();
			});
			// 排序
			// this.btn_skill_sort.on(Laya.UIEvent.CLICK, this, () => {

			// });

		}

		public initUI(): void {
			// for (let key in GameApp.MainPlayer.skillInfo) {
			// 	let _skillBase = GameApp.MainPlayer.skillInfo[key];
			// 	let configID = _skillBase.configID;
			// 	let deleteID = SheetConfig.mydb_magic_tbl.getInstance(null).DELETED(configID);
			// 	if (deleteID == 1) {
			// 		return;
			// 	}
			// 	let skillType = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLTYPE(configID);
			// 	switch (skillType) {
			// 		// 英雄
			// 		case EnumData.enSkillType.HeroSkill:
			// 			break;
			// 		// 招式
			// 		case EnumData.enSkillType.ZhaoShi:
			// 			this.list_0.array.push(_skillBase);
			// 			break;
			// 		// 身法
			// 		case EnumData.enSkillType.ShenFa:
			// 			this.list_1.array.push(_skillBase);
			// 			break;
			// 		// 招架
			// 		case EnumData.enSkillType.ZhaoJia:
			// 			this.list_2.array.push(_skillBase);
			// 			break;
			// 	}
			// }
			// this.listData0 = this.list_0.array;
			// this.listData1 = this.list_1.array;
			// this.listData2 = this.list_2.array;
			// for (let i = 0; i < 3; i++) {
			// 	(this['list_' + i] as Laya.List).renderHandler = Laya.Handler.create(this, (cell: view.wuXue.WuXue_InfoItem, index) => {
			// 		cell.setData(cell.dataSource)
			// 	}, null, false)
			// }
			// // 初始化已装备的技能
			// let keys = Object.keys(GameApp.MainPlayer.skillShotButton);
			// this.initSkillInfo(keys)
			// if (keys.length > 0) {
			// 	for (let key in GameApp.MainPlayer.skillShotButton) {
			// 		let skill_key = (GameApp.MainPlayer.skillShotButton[key]).i64Id.int64ToNumber();
			// 		this.updateSkilButton(parseInt(key), skill_key.toString());
			// 	}
			// }
			// else {
			// 	this.showDefaultSkillInfo();
			// }
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
			let type = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLTYPE(configID);
			// if (type == 1 || type == 2 || type == 3) {
			// 	this.changeSkillInfo(configID, lvNum)
			// }

		}
		// public updateSkilButton(btRow: number, skill_key: string): void {
		// 	let _skillBase = GameApp.MainPlayer.skillInfo[skill_key];
		// 	if (_skillBase) {
		// 		let nameStr = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(_skillBase.configID).split('_')[0];
		// 		if (_skillBase) {
		// 			let skill_ui = new view.wuXue.WuXue_logoItem();
		// 			skill_ui.setData(_skillBase.configID);
		// 			switch (btRow) {
		// 				case EnumData.emSkillShotButtonType.WaiGong_1:
		// 					this.ui_item1.addItem(skill_ui);
		// 					this.ui_item1.lbl_buWei.text = nameStr;
		// 					break;
		// 				case EnumData.emSkillShotButtonType.WaiGong_2:
		// 					this.ui_item2.addItem(skill_ui);
		// 					this.ui_item2.lbl_buWei.text = nameStr;
		// 					break;
		// 				case EnumData.emSkillShotButtonType.WaiGong_3:
		// 					this.ui_item3.addItem(skill_ui);
		// 					this.ui_item3.lbl_buWei.text = nameStr;
		// 					break;
		// 				case EnumData.emSkillShotButtonType.WaiGong_4:
		// 					this.ui_item4.addItem(skill_ui);
		// 					this.ui_item4.lbl_buWei.text = nameStr;
		// 					break;
		// 				case EnumData.emSkillShotButtonType.ZhaoJia_1:
		// 					this.ui_item5.addItem(skill_ui);
		// 					this.ui_item5.lbl_buWei.text = nameStr;
		// 					break;
		// 				case EnumData.emSkillShotButtonType.ShenFa_1:
		// 					this.ui_item6.addItem(skill_ui);
		// 					this.ui_item6.lbl_buWei.text = nameStr;
		// 					break;
		// 			}
		// 		}
		// 	}

		// }


		/**
		 * 更改技能说明
		 * @param config   技能ID
		 * @param lv       该技能等级
		 */
		// public changeSkillInfo(config: string, lvl: number): void {
		// 技能名称
		// 	this.lbl_skillName.text = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(config);
		// 	// 技能描述
		// 	this.lbl_skillDes.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_DESCRIPTION(config);
		// 	this.lbl_skillEffectDes.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEFFECT(config);
		// 	this.btn_1.visible = this.btn_2.visible = this.btn_3.visible = this.btn_4.visible = this.btn_5.visible = true;
		// 	for (let i = 1; i < 6; i++) {
		// 		this['btn_' + i].selected = i < lvl;
		// 		if (this['btn_' + i].selected == true) {
		// 			// this['btn_' + i].disabled = false;
		// 		} else {
		// 			this['btn_' + i].mouseEnabled = false;
		// 		}
		// 	}
		// 	this.ui_skill.setData(config);
		// }

		/**
		 * 显示默认的技能信息
		 */
		public showDefaultSkillInfo(): void {
			// 每个职业默认一个基础技能
			let defaultConfigID: string = GameApp.MainPlayer.default_skill;
			// 技能名称
			// this.lbl_skillName.text = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(defaultConfigID).split('_')[0];
			// 技能描述
			// this.lbl_skillDes.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_DESCRIPTION(defaultConfigID);
			// this.ui_skill.setData(defaultConfigID);
			// this.btn_1.visible = this.btn_2.visible = this.btn_3.visible = this.btn_4.visible = this.btn_5.visible = false;
			// for (let i = 1; i < 6; i++) {
			// 	this['btn_' + i].selected = false;
			// 	if (this['btn_' + i].selected == true) {
			// 		// this['btn_' + i].disabled = false;
			// 	} else {
			// 		this['btn_' + i].mouseEnabled = false;

			// 	}
			// }
			// this.lbl_skillEffectDes.text = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEFFECT(defaultConfigID);
			let loc = defaultConfigID.indexOf("01")
			let base = defaultConfigID.substring(0, loc);
			// this.updateSkilButton(1, base)
		}
		/**
		 * 
		 * @param type 排序类型0品质1等级2威力
		 */
		public init_sortEvent(type: number): void {
			switch (type) {
				case 0:
					break;
				case 1:
					// this.init_levelSort();
					break;
				case 2:
					break;
			}
		}
		/**
		 * 按等级排序
		 */
		// public init_levelSort(): void {
		// 	function compare(property) {
		// 		return function (a, b) {
		// 			var value1 = a[property];
		// 			var value2 = b[property];
		// 			return value1 - value2;
		// 		}
		// 	}
		// 	for (let i = 0; i <= 2; i++) {
		// 		if (this['listData' + i]) {
		// 			let skillArray = this['listData' + i];
		// 			let afterSort = [];
		// 			afterSort = skillArray.sort(compare('level'))
		// 			this['list_' + i].array = '';
		// 			this['list_' + i].array = afterSort;
		// 			this['list_' + i].itemRender = view.wuXue.WuXue_InfoItem;
		// 			(this['list_' + i] as Laya.List).renderHandler = Laya.Handler.create(this, (cell: view.wuXue.WuXue_InfoItem, index) => {
		// 				cell.setData(cell.dataSource)
		// 			}, null, false)
		// 		}
		// 	}
		// }
	}
}