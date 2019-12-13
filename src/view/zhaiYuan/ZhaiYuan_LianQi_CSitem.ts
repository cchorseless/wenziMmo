/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_LianQi_CSitem extends ui.zhaiYuan.ZhaiYuan_LianQi_CSitemUI {
		private TouchID = 0;      //   (0-9)ItemID
		private allData;//下面的面板十个item数据
		private msgData;//上面的面板的详细信息数 
		private curHasActive: boolean = false;
		private curHasEquip: boolean = false;
		private canUpLvCS0: boolean = false;
		private canUpLvCS1: boolean = false;
		private tempItemData = null;
		public isFullLv = false;
		public curStageNum = 1;

		public curStatus = 0;  //0:为获取 1:待激活 2:待强化
		private useDataID = 13;
		private curEquipDataCS = 0;
		private equipNameArr = ['头盔', '项链', '衣服', '武器', '左手镯', '右手镯', '左戒指', '右戒指', '鞋子', '裤子']

		constructor() {
			super();
			this.img_chuanshi_equip.img_circle.visible = false;
			this.setData();
			this.addEvent();
		}
		public setData() {
			// this.upDateView(0, 0);
			this.vbox_eff0['sortItem'] = (items) => { };
			this.vbox_eff1['sortItem'] = (items) => { };
			this.getData_PlayerEquipMsg(0)
		}
		public addEvent(): void {
			for (let i = 0; i < 10; i++) {
				this["ui_equip" + i].on(Laya.UIEvent.CLICK, this, () => {
					this.TouchID = i;
					// this.chooseItem();
					this.getData_PlayerEquipMsg(this.TouchID)
				})
			}
			EventManage.onWithEffect(this.btn_intensify, Laya.UIEvent.CLICK, this, () => {
				this.sendIntensify();
			});
			GameApp.LListener.on(LcpEvent.UPDATE_UI_LIANQI_CHUANSHI_UI, this, () => {
				this.getData_PlayerEquipMsg(this.TouchID);
			})

			// this.btn_add0.on(Laya.UIEvent.CLICK, this, function () {

			// })
			// this.btn_add1.on(Laya.UIEvent.CLICK, this, function () {

			// })
		}
		//刷新面板
		private upDateView(touchid) {
			this.box_up0.visible = false;
			this.box_up1.visible = false;

			let curCostNum;
			let costName;
			let costCount;
			let arr = ["强化", "觉醒", "升阶", "进阶", "获取"]
			for (let i = 0; i < 10; i++) {
				// this["ui_equip" + i].btn_icon.gray = false;
				this["ui_equip" + i].img_icon.skin = "image/common/daoju/itemicon_bg_" + (i + 10) + ".png";
				this['ui_equip' + i].lab_name.text = this.equipNameArr[i];
			}
			this.curHasActive = false;
			//用当前位置的id转换为服务器ID
			let baseArr = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
			this.useDataID = baseArr[this.TouchID]
			// if (this.useDataID == 15) {
			// 	this.useDataID = 14;
			// }
			// else if (this.useDataID == 17) {
			// 	this.useDataID = 16;
			// }
			let stateArr = {}
			let equipArr = {};

			for (let i in this.allData) {
				let o = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMPOSITION(this.allData[i].toString())
				stateArr[o] = GameUtil.findItemInBag(this.allData[i], GameApp.GameEngine.bagItemDB)
				equipArr[o] = this.allData[i]
			}
			stateArr[15] = stateArr[14];
			stateArr[17] = stateArr[16];
			equipArr[15] = equipArr[14];
			equipArr[17] = equipArr[16];
			let tempData = GameUtil.findEquipInPlayer(baseArr[this.TouchID]);
			this.curEquipDataCS = equipArr[this.useDataID]
			this.tempItemData = GameUtil.findItemInfoInBag(equipArr[this.useDataID], GameApp.GameEngine.bagItemDB)
			if (tempData) {
				this.curHasEquip = true
				this.curHasActive = true;
			} else if (!tempData) {
				if (stateArr[this.useDataID] > 0) {
					this.curHasEquip = true
					this.curHasActive = false;
				} else if (stateArr[this.useDataID] <= 0) {
					this.curHasEquip = false
				}
			}
			if (this.curHasEquip) {
				if (this.curHasActive) {
					this.curStatus = 2;
					this.btn_intensify.label = arr[3];
					this.img_chuanshi_equip.img_icon.skin = "image/common/daoju/itemicon_bg_" + (this.TouchID + 10) + ".png";
					this.img_chuanshi_equip.btn_icon.gray = false;
					this.img_chuanshi_equip.img_lock.visible = false;
					this.img_chuanshi_equip.lab_name.text = this.equipNameArr[this.TouchID];
					this.img_chuanshi_equip.lab_stageNum.visible = true;
					this.img_chuanshi_equip.img_lv_mask.visible = false;

					let basePos = baseArr[this.TouchID]
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.legednEquipPanel, [basePos], 0, this, (data) => {
						this.msgData = data;
						this.showCSPanel();
					})
					lcp.send(pkt);
					let bid = baseArr[this.TouchID]
					if (bid == 15) {
						bid = 14
					}
					if (bid == 17) {
						bid = 16
					}
					// this.lab_itemName3.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(equipArr[this.useDataID].toString())
				} else {
					this.curStatus = 1;
					this.lab_full_Level.visible = true;
					this.lab_full_Level.text = '待激活';
					this.box_level.visible = false;



					this.btn_intensify.label = arr[1];
					this.img_chuanshi_equip.img_icon.skin = "image/common/daoju/itemicon_bg_" + (this.TouchID + 10) + ".png";
					this.img_chuanshi_equip.btn_icon.gray = true;
					this.img_chuanshi_equip.lab_name.text = this.equipNameArr[this.TouchID];
					this.img_chuanshi_equip.img_lock.visible = true;
					this.img_chuanshi_equip.lab_stageNum.visible = false;
					this.img_chuanshi_equip.img_lv_mask.visible = false;
					this.box_up0.visible = true;
					let weaponID = equipArr[baseArr[this.TouchID]]
					let equipskinID = SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(weaponID + '');
					// this.img_icon0.skin = "image/common/daoju/itemicon_" + equipskinID + ".png";
					// this.lab_cost_Text0.text = 1 + " / " + 1;
					this.lab_cost_forge0.text = '觉醒消耗'

					let itemBase = new ProtoCmd.ItemBase();
					itemBase.dwBaseID = weaponID;
					let costStr1 = 1 + " / " + 1;
					let o1 = new compart.DaoJuCostItem();
					o1.setData(itemBase, true, costStr1, 1)
					this.box_up0.addChild(o1);
				}
			} else if (!this.curHasEquip) {
				this.curStatus = 0;
				this.lab_full_Level.visible = true;
				this.lab_full_Level.text = '待获取';
				this.box_level.visible = false;

				this.btn_intensify.label = arr[4];
				this.img_chuanshi_equip.img_icon.skin = "image/common/daoju/itemicon_bg_" + (this.TouchID + 10) + ".png";
				this.img_chuanshi_equip.btn_icon.gray = true;
				this.img_chuanshi_equip.img_lock.visible = true;
				this.img_chuanshi_equip.img_lv_mask.visible = false;
				this.img_chuanshi_equip.lab_stageNum.visible = false;
				this.img_chuanshi_equip.lab_name.text = this.equipNameArr[this.TouchID];
				this.box_up0.visible = true;
				// this["ui_equip" + this.TouchID]
				this.box_up0.visible = true;
				let weaponID = equipArr[baseArr[this.TouchID]];
				let equipskinID = SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(weaponID + '');
				// this.img_icon0.skin = "image/common/daoju/itemicon_" + equipskinID + ".png";
				let itemBase = new ProtoCmd.ItemBase();
				itemBase.dwBaseID = weaponID;
				let costStr2 = 0 + " / " + 1;
				let o2 = new compart.DaoJuCostItem();
				this.lab_cost_forge0.text = '需要获取'
				o2.setData(itemBase, false, costStr2, 1)
				this.box_up0.addChild(o2);
			}
			// this.lab_cost_forge.text = ""


			for (let i = 0; i < 10; i++) {
				let curHasEquip;
				let curHasActive;
				let baseData = GameUtil.findEquipInPlayer(baseArr[i]);
				this.curEquipDataCS = equipArr[baseArr[i]]
				// this.tempItemData = GameUtil.findItemInfoInBag(equipArr[baseArr[i]], GameApp.GameEngine.bagItemDB)
				if (baseData) {
					curHasEquip = true
					curHasActive = true;
				} else if (!tempData) {
					if (stateArr[this.useDataID] > 0) {
						curHasEquip = true
						curHasActive = false;
					} else if (stateArr[this.useDataID] <= 0) {
						curHasEquip = false
					}
				}
				if (curHasEquip) {
					if (curHasActive) {
						this['ui_equip' + i].btn_icon.gray = false;
						this['ui_equip' + i].img_lock.visible = false;
						this['ui_equip' + i].img_lv_mask.visible = false;
						this['ui_equip' + i].lab_stageNum.visible = true;

						let itemBase = GameUtil.findEquipInPlayer(baseArr[i]);
						let itemBaseID = itemBase.dwBaseID;

						this.curStageNum = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJIESHU(itemBaseID + '');
						this['ui_equip' + i].lab_stageNum.text = this.curStageNum + '阶';
						if (i == this.TouchID) {
							this.img_chuanshi_equip.lab_stageNum.text = this.curStageNum + '阶';
							if (this.curStageNum >= 5) {
								this.isFullLv = true;
								this.box_level.visible = false;
								this.lab_full_Level.visible = true;
								this.lab_full_Level.text = '已满级';
								this.box_up0.visible = false;
								this.lab_cost_forge0.visible = false;
								this.box_up1.visible = false;
								this.lab_cost_forge1.visible = false;


							} else {
								this.isFullLv = false;
								this.box_level.visible = true;
								this.lab_full_Level.visible = false;
								this.lab_curLevel.text = this.curStageNum + '';
								this.lab_nextLevel.text = (this.curStageNum + 1) + '';
							}
						}
						// this.lab_itemName3.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(equipArr[this.useDataID].toString())
					} else {
						this['ui_equip' + i].btn_icon.gray = true;
						this['ui_equip' + i].img_lock.visible = true;
						this['ui_equip' + i].img_lv_mask.visible = false;
						this['ui_equip' + i].lab_stageNum.visible = false;
					}
				} else if (!curHasEquip) {
					this['ui_equip' + i].btn_icon.gray = true;
					this['ui_equip' + i].img_lock.visible = true;
					this['ui_equip' + i].img_lv_mask.visible = false;
					this['ui_equip' + i].lab_stageNum.visible = false;
					// this["ui_equip" + this.TouchID]
				}
			}
			//升级;             所需要的金币消耗
			// this.lab_goldCost.text = "消耗金币：" + this.msgData.gold;
			//选中时;           item金色的框是否显示 --选中状态            
			for (let i = 0; i < 10; i++) {
				if (i == this.TouchID) {
					this["ui_equip" + i].img_circle.visible = true
				} else {
					this["ui_equip" + i].img_circle.visible = false;
				}
			}
			this.onPageContent2()

		}
		//更新上面面板信息
		public onPageContent2() {
			for (let i = 1; i < 7; i++) {
				this['img_increase' + i].visible = false
			}
			this.vbox_eff0.removeChildren();
			this.vbox_eff1.removeChildren();
			let effid0;
			let effid1;
			let effData0;
			let effData1;
			if (this.isFullLv) {
				if (GameApp.GameEngine.mainPlayer.job == 1) {
					effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB1_EFFICTID(this.curEquipDataCS.toString())
				} else if (GameApp.GameEngine.mainPlayer.job == 2) {
					effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB2_EFFICTID(this.curEquipDataCS.toString())
				} else if (GameApp.GameEngine.mainPlayer.job == 3) {
					effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB3_EFFICTID(this.curEquipDataCS.toString())
				}
				effData0 = GameUtil.parseEffectidToObj([effid0 + ""]);
				for (let i = 0; i < effData0.des.length; i++) {
					if (this.vbox_eff0.numChildren == this.vbox_eff1.numChildren) {
						this.vbox_eff0.addChild(new view.compart.SinglePropsItem().setData(effData0.des[i]));
					} else if (this.vbox_eff0.numChildren > this.vbox_eff1.numChildren) {
						this.vbox_eff1.addChild(new view.compart.SinglePropsItem().setData(effData0.des[i]));
					}
				}

			} else {
				if (this.curStatus == 0 || this.curStatus == 1) {
					if (GameApp.GameEngine.mainPlayer.job == 1) {
						effid1 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB1_EFFICTID((this.curEquipDataCS + 1).toString())
					} else if (GameApp.GameEngine.mainPlayer.job == 2) {
						effid1 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB2_EFFICTID((this.curEquipDataCS + 1).toString())
					} else if (GameApp.GameEngine.mainPlayer.job == 3) {
						effid1 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB3_EFFICTID((this.curEquipDataCS + 1).toString())
					}
					effData1 = GameUtil.parseEffectidToObj([effid1 + ""]);
					let temp = GameUtil.parseEffectidToObj([effid1 + ""]);
					effData0 = temp;
					for (let i = 0; i < effData0.des.length; i++) {
						if (effData0.des[i].onlyValue) {
							effData0.des[i].value = 0;
							let span = effData1.des[i].value - effData0.des[i].value;
							effData0.des[i].des = effData0.des[i].label + "<span style='color:#00ff00;font-weight:bold;'>" + 0 + "</span>"
							this['img_increase' + (i + 1)].visible = true
							this['lab_upNum' + (i + 1)].text = span + '';
						} else {
							effData0.des[i].min = 0;
							effData0.des[i].max = 0;
							let span0 = effData1.des[i].min - effData0.des[i].min
							let span1 = (effData1.des[i].max - effData0.des[i].max)
							effData0.des[i].des = effData0.des[i].label + "<span style='color:#00ff00;font-weight:bold;'>" + effData0.des[i].min + "</span>- <span style='color:#00ff00;font-weight:bold;'>" + effData0.des[i].max + "</span>"
							this['img_increase' + (i + 1)].visible = true
							this['lab_upNum' + (i + 1)].text = span0 + "-" + span1;
						}
						if (this.vbox_eff0.numChildren == this.vbox_eff1.numChildren) {
							this.vbox_eff0.addChild(new view.compart.SinglePropsItem().setData(effData0.des[i]));
						} else if (this.vbox_eff0.numChildren > this.vbox_eff1.numChildren) {
							this.vbox_eff1.addChild(new view.compart.SinglePropsItem().setData(effData0.des[i]));
						}
					}

				} else if (this.curStatus == 2) {
					if (GameApp.GameEngine.mainPlayer.job == 1) {
						effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB1_EFFICTID((this.curEquipDataCS + this.curStageNum - 1).toString())
						effid1 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB1_EFFICTID((this.curEquipDataCS + this.curStageNum).toString())
					} else if (GameApp.GameEngine.mainPlayer.job == 2) {
						effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB2_EFFICTID((this.curEquipDataCS + this.curStageNum - 1).toString())
						effid1 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB2_EFFICTID((this.curEquipDataCS + this.curStageNum).toString())
					} else if (GameApp.GameEngine.mainPlayer.job == 3) {
						effid0 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB3_EFFICTID((this.curEquipDataCS + this.curStageNum - 1).toString())
						effid1 = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB3_EFFICTID((this.curEquipDataCS + this.curStageNum).toString())
					}
					effData0 = GameUtil.parseEffectidToObj([effid0 + ""]);
					effData1 = GameUtil.parseEffectidToObj([effid1 + ""]);
					for (let i = 0; i < effData0.des.length; i++) {
						if (this.vbox_eff0.numChildren == this.vbox_eff1.numChildren) {
							this.vbox_eff0.addChild(new view.compart.SinglePropsItem().setData(effData0.des[i]));
						} else if (this.vbox_eff0.numChildren > this.vbox_eff1.numChildren) {
							this.vbox_eff1.addChild(new view.compart.SinglePropsItem().setData(effData0.des[i]));
						}
						if (effData1.des[i]) {
							if (effData0.des[i].onlyValue) {
								let span = effData1.des[i].value - effData0.des[i].value;
								this['img_increase' + (i + 1)].visible = true
								this['lab_upNum' + (i + 1)].text = span + '';
							} else {
								let span0 = effData1.des[i].min - effData0.des[i].min
								let span1 = (effData1.des[i].max - effData0.des[i].max)
								this['img_increase' + (i + 1)].visible = true
								this['lab_upNum' + (i + 1)].text = span0 + "-" + span1;
							}
						}


					}

				}

			}
		}
		//重新获取面板信息
		private getData_PlayerEquipMsg(touchID) {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.legednEquipBaseid, null, 0, this, (data) => {
				this.allData = data;
				this.getData_EquipPanelMsg(this.TouchID)
			})
			lcp.send(pkt);
		}
		//刷新面板
		public getData_EquipPanelMsg(itemID: number) {
			this.upDateView(this.TouchID);
		}
		//发送激活、进阶请求 
		private sendIntensify() {
			//用当前位置的id转换为服务器ID
			let baseArr = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
			if (this.btn_intensify.label == "觉醒") {
				this.dressEquip(this.tempItemData)
			} else if (this.btn_intensify.label == "获取") {
				TipsManage.showTips("暂无该装备，请先前往藏宝阁获取哦~")
			} else if (this.btn_intensify.label == "进阶") {
				if (this.isFullLv) {
					TipsManage.showTips("该装备已满级！")
					return;
				}
				if (GameApp.GameEngine.mainPlayer.zslevel < this.msgData.zslvl) {
					TipsManage.showTips("未达到传世等级");
					return
				} else if (!this.canUpLvCS0 || !this.canUpLvCS1) {

					TipsManage.showTips("资源数量不足");

					return;
				} else {
					let basePos = baseArr[this.TouchID]
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.advanceLegendEquip, [basePos], 0, this, (data) => {
						let a = data;
						this.allData = null;
						this.msgData = null;
						this.getData_PlayerEquipMsg(this.TouchID)
					})
					lcp.send(pkt);
				}

			}
		}
		//穿戴装备
		private dressEquip(obj) {
			let packet = new ProtoCmd.CretProcessingItem();
			packet.setValue('dwtmpid', GameApp.MainPlayer.tempId);
			packet.setValue('i64ItemId', obj.i64ItemID);
			packet.srcLocation = obj.location;
			packet.destLocation.btLocation = EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP;
			// 双手镯双戒指可以通用位置需要特殊处理

			let itemPosition = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMPOSITION('' + obj.dwBaseID);
			switch (itemPosition) {
				// 左边
				case EnumData.emEquipPosition.EQUIP_LEGEND_BRACELET_LEFT:

					if (GameApp.GameEngine.equipDBIndex[itemPosition] && !GameApp.GameEngine.equipDBIndex[itemPosition + 1]) {
						itemPosition += 1;
					}
					break;
				// 右边
				case EnumData.emEquipPosition.EQUIP_LEGEND_BRACELET_RIGHT:		//传说右手镯

					if (GameApp.GameEngine.equipDBIndex[itemPosition] && !GameApp.GameEngine.equipDBIndex[itemPosition - 1]) {
						itemPosition -= 1;
					}
					break;
				case EnumData.emEquipPosition.EQUIP_LEGEND_RING_LEFT:		//传说左戒指

					if (GameApp.GameEngine.equipDBIndex[itemPosition] && !GameApp.GameEngine.equipDBIndex[itemPosition + 1]) {
						itemPosition += 1;
					}
					break;
				case EnumData.emEquipPosition.EQUIP_LEGEND_RING_RIGHT:		//传说右戒指

					if (GameApp.GameEngine.equipDBIndex[itemPosition] && !GameApp.GameEngine.equipDBIndex[itemPosition - 1]) {
						itemPosition -= 1;
					}
					break;
			}
			packet.destLocation.btIndex = itemPosition;
			lcp.send(packet);
		}
		//显示 下面的消耗数值
		private showCSPanel() {
			if (this.msgData != null || this.msgData != undefined) {
				let costName = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(this.msgData.drillid.toString())
				let curCostNum = GameUtil.findItemInBag(this.msgData.drillid, GameApp.GameEngine.bagItemDB);
				let costName1 = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(this.msgData.soulid.toString())
				let curCostNum1 = GameUtil.findItemInBag(this.msgData.soulid, GameApp.GameEngine.bagItemDB);
				let costCount = this.msgData.drillnum;
				let costCount1 = this.msgData.soulnum;
				let skinID0 = SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(this.msgData.drillid.toString())
				let skinID1 = SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(this.msgData.soulid.toString())
				if (curCostNum >= costCount) {
					this.canUpLvCS0 = true;
					// this.btn_add0.visible = false;
				} else {
					this.canUpLvCS0 = false;
					// this.btn_add0.visible = true;
				}
				if (curCostNum1 >= costCount1) {
					this.canUpLvCS1 = true;
					// this.btn_add1.visible = false;
				} else {
					this.canUpLvCS1 = false;
					// this.btn_add1.visible = true;
				}
				if (costCount > 0) {
					this.box_up0.visible = true;
					this.lab_cost_forge0.visible = true;
					this.lab_cost_forge0.text = "进阶消耗";
					// this.lab_cost_Text0.text = costCount + " / " + curCostNum;
					// this.img_icon0.skin = 'image/common/daoju/itemicon_' + skinID0 + '.png';
					let itemBase = new ProtoCmd.ItemBase();
					itemBase.dwBaseID = this.msgData.drillid;
					let o = new compart.DaoJuCostItem();
					let costStr = curCostNum + '/' + costCount;
					o.setData(itemBase, this.canUpLvCS0, costStr, 1)
					this.box_up0.addChild(o);

				} else {
					this.box_up0.visible = false;
					this.lab_cost_forge0.visible = false;
				}
				if (costCount1 > 0) {
					this.box_up1.visible = true;
					this.lab_cost_forge1.visible = true;
					this.lab_cost_forge1.text = "进阶消耗"
					let itemBase = new ProtoCmd.ItemBase();
					itemBase.dwBaseID = this.msgData.soulid;
					let o = new compart.DaoJuCostItem();
					let costStr = curCostNum1 + '/' + costCount1;
					o.setData(itemBase, this.canUpLvCS1, costStr, 1)
					this.box_up1.addChild(o);
				} else {
					this.box_up1.visible = false;
					this.lab_cost_forge1.visible = false;
				}
			} else {
				this.box_up0.visible = false;
				this.lab_cost_forge0.visible = false;
				this.box_up1.visible = false;
				this.lab_cost_forge1.visible = false;
			}
		}
		public destroy(e = true) {
			GameApp.LListener.offCaller(LcpEvent.UPDATE_UI_LIANQI_CHUANSHI_UI, this);
			super.destroy(e)
		}





	}
}