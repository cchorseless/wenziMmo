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

		public pageID = 1;
		public maxPage = 0;
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

		public taoLuID = 0;
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
			// this.hbox_skill0['sortItem'] = (items) => { };
			// this.hbox_skill1['sortItem'] = (items) => { };
			// this.hbox_skill2['sortItem'] = (items) => { };
			// this.hbox_skill3['sortItem'] = (items) => { };

			this.taoLuID = id;
			let myLv = GameApp.MainPlayer.level;
			let unlockNum = Math.floor(myLv / 10);
			for (let i = 1; i <= 6; i++) {
				if (i <= unlockNum) {
					let key = id * 100 + i - 1
					if (GameApp.MainPlayer.skillShotButton[key]) {
						let skill = GameApp.MainPlayer.skillShotButton[key].i64Id.int64ToNumber();
						let skillBase = GameApp.MainPlayer.skillInfo[(skill + '')];
						this['ui_SkillCircle' + i].setData(true, i, skillBase.configID)
					} else {
						this['ui_SkillCircle' + i].setData(true, i)
					}
				}
			}
			this.setPanelData()
			this.setPosArr();
		}
		public setPanelData() {
			for (let key in GameApp.MainPlayer.skillInfo) {
				let _skillBase = GameApp.MainPlayer.skillInfo[key];
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
			this.lab_totalNum.text = '武学数量:' + this.tempData.length;
			this.maxPage = Math.ceil(this.tempData.length / 12)
			this.showPage();
		}
		public showPage() {
			//this.tempData.sort     ToDo...
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
			for (let i = 1; i < 7; i++) {
				this['ui_SkillCircle' + i].ui_show.on(Laya.Event.MOUSE_DOWN, this, function (e) {
					self.isTouchSkillCircle = true
					self.touchTaoLuID = i;


					Laya.timer.once(1000, this, function () {
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
				// this['ui_SkillCircle' + i].startDrag();
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
						self.skillItem.stopDrag()
						self.removeChild(self.skillItem);
						self['ui_' + self.touchSkillShowID].disable = false;
						self.isTouchSkillShow = false;
					}
				})
			}

			this.panel_skill.on(Laya.Event.MOUSE_DOWN, this, function (e) {
				this.isTouch = true;
				this.beginX = e.stageX;
				let a = e.localToGlobal
			})
			this.panel_skill.on(Laya.Event.MOUSE_OUT, this, function (e) {
				if (this.isTouch) {
					this.isTouch = false
					this.endX = e.stageX;
					let span = this.endX - this.beginX;
					if (Math.abs(span) > 50) {
						this.dealPageChange(span);
					} else {
						return;
					}
				}
			})
			this.panel_skill.on(Laya.Event.MOUSE_UP, this, function (e) {
				if (this.isTouch) {
					this.isTouch = false
					this.endX = e.stageX;
					let span = this.endX - this.beginX;
					if (Math.abs(span) > 50) {
						this.dealPageChange(span);
					} else {
						return;
					}
				}
			})
		}
		public compareSkill(e) {

		}

		public compareHit(e) {
			let tempUI = this['ui_SkillCircle' + this.touchTaoLuID].ui_show
			// let point = new Laya.Point(tempUI.stageX, tempUI.stageY);
			let point1 = new Laya.Point(e.stageX, e.stageY);
			// let pos = this.globalToLocal(point);
			let pos1 = this.globalToLocal(point1);
			this.toParentPoint(point1);

			let isChange = false;
			let changeIndex;
			for (let i = 1; i < 7; i++) {
				if (pos1.x >= this.skillCircleArr[0]&&pos1.x <= this.skillCircleArr[1]&&pos1.y >= this.skillCircleArr[2]&&pos1.y <= this.skillCircleArr[3]) {
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
						this['ui_SkillCircle' + changeIndex].setData(this['ui_SkillCircle' + changeIndex].unLock, changeIndex, tempUI.configID)
						this['ui_SkillCircle' + this.touchTaoLuID].setData(true, this.touchTaoLuID, this['ui_SkillCircle' + changeIndex].skillID)
					} else {
						this['ui_SkillCircle' + changeIndex].setData(this['ui_SkillCircle' + changeIndex].unLock, changeIndex, tempUI.configID)
						this['ui_SkillCircle' + this.touchTaoLuID].setData(true, this.touchTaoLuID)
					}
				} else {
					this['ui_SkillCircle' + this.touchTaoLuID].setData(true, this.touchTaoLuID)
				}
			} else {
				this['ui_SkillCircle' + this.touchTaoLuID].setData(true, this.touchTaoLuID)
			}
			this.isTouchSkillCircle = false
			this.touchTaoLuID = -1;
		}
		// public 
		public dealPageChange(span) {
			this.hitTestPoint
			if (span > 0) {
				if (this.pageID > 1) {
					this.pageID--;
				} else {
					return;
				}
			} else {
				if (this.pageID < this.maxPage) {
					this.pageID++;
				} else {
					return;
				}
			}
			this.showPage();
		}
	}
}