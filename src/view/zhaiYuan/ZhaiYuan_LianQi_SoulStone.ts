/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_LianQi_SoulStone extends ui.zhaiYuan.ZhaiYuan_LianQi_SoulStoneUI {
		public TouchID = 0;
		private allData;//下面的面板十个item数据
		private msgData;//上面的面板的详细信息数 
		public type = 0;
		public hasFull = false;
		private equipNameArr = ['头盔', '项链', '衣服', '武器', '左手镯', '右手镯', '左戒指', '右戒指', '鞋子', '裤子']


		private canActive: boolean = false;  //能否激活
		private statAllSoulStoneLv = [];     //所有魂石的  不同lv总和  分阶段的effID的数组
		private curSoulStoneLv: number = 0;  //当前魂石的等级总和；
		private curOneOfSoulStoneLv: number = 0;
		private curSoulStoneID: number = 1;  //当前是第几颗魂石
		//魂石升阶时用来 获取当前应该发送的升阶ID
		private curSoulStoneIDChooseArr = [1, 2, 3, 1, 2, 3, 1, 2, 3, 4, 4, 4, 1, 2, 3, 4, 5, 5, 5, 5, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]

		constructor() {
			super();
			this.allData = GameApp.GameEngine.mainPlayer.playersoulStoneLevel;
			this.setData();
			this.addEvent();
		}
		public setData() {

			this.getData_PlayerEquipMsg(0)
			this.vbox_eff0['sortItem'] = (items) => { };
			this.vbox_eff1['sortItem'] = (items) => { };
			// this.upDateView(0, 0);
		}
		public addEvent() {
			// this.tab_down.on(Laya.UIEvent.CLICK, this, () => {
			// 	this.type = this.tab_down.selectedIndex;
			// 	this.TouchID = 0;
			// 	this.getData_PlayerEquipMsg(this.TouchID)
			// })

			EventManage.onWithEffect(this.btn_recharge, Laya.UIEvent.CLICK, this, () => {
				let o = new juese.Person_BuyAndUseItem();

			});
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
			GameApp.LListener.on(ProtoCmd.soulStoneLevel, this, (data: ProtoCmd.itf_JS_soulStoneLevel) => {
				this.statAllSoulStoneLv = [];
				this.curSoulStoneLv = 0;
				GameApp.GameEngine.mainPlayer.playersoulStoneLevel = data;
				this.allData = GameApp.GameEngine.mainPlayer.playersoulStoneLevel;
				// curSoulStoneIDChooseArr
				let baselvldata = null;
				this.curOneOfSoulStoneLv = 0;
				baselvldata = this.allData.playerlvl

				for (let i = 1; i < 7; i++) {
					this.curOneOfSoulStoneLv += baselvldata[this.TouchID][i]
				}
				if (this.curOneOfSoulStoneLv == 72) {
					this.curSoulStoneID = 1
				} else {
					this.curSoulStoneID = this.curSoulStoneIDChooseArr[this.curOneOfSoulStoneLv];
				}
				this.getData_EquipPanelMsg(this.TouchID);
				for (let i = 1; i < 13; i++) {
					this.statAllSoulStoneLv.push(this.allData.soulchaintab[i].effid)
				}
			})
		}
		//刷新面板
		public upDateView(type, Touchindex) {
			let curCostNum;
			let costName;
			let costCount;
			let arr = ["强化", "激活", "升阶", "进阶", "获取"]
			for (let i = 0; i < 10; i++) {
				this["ui_equip" + i].img_icon.skin = "image/common/daoju/itemicon_bg_" + (i + 10) + ".png";
				this["ui_equip" + i].lab_name.text = this.equipNameArr[i];
			}
			this.ui_centerIcon.img_icon.skin = "image/common/daoju/itemicon_bg_" + (this.TouchID + 10) + ".png";
			this.ui_centerIcon.img_circle.visible = false;

			for (let i in this.allData.openlvl) {
				if (this.allData.openlvl[i].pbj == 0) {
					this["ui_equip" + i].btn_icon.gray = true;
					this["ui_equip" + i].img_lock.visible = true;
					this["ui_equip" + i].img_lv_mask.visible = false;

				} else if (this.allData.openlvl[i].pbj == 1) {
					this["ui_equip" + i].btn_icon.gray = false;
					this["ui_equip" + i].img_lock.visible = false;
					this["ui_equip" + i].img_lv_mask.visible = true;
					let num = 0;
					for (let p in this.allData.playerlvl[i]) {
						num += this.allData.playerlvl[i][p];
					}
					this["ui_equip" + i].lab_lv.text = '+ ' + num;

				}
			}
			curCostNum = GameUtil.findItemInBag(this.allData.openlvl[this.TouchID].item.index, GameApp.GameEngine.bagItemDB);
			// costName = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(this.allData.openlvl[this.TouchID].item.index.toString())
			costCount = this.allData.openlvl[this.TouchID].item.num;
			if (this.allData.openlvl[this.TouchID].pbj == 0) {
				this.ui_centerIcon.btn_icon.gray = true;
				this.ui_centerIcon.img_lock.visible = true;
				this.ui_centerIcon.img_lv_mask.visible = false;

				this.btn_intensify.label = "激活";
				this.box_cost_active.visible = true;
				this.box_cost_up.visible = false;
				let skinID = SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(this.allData.openlvl[this.TouchID].item.index + '')
				this.img_icon.skin = 'image/common/daoju/itemicon_' + skinID + '.png';
				let myItemNum = GameUtil.findItemInBag(this.allData.openlvl[this.TouchID].item.index, GameApp.GameEngine.bagItemDB);
				this.lab_cost_Text.text = this.allData.openlvl[this.TouchID].item.num + '/' + myItemNum;
				this.canActive = myItemNum > this.allData.openlvl[this.TouchID].item.num
			} else {
				this.ui_centerIcon.btn_icon.gray = false;
				this.ui_centerIcon.img_lock.visible = false;
				this.ui_centerIcon.img_lv_mask.visible = true;
				let num = 0;
				for (let p in this.allData.playerlvl[this.TouchID]) {
					num += this.allData.playerlvl[this.TouchID][p];
				}
				this.ui_centerIcon.lab_lv.text = '+ ' + num;

				this.box_cost_active.visible = false;
				this.box_cost_up.visible = true;
				this.btn_intensify.label = "升阶";
				this.btn_intensify.label = arr[2];
				this.lab_needCost.text = this.msgData.needexp + '';
				this.lab_curHave.text = this.msgData.curexp + '';
			}
			let baseLvData = this.allData.playerlvl;
			for (let i in baseLvData) {
				for (let o in baseLvData[i]) {
					this.curSoulStoneLv += baseLvData[i][o];
				}
			}
			let k = Math.floor(this.curSoulStoneLv / 60);
			this.lab_jieduan.text = "(" + this.curSoulStoneLv + "/" + (k + 1) * 60 + ")"
			//根据K获取effid     this.statAllSoulStoneLv
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


			//更新   上面面板的详细信息
			this.onPageContent1();
		}
		//拉取新的上面面板面板单个item信息
		public getData_EquipPanelMsg(touchid) {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.soulStonePanel, [this.type, this.TouchID, this.curSoulStoneID], 0, this,
				(data) => {
					// GameApp.GameEngine.equipPanelMsg = data;
					this.msgData = data;
					this.upDateView(this.type, this.TouchID);
				});
			lcp.send(pkt);
		}
		//更新   上面面板的详细信息
		public onPageContent1() {
			let arr;
			arr = this.allData.playerlvl;

			let aa = arr[this.TouchID];
			if (this.curOneOfSoulStoneLv < 9) {
				this.setSoulStoneState(3)
			} else if (this.curOneOfSoulStoneLv > 8 && this.curOneOfSoulStoneLv < 16) {
				this.setSoulStoneState(4)
			}
			else if (this.curOneOfSoulStoneLv > 15 && this.curOneOfSoulStoneLv < 25) {
				this.setSoulStoneState(5)
			} else if (this.curOneOfSoulStoneLv > 24) {
				this.setSoulStoneState(6)
			}
			// this.lab_attact.text = "";
			//用当前位置的id转换为服务器ID
			this.hasFull = false;

			let num = 0;
			for (let p in this.allData.playerlvl[this.TouchID]) {
				num += this.allData.playerlvl[this.TouchID][p];
			}
			if (num < 72) {
				this.hasFull = false;
				this.box_level.visible = true;
				this.lab_full_Level.visible = false;
				this.lab_curLevel.text = num + '';
				this.lab_nextLevel.text = (num + 1) + '';
			} else {
				this.hasFull = true;
				this.box_level.visible = false;
				this.lab_full_Level.visible = true;
			}
			let baseArr = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
			let useID = baseArr[this.TouchID];
			this.showEffect();
		}
		public showEffect() {

			let Soul_LV0_Num = 0;
			this.vbox_eff0.removeChildren();
			this.vbox_eff1.removeChildren();
			for (let i = 1; i < 7; i++) {
				this['img_increase' + i].visible = false
			}
			let stoneLV = this.allData.playerlvl[this.TouchID][this.curSoulStoneID];//0-12 lv
			if (this.allData.openlvl[this.TouchID].pbj == 0) {
				this.box_eff_show.visible = false;
				this.lab_lock_show.visible = true;
			} else {
				this.box_eff_show.visible = true;
				this.lab_lock_show.visible = false;
				for (let i = 1; i < 7; i++) {
					let soul_oneOf_Lv = this.allData.playerlvl[this.TouchID][i] //魂石每一个球的等级
					if (soul_oneOf_Lv == 0) {
						Soul_LV0_Num++
					}
				}
				if (Soul_LV0_Num < 3) {
					for (let i = 1; i < 7; i++) {
						let soul_oneOf_Lv = this.allData.playerlvl[this.TouchID][i] //魂石每一个球的等级
						let effid0 = this.allData.SoulStoneTab[i] + soul_oneOf_Lv + (GameApp.GameEngine.mainPlayer.job - 1) * 1000 - 1
						let effData0 = GameUtil.parseEffectidToObj([effid0 + ""]);
						if (this.vbox_eff0.numChildren == this.vbox_eff1.numChildren) {
							this.vbox_eff0.addChild(new view.compart.SinglePropsItem().setData(effData0.des[0]));
						} else if (this.vbox_eff0.numChildren > this.vbox_eff1.numChildren) {
							this.vbox_eff1.addChild(new view.compart.SinglePropsItem().setData(effData0.des[0]));
						}
						if (!this.hasFull) {
							let effid1 = this.allData.SoulStoneTab[this.curSoulStoneID] +soul_oneOf_Lv + 1 + (GameApp.GameEngine.mainPlayer.job - 1) * 1000 - 1
							let effData1 = GameUtil.parseEffectidToObj([effid1 + ""]);
							if (i == this.curSoulStoneID) {
								if (effData0.des[0].onlyValue) {
									let span = effData1.des[0].value - effData0.des[0].value;
									this['img_increase' + i].visible = true
									this['lab_upNum' + i].text = span + '';
								} else {
									let span0 = effData1.des[0].min - effData0.des[0].min
									let span1 = (effData1.des[0].max - effData0.des[0].max)
									this['img_increase' + i].visible = true
									this['lab_upNum' + i].text = span0 + "-" + span1;
								}
							}
						}
					}
				} else if (Soul_LV0_Num >= 3) {
					for (let i = 1; i < 4; i++) {
						let effData0;
						let effid1 = this.allData.SoulStoneTab[i] + 1 + (GameApp.GameEngine.mainPlayer.job - 1) * 1000 - 1
						let effData1 = GameUtil.parseEffectidToObj([effid1 + ""]);
						let tempData = GameUtil.parseEffectidToObj([effid1 + ""])
						effData0 = tempData;
						if (effData0.des[0].onlyValue) {
							effData0.des[0].value = 0;
							let span = effData1.des[0].value - effData0.des[0].value;
							if (this.curSoulStoneID == i) {
								this['img_increase' + i].visible = true
								this['lab_upNum' + i].text = span + '';
								effData0.des[0].des = effData0.des[0].label + "<span style='color:#00ff00;font-weight:bold;'>" + 0 + "</span>"
							}
						} else {
							effData0.des[0].min = 0;
							effData0.des[0].max = 0;
							let span0 = effData1.des[0].min - effData0.des[0].min
							let span1 = (effData1.des[0].max - effData0.des[0].max)
							if (this.curSoulStoneID == i) {
								this['img_increase' + i].visible = true
								this['lab_upNum' + i].text = span0 + "-" + span1;
								effData0.des[0].des = effData0.des[0].label + "<span style='color:#00ff00;font-weight:bold;'>" + effData0.des[0].min + "</span>- <span style='color:#00ff00;font-weight:bold;'>" + effData0.des[0].max + "</span>"

							}
						}
						if (this.vbox_eff0.numChildren == this.vbox_eff1.numChildren) {
							this.vbox_eff0.addChild(new view.compart.SinglePropsItem().setData(effData0.des[0]));
						} else if (this.vbox_eff0.numChildren > this.vbox_eff1.numChildren) {
							this.vbox_eff1.addChild(new view.compart.SinglePropsItem().setData(effData0.des[0]));
						}
					}
				}
			}
		}
		public setEffect() {

			let Soul_LV0_Num = 0;
			this.vbox_eff0.removeChildren();
			this.vbox_eff1.removeChildren();
			for (let i = 1; i < 7; i++) {
				this['img_increase' + i].visible = false
			}
			if (this.allData.openlvl[this.TouchID].pbj == 0) {
				this.box_eff_show.visible = false;
				this.lab_lock_show.visible = true;
			} else {
				this.box_eff_show.visible = true;
				this.lab_lock_show.visible = false;
				if (this.allData.playerlvl[this.TouchID][6] < 12) {
					for (let i = 1; i < 7; i++) {
						let soul_oneOf_Lv = this.allData.playerlvl[this.TouchID][i] //魂石每一个球的等级
						if (soul_oneOf_Lv > 0) {
							if (soul_oneOf_Lv < 72) {
								this.allData.SoulStoneTab[i];    //原本魂石对应的effid
								let effid0 = this.allData.SoulStoneTab[i] + soul_oneOf_Lv + (GameApp.GameEngine.mainPlayer.job - 1) * 1000 - 1
								let effData0 = GameUtil.parseEffectidToObj([effid0 + ""]);
								let effid1 = this.allData.SoulStoneTab[i] + soul_oneOf_Lv + 1 + (GameApp.GameEngine.mainPlayer.job - 1) * 1000 - 1
								let effData1 = GameUtil.parseEffectidToObj([effid1 + ""]);
								if (this.vbox_eff0.numChildren == this.vbox_eff1.numChildren) {
									this.vbox_eff0.addChild(new view.compart.SinglePropsItem().setData(effData0.des[0]));
								} else if (this.vbox_eff0.numChildren > this.vbox_eff1.numChildren) {
									this.vbox_eff1.addChild(new view.compart.SinglePropsItem().setData(effData0.des[0]));
								}
								if (effData0.des[0].onlyValue) {
									let span = effData1.des[0].value - effData0.des[0].value;
									if (this.curSoulStoneID == i) {
										this['img_increase' + i].visible = true
										this['lab_upNum' + i].text = span + '';
									}
								} else {
									let span0 = effData1.des[0].min - effData0.des[0].min
									let span1 = (effData1.des[0].max - effData0.des[0].max)
									if (this.curSoulStoneID == i) {
										this['img_increase' + i].visible = true
										this['lab_upNum' + i].text = span0 + "-" + span1;
									}
								}
							}
						} else {
							Soul_LV0_Num++;
						}
					}

				}
				else if (this.allData.playerlvl[this.TouchID][6] == 12) {
					for (let i = 1; i < 7; i++) {
						let soul_oneOf_Lv = this.allData.playerlvl[this.TouchID][i] //魂石每一个球的等级
						this.allData.SoulStoneTab[i];    //原本魂石对应的effid
						let effid0 = this.allData.SoulStoneTab[i] + soul_oneOf_Lv + (GameApp.GameEngine.mainPlayer.job - 1) * 1000 - 1
						let effData0 = GameUtil.parseEffectidToObj([effid0 + ""]);
						if (this.vbox_eff0.numChildren == this.vbox_eff1.numChildren) {
							this.vbox_eff0.addChild(new view.compart.SinglePropsItem().setData(effData0.des[0]));
						} else if (this.vbox_eff0.numChildren > this.vbox_eff1.numChildren) {
							this.vbox_eff1.addChild(new view.compart.SinglePropsItem().setData(effData0.des[0]));
						}
					}
				}
			}

		}
		//设置上面面板显示多少个魂石
		private setSoulStoneState(id: number) {
		}
		//获取面板信息
		private getData_PlayerEquipMsg(touchID) {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.soulStoneLevel, null)
			lcp.send(pkt);
		}
		//发送激活、升阶请求
		private sendIntensify() {
			if (this.btn_intensify.label == "激活") {
				if (this.canActive) {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.SoulStoneActive, [this.type, this.TouchID, 1]);
					lcp.send(pkt);
				} else {
					TipsManage.showTips("灵魂之石不足，无法激活！")
				}
			} else if (this.btn_intensify.label == "升阶") {
				// curSoulStone
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.upgradeSoulStone, [this.type, this.TouchID, this.curSoulStoneID, 0])
				lcp.send(pkt);
			}
		}
		public destroy(e = true) {
			GameApp.LListener.offCaller(ProtoCmd.soulStoneLevel, this);
			super.destroy(e)
		}

	}
}