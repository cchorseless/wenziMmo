/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_WaiGong_VS_Info extends ui.wuXue.WuXue_WaiGong_VS_InfoUI {
		public static SkillDown_Create = 'SkillDown_Create'
		public static SkillMove = 'SkillMove'
		public aLLskillData = {};//所有的技能数据
		public unlockNeed = 30;
		public pageID = 1;// 最小页
		public maxPage = 1;// 最大页数

		public skillType;// 当前技能套路ID
		constructor() {
			super();
			this.list_skill.itemRender = WuXue_logoWithNameV1Item;
			this.addEvent();

		}

		public setData(skillType) {
			let textArr = ['拳脚', '刀剑', '长兵', '奇门']
			let str = '';
			if (skillType == 0) {
				str = '全部武学';
			} else {
				str = '拳脚类和' + textArr[skillType] + '类武学可装配此套路'
			}
			this.lab_taoluText.text = str;
			this.skillType = skillType;
			this.dealSkillData();
			this.showSkillPage(skillType, 1);
			this.updateDefaultTaoLuID();
			this.updateSkillShot(skillType);
		}

		/**
		 * 刷新默认武学
		 */
		public updateDefaultTaoLuID() {
			if (this.skillType == GameApp.MainPlayer.defaultTaoLuID) {
				this.btn_setTaolu.label = '默认出战套路'
			} else {
				this.btn_setTaolu.label = '设置出战套路'
			}
		}

		/**
		 * 刷新武学快捷键界面部分
		 */
		public updateSkillShot(skillType) {
			for (let i = 0; i < 6; i++) {
				let key = skillType * 100 + i;
				let skillBase;
				if (GameApp.MainPlayer.skillShotButton[key]) {
					let skill = GameApp.MainPlayer.skillShotButton[key].i64Id.int64ToNumber();
					skillBase = GameApp.MainPlayer.skillInfo[skill + ''];
				}
				Log.trace(skillType, i, 'updateSkillShot')
				this['ui_SkillCircle' + (i + 1)].setData(skillType, i, skillBase);
			}
		}


		/**
		 * 处理武学数据
		 */
		public dealSkillData() {
			let wuXueTaolu0 = [];
			let wuXueTaolu1 = [];
			let wuXueTaolu2 = [];
			let wuXueTaolu3 = [];
			for (let key in GameApp.MainPlayer.skillInfo) {
				let _skillBase = GameApp.MainPlayer.skillInfo[key];
				if (key == "999" || key == '1000') {
					continue;
				}
				let configID = _skillBase.configID;
				let deleteID = SheetConfig.mydb_magic_tbl.getInstance(null).DELETED(configID);
				if (deleteID == 1) {
					return;
				}
				let isActive = SheetConfig.mydb_magic_tbl.getInstance(null).ACTIVE_PASSIVE(configID);
				if (isActive == 0) {
					continue;
				}
				let skillType = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLTYPE(configID);
				switch (skillType) {
					// 通用   拳脚
					case 0:
						wuXueTaolu0.push(_skillBase);
						break;
					// 刀剑
					case 1:
						wuXueTaolu1.push(_skillBase);
						break;
					// 长兵
					case 2:
						wuXueTaolu2.push(_skillBase);
						break;
					// 奇门
					case 3:
						wuXueTaolu3.push(_skillBase);
						break;
				}
			}
			this.aLLskillData = {
				0: [].concat(wuXueTaolu0, wuXueTaolu1, wuXueTaolu2, wuXueTaolu3),
				1: [].concat(wuXueTaolu0, wuXueTaolu1),
				2: [].concat(wuXueTaolu0, wuXueTaolu2),
				3: [].concat(wuXueTaolu0, wuXueTaolu3),
			}
			Log.trace(this.aLLskillData);
		}


		/**
		 * 渲染技能
		 * @param skillType 
		 * @param pageID 
		 */
		public showSkillPage(skillType, pageID) {
			//this.tempData.sort     ToDo...
			this.lab_totalNum.text = this.pageID + '/' + this.maxPage;
			// 每页12个
			this.list_skill.dataSource = [];
			let tmpSkillData = this.aLLskillData[skillType];
			// 考虑没有武学的情况
			this.box_empty.visible = (tmpSkillData.length == 0);
			this.lab_num.text = '武学数量:' + tmpSkillData.length;
			this.maxPage = Math.ceil(tmpSkillData.length / 12);
			if (this.maxPage == 0) {
				this.maxPage = 1;
			}
			if (tmpSkillData.length > (pageID - 1) * 12) {
				let maxIndex = Math.min(pageID * 12, tmpSkillData.length)
				for (let i = (pageID - 1) * 12; i < maxIndex; i++) {
					this.list_skill.dataSource.push(tmpSkillData[i]);
				}
			};
			this.list_skill.renderHandler = Laya.Handler.create(this, (item: WuXue_logoWithNameV1Item, index) => {
				item.setData(this.list_skill.dataSource[index]);
			}, null, false);
		}

		public addEvent() {
			// 基础武学养成
			this.btn_develop.on(Laya.UIEvent.CLICK, this, () => {
				new view.juese.Person_WuXueBaseDialog().popup();
			})
			// 设置默认武学套路
			this.btn_setTaolu.on(Laya.UIEvent.CLICK, this, () => {
				if (this.skillType == GameApp.MainPlayer.defaultTaoLuID) {
					return
				}
				let pkt1 = new ProtoCmd.AvatarSetSkillShortCutsEnDeCoder();
				// 第四行第一个标记
				pkt1.setValue('oldcol', 0);
				pkt1.setValue('oldrow', 4);
				pkt1.shortcuts.emShortCuts = 1;
				pkt1.shortcuts.i64Id = ProtoCmd.Int64.numberToInt64(this.skillType)
				pkt1.shortcuts.btCol = 0;
				pkt1.shortcuts.btRow = 4;
				lcp.send(pkt1);
			})

			this.btn_last.on(Laya.UIEvent.CLICK, this, () => {
				if (this.pageID > 1) {
					this.pageID--;
				} else {
					TipsManage.showTips('已经是第一页了')
					return;
				}
				this.showSkillPage(this.skillType, this.pageID);
			})
			this.btn_next.on(Laya.UIEvent.CLICK, this, () => {
				if (this.pageID < this.maxPage) {
					this.pageID++;
				} else {
					TipsManage.showTips('已经是最后一页了')
					return;
				}
				this.showSkillPage(this.skillType, this.pageID);
			})
			// 监听切换套路
			GameApp.LListener.on(view.wuXue.WuXue_Skill_Circle.skillAdd + '40', this, () => {
				if (GameApp.MainPlayer.skillShotButton[400]) {
					this.updateDefaultTaoLuID()
				}
			})
		}

		public destroy(isbool = true) {
			GameApp.LListener.offCaller(view.wuXue.WuXue_Skill_Circle.skillAdd + '40', this)
			super.destroy(true);
		}



		/**
		 * 比對当前是否已有
		 * @param skillID 
		 */
		public removeOtherSkill(skillBase) {
			for (let i = 1; i < 7; i++) {
				let tempUI: WuXue_Skill_Circle = this['ui_SkillCircle' + i];
				if (tempUI.skillItemBase == skillBase) {
					tempUI.removeSkillItem();
					return
				}

			}
		}

		/**
		 * 判定技能是否在区域内 
		 * @param item
		 */
		public compareHit(item: WuXue_logoWithNameV1Item) {
			let point = new Laya.Point(item.x + item.width / 2, item.y + item.height / 2);
			item.removeSelf();
			for (let i = 1; i < 7; i++) {
				let tempUI: WuXue_Skill_Circle = this['ui_SkillCircle' + i];
				let isIntempUI = tempUI.hitTestPoint(point.x, point.y);
				if (isIntempUI) {
					this.removeOtherSkill(item.skillBase);
					// 考虑其他技能快捷键有没有
					tempUI.addSkillItem(item);
					return true
				}
			}
			// 不在这里面
			// 删除技能
			for (let i = 1; i < 7; i++) {
				let tempUI: WuXue_Skill_Circle = this['ui_SkillCircle' + i];
				if (tempUI.skillItemBase == item.skillBase) {
					tempUI.removeSkillItem()
					return false
				}
			}
		}
	}
}