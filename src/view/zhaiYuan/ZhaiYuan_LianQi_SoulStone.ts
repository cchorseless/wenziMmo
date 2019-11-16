/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_LianQi_SoulStone extends ui.zhaiYuan.ZhaiYuan_LianQi_SoulStoneUI {
		public TouchID = 0;
		private allData;//下面的面板十个item数据
		private msgData;//上面的面板的详细信息数 
		public type = 0;

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
			// this.upDateView(0, 0);
		}
		public addEvent() {
			this.tab_down.on(Laya.UIEvent.CLICK, this, () => {
				this.type = this.tab_down.selectedIndex;
				this.TouchID = 0;
				this.getData_PlayerEquipMsg(this.TouchID)
			})
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
				this.getData_EquipPanelMsg(this.TouchID);
				for (let i = 1; i < 13; i++) {
					this.statAllSoulStoneLv.push(this.allData.soulchaintab[i].effid)
				}
			})
		}
		public upDateView(type, Touchindex) {
			let curCostNum;
			let costName;
			let costCount;
			let arr = ["强化", "激活", "升阶", "进阶", "获取"]
			for (let i = 0; i < 10; i++) {
				this["ui_equip" + i].btn_icon.gray = false;
				this["ui_equip" + i].img_icon.skin = "image/common/daoju/itemicon_bg_" + (i + 10) + ".png";
			}
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
		public getData_EquipPanelMsg(touchid) {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.soulStonePanel, [this.type, this.TouchID, this.curSoulStoneID], 0, this,
				(data) => {
					// GameApp.GameEngine.equipPanelMsg = data;
					this.msgData = data;
					this.upDateView(this.type, this.TouchID);
				});
			lcp.send(pkt);
		}
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

						this.list_shengjie.array = [];
						if (soul_oneOf_Lv >= 12) {
							this.list_shengjie.array = effData.des;
							this.list_shengjie.itemRender = view.compart.SinglePropsItem;
							this.list_shengjie.renderHandler = Laya.Handler.create(this, (cell: view.compart.SinglePropsItem, index) => {
								cell.setData(cell.dataSource.des);
							}, null, false)
						} else {
						}
					}
				}
			}
			this.lab_attact.text = attackNum.toString();
		}
		private setSoulStoneState(id: number) {
			for (let i = 3; i < 7; i++) {
				if (i == id) {
					this["box_hunshi" + i].visible = true;
				} else {
					this["box_hunshi" + i].visible = false;
				}
			}
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
		private getData_PlayerEquipMsg(touchID) {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.soulStoneLevel, null)
			lcp.send(pkt);
		}
		private sendIntensify() {
			if (this.btn_intensify.label == "激活") {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.SoulStoneActive, [this.type, this.TouchID, 0]);
				lcp.send(pkt);

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