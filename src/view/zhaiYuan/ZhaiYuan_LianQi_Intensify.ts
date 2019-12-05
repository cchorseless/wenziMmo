/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_LianQi_Intensify extends ui.zhaiYuan.ZhaiYuan_LianQi_IntensifyUI {
		public TouchID = 0;
		private lvNum = 3;//当前显示强化等级 详细信息
		private canIntensify: boolean = false; //能否强化
		private allData;//下面的面板十个item数据
		private msgData;//上面的面板的详细信息数 
		public type = 0;
		constructor() {
			super();
			this.allData = GameApp.GameEngine.mainPlayer.playerEquipIntensify;
			this.msgData = GameApp.GameEngine.equipPanelMsg;
			this.setData();
			this.addEvent();

		}
		public setData() {
			this.vbox_0['sortItem'] = (items) => { };
			this.vbox_1['sortItem'] = (items) => { };
			this.upDateView(0, 0);
		}
		public addEvent() {
			for (let i = 0; i < 10; i++) {
				this["ui_equip" + i].on(Laya.UIEvent.CLICK, this, () => {
					this.TouchID = i;
					this.getData_PlayerEquipMsg()
				})
			}
			EventManage.onWithEffect(this.btn_intensify, Laya.UIEvent.CLICK, this, () => {
				this.sendIntensify();
			});

			this.tab_down.on(Laya.UIEvent.CLICK, this, () => {
				this.type = this.tab_down.selectedIndex;
				this.TouchID = 0;
				this.getData_PlayerEquipMsg()
			})
		}
		//刷新界面
		public upDateView(type, Touchindex) {
			let curCostNum;
			let costName;
			let costCount;
			// let arr = ["强化", "激活", "升阶", "进阶", "获取"]
			this.btn_intensify.label = "强化";
			for (let i = 0; i < 10; i++) {
				this["ui_equip" + i].btn_icon.gray = false;
				this["ui_equip" + i].img_icon.skin = "image/common/daoju/itemicon_bg_" + (i + 10) + ".png";
			}
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
			//升级;             所需要的金币消耗
			// this.lab_goldCost.text = "消耗金币：" + this.msgData.gold;
			//选中时;           item金色的框是否显示 --选中状态    
			this.lab_cost_forge.text = "消耗：" + costName + " (" + curCostNum + "/" + costCount + ")";
			for (let i = 0; i < 10; i++) {
				if (i == this.TouchID) {
					this["ui_equip" + i].img_circle.visible = true
				} else {
					this["ui_equip" + i].img_circle.visible = false;
				}
			}
			//更新   上面面板的详细信息
			this.onPageContent0();
		}
		//上面面板的详细信息
		public onPageContent0() {
			//用当前位置的id转换为服务器ID
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
					// this.vbox_1.addChild(new view.compart.SinglePropsItem().setData(effData0.des[i]));
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
		/**
		 * 获取当前强化阶段3、5、7、9、11、13、15      用于左上角显示当前阶数
		 */
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
		//点击强化，发送强化事件
		public sendIntensify() {
			if (!this.canIntensify) {
				TipsManage.showTips("资源不足，无法强化！")
				return;
			}
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.equipIntensify, [this.type, this.TouchID, 0], 0,
				this, (data) => {
					TipsManage.showTips("强化成功")
					this.getData_PlayerEquipMsg()

				});
			lcp.send(pkt);
		}
		//强化成功后重新拉取面板信息
		public getData_PlayerEquipMsg() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.sendEquipIntensify, null, 0, this,
				(data: ProtoCmd.itf_JS_equipIntensifyMessage) => {
					GameApp.GameEngine.mainPlayer.playerEquipIntensify = data;
					this.allData = GameApp.GameEngine.mainPlayer.playerEquipIntensify;
					this.getData_EquipPanelMsg(this.TouchID)
				});
			lcp.send(pkt);
		}
		//上面板子content的数据  id: 面板ID
		private getData_EquipPanelMsg(itemID: number) {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.IntensifyPanel, [this.type, itemID], 0, this,
				(data: ProtoCmd.itf_JS_equipPanelMsg) => {
					GameApp.GameEngine.equipPanelMsg = data;
					this.msgData = GameApp.GameEngine.equipPanelMsg;
					this.upDateView(this.type, this.TouchID);
				});
			lcp.send(pkt);

		}
	}
}