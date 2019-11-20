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
		private tempItemData = null
		private useDataID = 13;
		private curEquipDataCS = 0;
		constructor() {
			super();
			this.setData();
			this.addEvent();
		}
		public setData() {
			// this.upDateView(0, 0);
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
		}
		//刷新面板
		private upDateView(touchid) {
			let curCostNum;
			let costName;
			let costCount;
			let arr = ["强化", "激活", "升阶", "进阶", "获取"]
			for (let i = 0; i < 10; i++) {
				this["ui_equip" + i].btn_icon.gray = false;
				this["ui_equip" + i].img_icon.skin = "image/common/daoju/itemicon_bg_" + (i + 10) + ".png";
			}
			this.curHasActive = false;
			//用当前位置的id转换为服务器ID
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
				// this["ui_equip" + this.TouchID]
			}
			this.lab_cost_forge.text = ""
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
			let effid;
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
				cell.setData(cell.dataSource);
			}, null, false)
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
		public destroy(e =true){
			GameApp.LListener.offCaller(LcpEvent.UPDATE_UI_LIANQI_CHUANSHI_UI, this);
			super.destroy(e)
		}





	}
}