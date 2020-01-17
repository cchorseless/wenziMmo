/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_WaiGong_VS_Info extends ui.wuXue.WuXue_WaiGong_VS_InfoUI {
		public static SkillDown_Create = 'SkillDown_Create'
		public static SkillMove = 'SkillMove'
		public skillItem: WuXue_logoWithNameItem = null;
		public wuXueTaolu0 = [];
		public wuXueTaolu1 = [];
		public wuXueTaolu2 = [];
		public wuXueTaolu3 = [];

		public unlockNeed = 30;

		public pageID = 1;
		public maxPage = 1;
		public isTouch = false;
		public beginX = 0;
		public endX = 0;
		public tempData = [];

		public touchTaoLuID = -1;
		public touchSkillShowID = -1;

		public skillCircleArr = []
		// 	(this.ui_SkillCircle1.x,this.ui_SkillCircle1.y),
		// 	(this.ui_SkillCircle1.x,this.ui_SkillCircle1.y),
		// 	(this.ui_SkillCircle1.x,this.ui_SkillCircle1.y),
		// 	(this.ui_SkillCircle1.x,this.ui_SkillCircle1.y),
		// 	(this.ui_SkillCircle1.x,this.ui_SkillCircle1.y),
		// 	(this.ui_SkillCircle1.x,this.ui_SkillCircle1.y)
		// ]


		public isTouchSkillCircle = false;

		public isTouchSkillShow = false;

		public taoLuID;
		constructor() {
			super();
			// this.panel_skill.hScrollBarSkin = '';
			this.addEvent();

		}
		public setPosArr() {
			for (let i = 1; i < 7; i++) {
				let base = this['ui_SkillCircle' + i];
				let point = new Laya.Point(this['ui_SkillCircle' + i].x, this['ui_SkillCircle' + i].y);
				// let point1 = point.stageX
				// let pos1 = this.globalToLocal(point1);
				let arr = [base.x - base.width / 2, base.x + base.width / 2, base.y - base.height / 2, base.y + base.height / 2]
				let arrY = [base.y - base.height / 2, base.y + base.height / 2]
				this.skillCircleArr.push(arr);
			}
			// this.hitTestPoint(60.5, 203)
			// console.log(this.skillCircleArr)
		}
		public setData(id) {
			if (id == GameApp.MainPlayer.defaultTaoLuID) {
				this.btn_setTaolu.label = '默认出战套路'
			} else {
				this.btn_setTaolu.label = '设置出战套路'
			}
			let textArr = ['拳脚', '刀剑', '长兵', '奇门']
			let str = '';
			if (id == 0) {
				str = '全部武学';
			} else {
				str = '拳脚类和' + textArr[id] + '类武学可装配此套路'
			}
			this.lab_taoluText.text = str
			this.taoLuID = id;
			let myLv = GameApp.MainPlayer.level;
			let unlockNum = Math.floor(myLv / this.unlockNeed);
			for (let i = 1; i < 7; i++) {
				if (i <= unlockNum) {
					let key = id * 100 + i - 1
					if (GameApp.MainPlayer.skillShotButton[key]) {
						let skill = GameApp.MainPlayer.skillShotButton[key].i64Id.int64ToNumber();
						let skillBase = GameApp.MainPlayer.skillInfo[(skill + '')];
						this['ui_SkillCircle' + i].setData(true, i, skillBase)
					} else {
						this['ui_SkillCircle' + i].setData(true, i)
					}
				} else {
					this['ui_SkillCircle' + i].setData(false, i)
				}
			}
			this.setPanelData()
			this.setPosArr();
		}
		public setPanelData() {
			this.wuXueTaolu0 = [];
			this.wuXueTaolu1 = [];
			this.wuXueTaolu2 = [];
			this.wuXueTaolu3 = [];

			for (let key in GameApp.MainPlayer.skillInfo) {
				let _skillBase = GameApp.MainPlayer.skillInfo[key];
				if (key == "999" || key == '1000') {
					continue;
				}
				// _skillBase.getValue('sublevel')
				let configID = _skillBase.configID;
				let deleteID = SheetConfig.mydb_magic_tbl.getInstance(null).DELETED(configID);
				if (deleteID == 1) {
					return;
				}
				let skillType = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLED_OCCUPATION(configID);
				switch (skillType) {
					// 通用   拳脚
					case 0:
						this.wuXueTaolu0.push(_skillBase);
						break;
					// 刀剑
					case 1:
						this.wuXueTaolu1.push(_skillBase);
						break;
					// 长兵
					case 2:
						this.wuXueTaolu2.push(_skillBase);
						break;
					// 奇门
					case 3:
						this.wuXueTaolu3.push(_skillBase);
						break;
				}
			}
			this.showPanel()
		}
		public showPanel() {
			switch (this.taoLuID) {
				case 0:
					this.tempData = this.wuXueTaolu0;
					this.tempData = this.tempData.concat(this.wuXueTaolu1);
					this.tempData = this.tempData.concat(this.wuXueTaolu2);
					this.tempData = this.tempData.concat(this.wuXueTaolu3);
					break;
				case 1:
					this.tempData = this.wuXueTaolu1.concat(this.wuXueTaolu0);
					break;
				case 2:
					this.tempData = this.wuXueTaolu2.concat(this.wuXueTaolu0);
					break;
				case 3:
					this.tempData = this.wuXueTaolu3.concat(this.wuXueTaolu0);
					break;
			}

			this.getSkillComBo();
			this.lab_num.text = '武学数量:' + this.tempData.length;

			this.maxPage = Math.ceil(this.tempData.length / 12)
			if (this.maxPage == 0) {
				this.maxPage = 1;
			}
			// this.lab_num.text = this.pageID+ '/' + this.maxPage;
			if (this.tempData.length < 1) {
				this.box_empty.visible = true;
			} else {
				this.box_empty.visible = false;
			}
			this.showPage();
		}
		public getSkillComBo() {
			let arr = [];
			for (let i = 0; i < this.tempData.length; i++) {
				let baseID = this.tempData[i].configID;
				let comboID = SheetConfig.mydb_magic_tbl.getInstance(null).COMBINATION_SKILLSID(baseID);
				if (!comboID) {
					return;
				}
				let comboIdArr = comboID.split('`')
				for (let o = 0; o < comboIdArr.length; o++) {
					if (parseInt(comboIdArr[o]) > 0) {
						let tempID = SheetConfig.Skill_combination.getInstance(null).EFFECTID(parseInt(comboIdArr[o]));
						arr.push(tempID);
					}
				}


			}
			if (arr.length <= 0) {
				return;
			}
			arr = arr.sort(function (a, b) {
				return (a - b);
			});
			let data = {};
			for (let i = 0; i < arr.length;) {
				let count = 0;
				for (let j = i; j < arr.length; j++) {
					if (arr[i] == arr[j]) {
						count++;
					}
				}
				data[arr[i]] = count
				i += count;
			}
			GameApp.MainPlayer.comboTypeByPage[GameApp.MainPlayer.taoluPageID] = data

		}
		public showPage() {
			//this.tempData.sort     ToDo...
			this.lab_totalNum.text = this.pageID + '/' + this.maxPage;
			for (let i = 0; i < 12; i++) {
				if (this.tempData[i + (this.pageID - 1) * 12]) {
					let configID = this.tempData[i + (this.pageID - 1) * 12].configID;
					this['ui_' + i].setData(configID);
				} else {
					this['ui_' + i].setData(-1);
				}
			}
		}
		public addEvent() {
			let self = this;
			this.btn_develop.on(Laya.UIEvent.CLICK, this, function () {
				new view.juese.Person_WuXueBaseDialog().popup();
			})
			this.btn_setTaolu.on(Laya.UIEvent.CLICK, this, () => {
				// let skillID = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(this.skillItem.configID)
				let pkt1 = new ProtoCmd.AvatarSetSkillShortCutsEnDeCoder();
				pkt1.setValue('oldcol', 0);
				pkt1.setValue('oldrow', 4);
				pkt1.shortcuts.emShortCuts = 1;
				let skill = 100 + GameApp.MainPlayer.taoluPageID;
				pkt1.shortcuts.i64Id = ProtoCmd.Int64.numberToInt64(GameApp.MainPlayer.taoluPageID)
				pkt1.shortcuts.btCol = 0;
				pkt1.shortcuts.btRow = 4;
				lcp.send(pkt1);
			})
			// GameApp.LListener.on(ProtoCmd.WX_upData_Hotkeys_waigong, this, function () {
			// 	// self.setData(GameApp.MainPlayer.taoluPageID)
			// })
			this.btn_last.on(Laya.UIEvent.CLICK, this, function () {
				if (this.pageID > 1) {
					this.pageID--;
				} else {
					TipsManage.showTips('已经是第一页了')
					return;
				}
				this.showPage();
			})
			this.btn_next.on(Laya.UIEvent.CLICK, this, function () {
				if (this.pageID < this.maxPage) {
					this.pageID++;
				} else {
					TipsManage.showTips('已经是最后一页了')
					return;
				}
				this.showPage();
			})
			for (let i = 1; i < 7; i++) {
				this['ui_SkillCircle' + i].ui_show.on(Laya.Event.MOUSE_DOWN, this, function (e) {
					self.isTouchSkillCircle = true
					self.touchTaoLuID = i;
					Laya.timer.once(700, this, function () {
						if (!self.isTouchSkillCircle) {
							return;
						}
						if (self.skillItem) {
							self.removeChild(self.skillItem);
						}
						self.skillItem = new WuXue_logoWithNameItem()
						self.skillItem.setData(self['ui_SkillCircle' + i].skillID);
						let point1 = new Laya.Point(e.stageX, e.stageY);
						let pos = this.globalToLocal(point1);
						self.skillItem.x = pos.x;
						self.skillItem.y = pos.y;
						self.addChild(self.skillItem)
					})
				})
				this['ui_SkillCircle' + i].on(Laya.Event.MOUSE_MOVE, this, function (e) {
					if (self.isTouchSkillCircle && self.touchTaoLuID == i) {
						if (self['ui_SkillCircle' + i].skillID) {
							if (self.skillItem) {
								self.skillItem.startDrag()
							} else {
								return;
							}
						} else {
							self.isTouchSkillCircle = false
							return;
						}

					}
				})
				this.on(Laya.Event.MOUSE_UP, this, function (e) {
					if (self.isTouchSkillCircle && self.touchTaoLuID > 0) {
						if (!self.skillItem) {
							self.isTouchSkillCircle = false;
							self.touchTaoLuID = -1;
							return;
						}
						self['ui_SkillCircle' + i].ui_show.stopDrag();
						self.compareHit(e);
					}
				})
			}
			for (let i = 0; i < 12; i++) {
				this['ui_' + i].on(Laya.Event.MOUSE_DOWN, this, function (e) {
					self.isTouchSkillShow = true
					self.touchSkillShowID = i;

					Laya.timer.once(700, this, function () {
						if (!self.isTouchSkillShow) {
							return;
						}
						if (self.skillItem) {
							self.removeChild(self.skillItem);
						}
						this['ui_' + i].disable = true;
						self.skillItem = new WuXue_logoWithNameItem()
						self.skillItem.setData(self['ui_' + i].configID);
						let point1 = new Laya.Point(e.stageX, e.stageY);
						let pos = this.globalToLocal(point1);
						self.skillItem.x = pos.x;
						self.skillItem.y = pos.y;
						self.addChild(self.skillItem)
					})

				})
				this['ui_' + i].on(Laya.Event.MOUSE_MOVE, this, function (e) {
					if (self.isTouchSkillShow) {
						if (!self.skillItem) {
							return;
						}
						self.skillItem.startDrag()
					}
				})
				this.on(Laya.Event.MOUSE_UP, this, function (e) {
					if (self.isTouchSkillShow && self.touchSkillShowID >= 0) {
						// self.compareHit(e);
						if (!self.skillItem) {
							let skill_USEid = this['ui_' + self.touchSkillShowID].configID
							if (skill_USEid > 0) {
								let id = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(this['ui_' + self.touchSkillShowID].configID)
								let o = new WuXue_InfoDialog();
								o.setData(GameApp.MainPlayer.skillInfo[id])
								o.popup();
							}
							self.isTouchSkillShow = false;
							self.touchSkillShowID = -1;
							return;
						}
						self.skillItem.stopDrag()
						self['ui_' + self.touchSkillShowID].disable = false;
						self.compareSkill(e);
					}
				})
			}
		}
		public compareSkill(e) {
			let point1 = new Laya.Point(e.stageX, e.stageY);
			let pos1 = this.globalToLocal(point1);
			let isChange = false;
			let changeIndex;  //将要替换的iconID
			for (let i = 1; i < 7; i++) {
				if (pos1.x >= this.skillCircleArr[i - 1][0] && pos1.x <= this.skillCircleArr[i - 1][1] && pos1.y >= this.skillCircleArr[i - 1][2] && pos1.y <= this.skillCircleArr[i - 1][3]) {
					isChange = true;
					changeIndex = i;
					break
				}
			}
			let skillArray = [
				this['ui_SkillCircle' + 1].skillID,
				this['ui_SkillCircle' + 2].skillID,
				this['ui_SkillCircle' + 3].skillID,
				this['ui_SkillCircle' + 4].skillID,
				this['ui_SkillCircle' + 5].skillID,
				this['ui_SkillCircle' + 6].skillID,
			];
			let isrRepeatSkill = false;;
			for (let i = 0; i < skillArray.length; i++) {
				if (this.skillItem.configID == skillArray[i]) {
					isrRepeatSkill = true;
				}
			}
			if (!isrRepeatSkill) {
				if (isChange) {
					//移动的目标框是否解锁了
					if (this['ui_SkillCircle' + changeIndex].unLock) {
						//移动的目标框的技能ID是否存在
						if (this['ui_SkillCircle' + changeIndex].skillID) {
							if (changeIndex == 5 || changeIndex == 6) {
								let mpCost = SheetConfig.mydb_magic_tbl.getInstance(null).CONSUMPTION_MANA(this.skillItem.configID)
								if (mpCost < 5) {
									TipsManage.showTips('该技能栏只能装备蓝耗5以上的技能');

									this.removeChild(this.skillItem);
									this.skillItem = null;
									this.isTouchSkillShow = false
									this.touchSkillShowID = -1;
									return;
								}
							}
							//脱技能
							let pkt = new ProtoCmd.AvatarDelSkillShortCutsEnDeCoder();
							pkt.shortcuts.btRow = GameApp.MainPlayer.taoluPageID;
							pkt.shortcuts.btCol = changeIndex - 1;
							lcp.send(pkt);
							//穿技能
							let skillID = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(this.skillItem.configID)
							let pkt1 = new ProtoCmd.AvatarSetSkillShortCutsEnDeCoder();
							pkt1.setValue('oldcol', changeIndex - 1);
							pkt1.setValue('oldrow', GameApp.MainPlayer.taoluPageID);
							pkt1.shortcuts.emShortCuts = 1;
							pkt1.shortcuts.i64Id = ProtoCmd.Int64.numberToInt64(skillID)
							pkt1.shortcuts.btCol = changeIndex - 1;
							pkt1.shortcuts.btRow = GameApp.MainPlayer.taoluPageID;
							lcp.send(pkt1);
							// this['ui_SkillCircle' + this.touchTaoLuID].setData(true, this.touchTaoLuID, this['ui_SkillCircle' + changeIndex].skillID)
						} else {
							//穿
							// this['ui_SkillCircle' + changeIndex].setData(this['ui_SkillCircle' + changeIndex].unLock, changeIndex, tempUI.configID)
							//穿技能
							if (changeIndex == 5 || changeIndex == 6) {
								let mpCost = SheetConfig.mydb_magic_tbl.getInstance(null).CONSUMPTION_MANA(this.skillItem.configID)
								if (mpCost < 5) {
									TipsManage.showTips('该技能栏只能装备蓝耗5以上的技能');
									this.removeChild(this.skillItem);
									this.skillItem = null;
									this.isTouchSkillShow = false
									this.touchSkillShowID = -1;
									return;
								}
							}
							let skillID = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(this.skillItem.configID)
							let pkt1 = new ProtoCmd.AvatarSetSkillShortCutsEnDeCoder();
							pkt1.setValue('oldcol', changeIndex - 1);
							pkt1.setValue('oldrow', GameApp.MainPlayer.taoluPageID);
							pkt1.shortcuts.emShortCuts = 1;
							pkt1.shortcuts.i64Id = ProtoCmd.Int64.numberToInt64(skillID)
							pkt1.shortcuts.btCol = changeIndex - 1;
							pkt1.shortcuts.btRow = GameApp.MainPlayer.taoluPageID;
							lcp.send(pkt1);
						}
					}
				}
			} else {
				TipsManage.showTips('该技能快捷键已存在')
			}

			this.removeChild(this.skillItem);
			this.skillItem = null;
			this.isTouchSkillShow = false
			this.touchSkillShowID = -1;
		}

		public compareHit(e) {
			let tempUI = this['ui_SkillCircle' + this.touchTaoLuID].ui_show
			let point1 = new Laya.Point(e.stageX, e.stageY);
			let pos1 = this.globalToLocal(point1);
			let isChange = false;
			let changeIndex;
			for (let i = 1; i < 7; i++) {
				if (pos1.x >= this.skillCircleArr[i - 1][0] && pos1.x <= this.skillCircleArr[i - 1][1] && pos1.y >= this.skillCircleArr[i - 1][2] && pos1.y <= this.skillCircleArr[i - 1][3]) {
					isChange = true;
					changeIndex = i;
					break
				}
			}
			this.removeChild(this.skillItem);
			this.skillItem = null;
			//是否移动到其他的框里
			if (isChange) {
				//移动的目标框是否解锁了
				if (this['ui_SkillCircle' + changeIndex].unLock) {
					//移动的目标框的技能ID是否存在
					if (this['ui_SkillCircle' + changeIndex].skillID) {
						if (changeIndex == 5 || changeIndex == 6) {
							let mpCost = SheetConfig.mydb_magic_tbl.getInstance(null).CONSUMPTION_MANA(this.skillItem.configID)
							if (mpCost < 5) {
								TipsManage.showTips('该技能栏只能装备蓝耗5以上的技能');
								this.isTouchSkillCircle = false
								this.touchTaoLuID = -1;
								return;
							}
						}
						let pkt = new ProtoCmd.AvatarDelSkillShortCutsEnDeCoder();
						pkt.shortcuts.btRow = this.taoLuID;
						pkt.shortcuts.btCol = changeIndex - 1;
						lcp.send(pkt);
						//穿技能
						let skillID = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(tempUI.configID)
						let pkt1 = new ProtoCmd.AvatarSetSkillShortCutsEnDeCoder();
						pkt1.setValue('oldcol', changeIndex - 1);
						pkt1.setValue('oldrow', GameApp.MainPlayer.taoluPageID);
						pkt1.shortcuts.emShortCuts = 1;
						pkt1.shortcuts.i64Id = ProtoCmd.Int64.numberToInt64(skillID)
						pkt1.shortcuts.btCol = changeIndex - 1;
						pkt1.shortcuts.btRow = GameApp.MainPlayer.taoluPageID;
						lcp.send(pkt1);

						let pkt2 = new ProtoCmd.AvatarDelSkillShortCutsEnDeCoder();
						pkt2.shortcuts.btRow = this.taoLuID;
						pkt2.shortcuts.btCol = this.touchTaoLuID - 1;
						lcp.send(pkt2);
						//穿技能
						let skillID1 = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(this['ui_SkillCircle' + changeIndex].skillID)
						let pkt3 = new ProtoCmd.AvatarSetSkillShortCutsEnDeCoder();
						pkt3.setValue('oldcol', this.touchTaoLuID - 1);
						pkt3.setValue('oldrow', GameApp.MainPlayer.taoluPageID);
						pkt3.shortcuts.emShortCuts = 1;
						pkt3.shortcuts.i64Id = ProtoCmd.Int64.numberToInt64(skillID1)
						pkt3.shortcuts.btCol = this.touchTaoLuID - 1;
						pkt3.shortcuts.btRow = GameApp.MainPlayer.taoluPageID;
						lcp.send(pkt3);
					} else {
						if (changeIndex == 5 || changeIndex == 6) {
							let mpCost = SheetConfig.mydb_magic_tbl.getInstance(null).CONSUMPTION_MANA(this.skillItem.configID)
							if (mpCost < 5) {
								TipsManage.showTips('该技能栏只能装备蓝耗5以上的技能');
								this.isTouchSkillCircle = false
								this.touchTaoLuID = -1;
								return;
							}
						}
						//脱技能
						let pkt = new ProtoCmd.AvatarDelSkillShortCutsEnDeCoder();
						pkt.shortcuts.btRow = this.taoLuID;
						pkt.shortcuts.btCol = this.touchTaoLuID - 1;
						lcp.send(pkt);
						//穿技能
						let skillID = SheetConfig.mydb_magic_tbl.getInstance(null).SKILL_ID(tempUI.configID)
						let pkt1 = new ProtoCmd.AvatarSetSkillShortCutsEnDeCoder();
						pkt1.setValue('oldcol', changeIndex - 1);
						pkt1.setValue('oldrow', GameApp.MainPlayer.taoluPageID);
						pkt1.shortcuts.emShortCuts = 1;
						pkt1.shortcuts.i64Id = ProtoCmd.Int64.numberToInt64(skillID)
						pkt1.shortcuts.btCol = changeIndex - 1;
						pkt1.shortcuts.btRow = GameApp.MainPlayer.taoluPageID;
						lcp.send(pkt1);
					}
				} else {
					// this['ui_SkillCircle' + this.touchTaoLuID].setData(true, this.touchTaoLuID)
					//脱技能
					let pkt = new ProtoCmd.AvatarDelSkillShortCutsEnDeCoder();
					pkt.shortcuts.btRow = GameApp.MainPlayer.taoluPageID;
					pkt.shortcuts.btCol = this.touchTaoLuID - 1;
					lcp.send(pkt);
				}
			} else {
				// this['ui_SkillCircle' + this.touchTaoLuID].setData(true, this.touchTaoLuID)
				//脱技能
				let pkt = new ProtoCmd.AvatarDelSkillShortCutsEnDeCoder();
				pkt.shortcuts.btRow = this.taoLuID;
				pkt.shortcuts.btCol = this.touchTaoLuID - 1;
				lcp.send(pkt);
			}
			this.isTouchSkillCircle = false
			this.touchTaoLuID = -1;
		}
	}
}