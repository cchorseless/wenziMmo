/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_lianQiDialog extends ui.zhaiYuan.ZhaiYuan_lianQiDialogUI {
		private curPage = 0;      //   (0/1/2)强化、升阶、传世
		private type = 0;         //   (0/1)player、hero
		private TouchID = 0;      //   (0-9)ItemID
		private allData;//下面的面板十个item数据
		private msgData;//上面的面板的详细信息数 

		//强化相关的数据
		private lvNum = 3;//当前显示强化等级 详细信息
		private canIntensify: boolean = false; //能否强化


		//魂石相关数据
		private canActive: boolean = false;  //能否激活
		private statAllSoulStoneLv = [];     //所有魂石的  不同lv总和  分阶段的effID的数组
		private curSoulStoneLv: number = 0;  //当前魂石的等级总和；
		private curOneOfSoulStoneLv: number = 0;
		private curSoulStoneID: number = 1;  //当前是第几颗魂石
		private curSoulStoneIDChooseArr = [1, 2, 3, 1, 2, 3, 1, 2, 3, 4, 4, 4, 1, 2, 3, 4, 5, 5, 5, 5, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]

		//传世相关数据
		private curHasActive: boolean = false;
		private curHasEquip: boolean = false;
		private canUpLvCS0: boolean = false;
		private canUpLvCS1: boolean = false;
		private tempItemData = null
		private useDataID = 13;
		private curEquipDataCS = 0;

		constructor() {
			super();
			this.group = 'ZhaiYuan_lianQiDialog';
			this.allData = GameApp.GameEngine.mainPlayer.playerEquipIntensify;
			this.msgData = GameApp.GameEngine.equipPanelMsg;
			this.setData();
			this.addEvent();
		}
		public setData() {
			this.vbox_0['sortItem'] = (items) => { };
			this.vbox_1['sortItem'] = (items) => { };
			this.upDateView(0, 0, 0);
		}
		public addEvent(): void {
			//上面tab的切换事件  1：发送请求重新获取下面10个item的信息allData / GameApp.GameEngine.mainPlayer.playerEquipIntensify     
			// 继而获取上面面板的详细信息msgData / GameApp.GameEngine.equipPanelMsg  
			//2：根据获取的下面的数据刷新下面的数据allData  根据获取的上面的数据刷新上面的数据msgData
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {

				this.curPage = this.tab_top.selectedIndex;
				this.type = 0;
				this.TouchID = 0;
				this.allData = null;
				this.msgData = null;
				this.getData_PlayerEquipMsg(this.curPage, this.TouchID)
			}, null, false);

			this.tab_down.on(Laya.UIEvent.CLICK, this, () => {
				this.type = this.tab_down.selectedIndex;
				this.TouchID = 0;
				this.getData_PlayerEquipMsg(this.curPage, this.TouchID)
			})
			//下面tab的切换事件  1：发送请求重新获取上面面板的详细信息msgData / GameApp.GameEngine.equipPanelMsg 
			//2:根据获取的msgData数据 刷新上面的数据
			this.tab_down.selectHandler = Laya.Handler.create(this, (index) => {
				// this.vstack_down.selectedIndex = index;

			}, null, false);
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, this.onclose);

			this.tab_top.on(Laya.UIEvent.CLICK, this, () => {
				this.curPage = this.tab_top.selectedIndex;
			})
			for (let i = 0; i < 10; i++) {
				this["ui_equip" + i].on(Laya.UIEvent.CLICK, this, () => {
					this.TouchID = i;
					// this.chooseItem();
					this.getData_PlayerEquipMsg(this.curPage, this.TouchID)
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
				if (this.type == 0) {
					baselvldata = this.allData.playerlvl
				} else {
					baselvldata = this.allData.herolvl
				}
				for (let i = 1; i < 7; i++) {
					this.curOneOfSoulStoneLv += baselvldata[this.TouchID][i]
				}
				if (this.curOneOfSoulStoneLv == 72) {
					this.curSoulStoneID = 1
				} else {
					this.curSoulStoneID = this.curSoulStoneIDChooseArr[this.curOneOfSoulStoneLv];
				}
				this.getData_EquipPanelMsg(this.curPage, this.TouchID);
				for (let i = 1; i < 13; i++) {
					this.statAllSoulStoneLv.push(this.allData.soulchaintab[i].effid)
				}
			})
			GameApp.LListener.on(LcpEvent.UPDATE_UI_LIANQI_CHUANSHI_UI, this, () => {
				this.getData_PlayerEquipMsg(this.curPage, this.TouchID);
			})


		}
		public onclose(): void {
			GameApp.LListener.offCaller(ProtoCmd.soulStoneLevel, this);
			GameApp.LListener.offCaller(LcpEvent.UPDATE_UI_LIANQI_CHUANSHI_UI, this);
			this.close()
		}

		//更新界面显示  page 当前界面0、1、2；  type 类型 0、1 玩家、弟子  touchID  第几个item被点击了
		private upDateView(page: number, type: number, touchID: number) {

			// image/common/daoju/itemicon_bg_0.png			

			//确定ICON后放开注释  是个item的图标
			// for (let i = 0; i < 10; i++) {
			// 	this["ui_equip" + i].img_icon.skin = SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(baseData.playerjson[i]);
			// }
			//升级/强化          所需要消耗的道具
			let curCostNum;
			let costName;
			let costCount;
			let arr = ["强化", "激活", "升阶", "进阶", "获取"]
			this.btn_intensify.label = arr[page];
			for (let i = 0; i < 10; i++) {
				this["ui_equip" + i].btn_icon.gray = false;
				this["ui_equip" + i].img_icon.skin = "image/common/daoju/itemicon_bg_" + (i + 10) + ".png";
			}

			if (page == 0) {
				this.panel_1_UI.img_icon.skin = "image/common/daoju/itemicon_bg_" + (this.TouchID + 10) + ".png";
				this.panel_1_UI.img_circle.visible = false;
				curCostNum = GameUtil.findItemInBag(this.msgData.itemid, GameApp.GameEngine.bagItemDB);
				costName = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(this.msgData.itemid.toString())
				costCount = this.msgData.count;
				if (curCostNum >= costCount) {
					this.canIntensify = true
				}
				else {
					this.canIntensify = false;
				}
				this.lab_cost_forge.text = "消耗：" + costName + " (" + curCostNum + "/" + costCount + ")";

			} else if (page == 1) {
				this.ui_centerIcon.img_icon.skin = "image/common/daoju/itemicon_bg_" + (this.TouchID + 10) + ".png";
				this.ui_centerIcon.img_circle.visible = false;
				this.ui_jieduan.img_circle.visible = false;
				for (let i in this.allData.openlvl) {
					if (type == 0) {
						if (this.allData.openlvl[i].pbj == 0) {
							this["ui_equip" + i].btn_icon.gray = true;
						}
						else {
							this["ui_equip" + i].btn_icon.gray = false;
						}
					}
					else if (type == 1) {
						if (this.allData.openlvl[i].hbj == 0) {
							this["ui_equip" + i].btn_icon.gray = true;
						}
						else {
							this["ui_equip" + i].btn_icon.gray = false;
						}
					}

				}
				curCostNum = GameUtil.findItemInBag(this.allData.openlvl[this.TouchID].item.index, GameApp.GameEngine.bagItemDB);
				costName = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(this.allData.openlvl[this.TouchID].item.index.toString())
				costCount = this.allData.openlvl[this.TouchID].item.num;
				if (curCostNum >= costCount) {
					this.canActive = true
				}
				else {
					this.canActive = false;
				}

				this.lab_cost_forge.text = "激活消耗：" + costName + " (" + curCostNum + "/" + costCount + ")";
				if (this["ui_equip" + this.TouchID].btn_icon.gray == false) {
					this.btn_intensify.label = arr[2];
					this.lab_cost_forge.text = "升阶消耗：" + "(" + this.msgData.curexp + "/" + this.msgData.needexp + ")";
				}
				let baseLvData;
				if (this.type == 0) {
					baseLvData = this.allData.playerlvl;
				} else {
					baseLvData = this.allData.herolvl;
				}
				for (let i in baseLvData) {
					for (let o in baseLvData[i]) {
						this.curSoulStoneLv += baseLvData[i][o];
					}
				}
				let k = Math.floor(this.curSoulStoneLv / 60);
				this.lab_jieduan.text = "(" + this.curSoulStoneLv + "/" + (k + 1) * 60 + ")"
				//根据K获取effid     this.statAllSoulStoneLv
			}
			else if (page == 2) {
				this.curHasActive = false;
				let baseArr = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
				this.useDataID = baseArr[this.TouchID]
				if (this.useDataID == 15) {
					this.useDataID = 14;
				}
				else if (this.useDataID == 17) {
					this.useDataID = 16;
				}
				let stateArr = {}
				let equipArr = {};

				for (let i in this.allData) {
					let o = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMPOSITION(this.allData[i].toString())
					stateArr[o] = GameUtil.findItemInBag(this.allData[i], GameApp.GameEngine.bagItemDB)
					equipArr[o] = this.allData[i]
				}
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
						this.btn_intensify.label = arr[3];
						this.img_chuanshi_equip.img_icon.skin = "image/common/daoju/itemicon_bg_" + (this.TouchID + 10) + ".png";
						this.img_chuanshi_equip.btn_icon.gray = false;
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
						this.lab_itemName3.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(equipArr[this.useDataID].toString())
					} else {
						this.btn_intensify.label = arr[1];
						this.img_chuanshi_equip.img_icon.skin = "image/common/daoju/itemicon_bg_" + (this.TouchID + 10) + ".png";
						this.img_chuanshi_equip.btn_icon.gray = true;
					}
				} else if (!this.curHasEquip) {
					this.btn_intensify.label = arr[4];
					this.img_chuanshi_equip.img_icon.skin = "image/common/daoju/itemicon_bg_" + (this.TouchID + 10) + ".png";
					this.img_chuanshi_equip.btn_icon.gray = true;
				}
				this.lab_cost_forge.text = ""
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


			//更新   上面面板的详细信息
			this.upDataViewContent();
		}
		//更新   上面面板的详细信息
		private upDataViewContent() {
			//是否显示type选择tab
			if (this.curPage != 2) {
				this.tab_down.visible = true;
			}
			else {
				this.tab_down.visible = false;
			}
			this.vstack_top.selectedIndex = this.curPage;
			if (this.curPage == 0) {
				this.onPageContent0();
			} else if (this.curPage == 1) {
				this.onPageContent1();
			} else if (this.curPage == 2) {
				this.onPageContent2()
			}

		}
		private showCSPanel() {

			let costName = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(this.msgData.drillid.toString())
			let curCostNum = GameUtil.findItemInBag(this.msgData.drillid, GameApp.GameEngine.bagItemDB);
			let costName1 = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(this.msgData.soulid.toString())
			let curCostNum1 = GameUtil.findItemInBag(this.msgData.soulid, GameApp.GameEngine.bagItemDB);
			let costCount = this.msgData.drillnum;
			let costCount1 = this.msgData.soulnum;
			if (curCostNum >= costCount) {
				this.canUpLvCS0 = true;
			}
			if (curCostNum1 >= costCount1) {
				this.canUpLvCS1 = true;
			}
			if (costCount1 <= 0) {
				this.lab_cost_forge.text = "消耗：" + costName + " (" + curCostNum + " / " + costCount + ")";
			} else {
				this.lab_cost_forge.text = "消耗：" + costName + " (" + curCostNum + " / " + costCount + ";" + costName + ":" + curCostNum1 + " / " + costCount1 + ")";
			}


		}
		//强化
		public onPageContent0() {
			let baseArr = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
			let useID = baseArr[this.TouchID]
			let starSkin = ["image/common/fram_common_22_finish.png", "image/common/fram_common_38_finish.png", "", "", "", ""]
			this.lab_showForgeLevel_1.text = "";
			this.lab_1_increase.text = "";
			this.lab_luckyText.text = "当前成功率：";

			this.lab_equipText.text = "(" + this.onShowIntensifyNum() + "/10)";


			let effid0 = this.allData.ISPosEffidTab[useID - 10] + this.msgData.lvl + (GameApp.GameEngine.mainPlayer.job - 1) * 1000 - 1
			let effData0 = GameUtil.parseEffectidToObj([effid0 + ""])
			let effid1 = this.allData.ISPosEffidTab[useID - 10] + this.msgData.lvl + 1 + (GameApp.GameEngine.mainPlayer.job - 1) * 1000 - 1
			let effData1 = GameUtil.parseEffectidToObj([effid1 + ""])
			this.lab_attack0.text = effData0.battle[GameApp.GameEngine.mainPlayer.job].toString()
			this.lab_attack1.text = effData1.battle[GameApp.GameEngine.mainPlayer.job].toString()
			this.vbox_0.removeChildren();
			if (effData0.des.length > 0) {
				for (let i = 0; i < effData0.des.length; i++) {
					this.vbox_0.addChild(new view.compart.SinglePropsItem().setData(effData0.des[i]));
				}
			}
			this.vbox_1.removeChildren();
			if (effData1.des.length > 0) {
				for (let i = 0; i < effData1.des.length; i++) {
					this.vbox_1.addChild(new view.compart.SinglePropsItem().setData(effData0.des[i]));
				}
			}




			this.panel_1_UI.img_circle.visible = false;
			for (let i = 0; i < 5; i++) {
				let aa = Math.floor(this.msgData.lvl / 5);
				let ss = this.msgData.lvl % 5;
				this["btn_Star" + i].skin = starSkin[aa];
				if (ss > i) {
					this["btn_Star" + i].disabled = false;
					this["btn_Star" + i].selected = true;
				} else {
					this["btn_Star" + i].disabled = true;
					this["btn_Star" + i].selected = false;
				}
			}
		}
		//升阶
		public onPageContent1() {
			let arr;
			if (this.type == 0) {
				arr = this.allData.playerlvl;
			} else {
				arr = this.allData.herolvl;
			}

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
			for (let i = 1; i < 7; i++) {
				this["html_soul_" + i].innerHTML = "";
			}
			this.lab_attact.text = "";
			let baseArr = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
			let useID = baseArr[this.TouchID];
			let attackNum = 0;
			if (this.type == 0) {
				for (let i = 1; i < 7; i++) {
					let soul_oneOf_Lv = this.allData.playerlvl[this.TouchID][i] //魂石每一个球的等级
					if (soul_oneOf_Lv > 0) {
						this.allData.SoulStoneTab[i];    //原本魂石对应的effid
						let effid0 = this.allData.SoulStoneTab[i] + soul_oneOf_Lv + (GameApp.GameEngine.mainPlayer.job - 1) * 1000 - 1
						let effData = GameUtil.parseEffectidToObj([effid0 + ""]);
						attackNum += effData.battle[GameApp.GameEngine.mainPlayer.job];
						// let str = effData.des[0];
						// let loc = str.indexOf(":")
						// let str1 = str.substring(0, loc + 1);
						// let str2 = str.substring(loc + 1, str.length)
						this.list_shengjie.array = [];
						if (soul_oneOf_Lv >= 12) {
							this.list_shengjie.array = effData.des;
							this.list_shengjie.itemRender = view.compart.SinglePropsItem;
							this.list_shengjie.renderHandler = Laya.Handler.create(this, (cell: view.compart.SinglePropsItem, index) => {
								cell.setData(cell.dataSource.des);
							}, null, false)
							// this["html_soul_" + i].innerHTML = "<span style='color:#000000;font-family:KaiTi;fontSize:22;stroke:0.2;strokeColor:#000000'>" + str1 + "</span>"
							// 	+ "<span style='color:#63491a;font-family:KaiTi;fontSize:22;stroke:0.2;strokeColor:#000000'>" + str2 + "</span>"
						} else {
						// 	let effData1 = GameUtil.parseEffectidToObj(this.allData.SoulStoneTab[i] + soul_oneOf_Lv + 1 + (GameApp.GameEngine.mainPlayer.job - 1) * 1000 - 1 + "")
						// 	let span = parseInt(effData1.des[0].substring(loc + 1, effData1.des[0].length)) - parseInt(str2);
						// 	this["html_soul_" + i].innerHTML = "<span style='color:#000000;font-family:KaiTi;fontSize:22;stroke:0.2;strokeColor:#000000'>" + str1 + "</span>"
						// 		+ "<span style='color:#63491a;font-family:KaiTi;fontSize:22;stroke:0.2;strokeColor:#000000'>" + str2 + "</span>"
						// 		+ "<span style='color:#179a0d;font-family:KaiTi;fontSize:22;stroke:0.2;strokeColor:#000000'>" + "+" + span + "</span>";
						}
					}
				}
			}
			this.lab_attact.text = attackNum.toString();
		}
		//传世
		public onPageContent2() {
			let effid;
			for (let i = 1; i < 6; i++) {
				// this.html_3_1
				this["html_3_" + i].innerHTML = "";
			}
			if (GameApp.GameEngine.mainPlayer.job == 1) {
				effid = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB1_EFFICTID(this.curEquipDataCS.toString())
			} else if (GameApp.GameEngine.mainPlayer.job == 2) {
				effid = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB2_EFFICTID(this.curEquipDataCS.toString())
			} else if (GameApp.GameEngine.mainPlayer.job == 3) {
				effid = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB3_EFFICTID(this.curEquipDataCS.toString())
			}
			let effData = GameUtil.parseEffectidToObj([effid + ""])
			this.list_chuanshi.array = [];
			this.list_chuanshi.array = effData.des;
			this.list_chuanshi.itemRender = view.compart.SinglePropsItem;
			this.list_chuanshi.renderHandler = Laya.Handler.create(this, (cell: view.compart.SinglePropsItem, index) => {
				cell.setData(cell.dataSource.des);
			}, null, false)
		}
		//page2 上面面板的显示状态
		private setSoulStoneState(id: number) {
			for (let i = 3; i < 7; i++) {
				if (i == id) {
					this["box_hunshi" + i].visible = true;
				} else {
					this["box_hunshi" + i].visible = false;
				}
			}
			// this.img_hunshi3_1
			// this.lab_hunshi3_lv1
			let baseData;
			if (this.type == 0) {
				baseData = this.allData.playerlvl[this.TouchID];
			} else {
				baseData = this.allData.herolvl[this.TouchID]
			}
			for (let i = 1; i < id + 1; i++) {
				// this["img_hunshi" + id + "_" + i].skin = ""
				let str = baseData[i];
				this["lab_hunshi" + id + "_lv" + i].text = str + "阶"
			}
		}


		//获取当前强化阶段3、5、7、9、11、13、15
		private onShowIntensifyNum(): number {
			let aa;
			let lv3 = 0;
			let lv5 = 0;
			let lv7 = 0;
			let lv9 = 0;
			let lv11 = 0;
			let lv13 = 0;
			let lv15 = 0;
			if (this.type == 1) {
				aa = this.allData.herojson;
			}
			else {
				aa = this.allData.playerjson;
			}
			for (let i in aa) {
				if (aa[i] >= 3) {
					lv3++;
					if (aa[i] >= 5) {
						lv5++;
						if (aa[i] >= 7) {
							lv7++;
							if (aa[i] >= 9) {
								lv9++;
								if (aa[i] >= 11) {
									lv11++;
									if (aa[i] >= 13) {
										lv13++;
										if (aa[i] >= 15) {
											lv15++;
										}
									}
								}
							}
						}
					}


				}
			}
			if (lv15 == 10) {
				this.lvNum = 15;
				return lv15;
			}
			else if (lv13 == 10) {
				this.lvNum = 13;
				return lv13;
			}
			else if (lv11 == 10) {
				this.lvNum = 11;
				return lv11;
			}
			else if (lv9 == 10) {
				this.lvNum = 9;
				return lv9;
			}
			else if (lv7 == 7) {
				this.lvNum = 7;
				return lv7;
			}
			else if (lv5 == 10) {
				this.lvNum = 5;
				return lv5;
			}
			else if (lv3 <= 10) {
				this.lvNum = 3;
				return lv3;
			}
		}





		//下面十个 item 数据   index  0:强化  1：升阶（魂石）  2：传世
		private getData_PlayerEquipMsg(pageID: number, touchID) {
			if (pageID == 0) {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.sendEquipIntensify, null, 0, this,
					(data: ProtoCmd.itf_JS_equipIntensifyMessage) => {
						GameApp.GameEngine.mainPlayer.playerEquipIntensify = data;
						this.allData = GameApp.GameEngine.mainPlayer.playerEquipIntensify;
						this.getData_EquipPanelMsg(pageID, this.TouchID)
					});
				lcp.send(pkt);
			} else if (pageID == 1) {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.soulStoneLevel, null)
				lcp.send(pkt);

			} else if (pageID == 2) {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.legednEquipBaseid, null, 0, this, (data) => {
					this.allData = data;
					this.getData_EquipPanelMsg(2, this.TouchID)
				})
				lcp.send(pkt);


			}
		}
		//上面板子content的数据  id: 面板ID
		private getData_EquipPanelMsg(pageID: number, itemID: number) {
			if (pageID == 0) {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.IntensifyPanel, [this.type, itemID], 0, this,
					(data: ProtoCmd.itf_JS_equipPanelMsg) => {
						GameApp.GameEngine.equipPanelMsg = data;
						this.msgData = GameApp.GameEngine.equipPanelMsg;
						this.upDateView(this.curPage, this.type, this.TouchID);
					});
				lcp.send(pkt);
			} else if (pageID == 1) {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.soulStonePanel, [this.type, this.TouchID, this.curSoulStoneID], 0, this,
					(data) => {
						// GameApp.GameEngine.equipPanelMsg = data;
						this.msgData = data;
						this.upDateView(this.curPage, this.type, this.TouchID);
					});
				lcp.send(pkt);
				// this.upDateView(this.curPage, this.type, this.TouchID);

			} else if (pageID == 2) {

				this.upDateView(this.curPage, this.type, this.TouchID);
			}
		}
		//强化、升阶
		private sendIntensify() {
			if (this.curPage == 0) {
				if (!this.canIntensify) {
					TipsManage.showTips("资源不足，无法强化！")
					return;
				}
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.equipIntensify, [this.type, this.TouchID, 0], 0,
					this, (data) => {
						// @makeitem baseid=200 count=200000
						// GameApp.GameEngine.equipPanelMsg = data;
						// this.msgData = data;
						// let msg = data;
						TipsManage.showTips("强化成功")
						this.getData_PlayerEquipMsg(this.curPage, this.TouchID)

					});
				lcp.send(pkt);
			}
			else if (this.curPage == 1) {
				if (this.btn_intensify.label == "激活") {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.SoulStoneActive, [this.type, this.TouchID, 0]);
					lcp.send(pkt);

				} else if (this.btn_intensify.label == "升阶") {
					// curSoulStone
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.upgradeSoulStone, [this.type, this.TouchID, this.curSoulStoneID, 0])
					lcp.send(pkt);
				}

			} else if (this.curPage == 2) {
				let baseArr = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
				if (this.btn_intensify.label == "激活") {
					this.dressEquip(this.tempItemData)
				} else if (this.btn_intensify.label == "获取") {

				} else if (this.btn_intensify.label == "进阶") {
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
							this.getData_PlayerEquipMsg(this.curPage, this.TouchID)

						})
						lcp.send(pkt);
					}

				}


			}
		}
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


	}
}