/**Created by the LayaAirIDE*/
module view.activity {
	export class ActivityPanel extends ui.activity.ActivityPanelUI {
		public tabData: ProtoCmd.itf_ACT_JingCaiSendShow;
		public leftTime = 0;
		public curConsume: number = null;
		public infoData;        //条目数据
		public touchTabID = 1;  //当前点击的tab是第几个从1开始  对应tabData中的key
		public static self: ActivityPanel;
		public buttonBJ = 0; f
		public hasInitArr: { [index: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 7: 0, 12: 0, 13: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 24: 0, 32: 0, 34: 0, 35: 0, 38: 0, 39: 0, 40: 0, 41: 0 };
		// public activeData
		public activeID = 1;   //当前活动id  服务器用的id

		public hasTimeNum = 0;
		constructor() {
			super();
			for (let i = 1; i < 50; i++) {
				this["activeData" + i] = null
			}
			ActivityPanel.self = this;
			this.panle_info.vScrollBarSkin = ""

			this.panel_tab.hScrollBarSkin = ""
			this.addEvent();
		}
		public setData(data: ProtoCmd.itf_ACT_JingCaiSendShow) {
			this.box_rank.visible = false;
			this.box_EveryDayRecharge.visible = false;
			this.panle_info.removeChildren();
			this.tabData = data;
			for (let i in this.tabData) {
				let o = new Active_list_tabItem();
				o.setData(data[i], i);
				o.x = (o.width + 20) * (parseInt(i) - 1)
				this.panel_tab.addChild(o)
			}
			this.activeID = this.tabData[this.touchTabID].id

			this.changeTabState()
			this.getActiveInfoData();


		}

		public getActiveInfoData() {
			// this.activeID = 7;
			switch (this.activeID) {
				case 4:
					if (this.hasInitArr[this.activeID] == 1 && this["activeData" + this.activeID] != null) {
						this.useData4(this["activeData" + this.activeID]);
					} else {
						let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd["Active" + this.activeID], null);
						lcp.send(pkt);
						GameApp.LListener.on(ProtoCmd["Active" + this.activeID], this, (data) => {
							this.hasInitArr[this.activeID] = 1;
							this["activeData" + this.activeID] = data
							this.useData4(data);
						})
					}
					break;
				case 7:
					if (this.hasInitArr[this.activeID] == 1 && this["activeData" + this.activeID] != null) {
						this.useData4(this["activeData" + this.activeID]);
					} else {
						let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd["Active" + this.activeID], null);
						lcp.send(pkt);
						GameApp.LListener.on(ProtoCmd["Active" + this.activeID], this, (data) => {
							this.hasInitArr[this.activeID] = 1;
							this["activeData" + this.activeID] = data
							this.useData4(data);
						})
					}
					break;
				case 12:
					if (this.hasInitArr[this.activeID] == 1 && this["activeData" + this.activeID] != null) {
						this.useData12(this["activeData" + this.activeID]);
					} else {
						let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd["Active" + this.activeID], null);
						lcp.send(pkt);
						GameApp.LListener.on(ProtoCmd["Active" + this.activeID], this, (data) => {
							this.hasInitArr[this.activeID] = 1;
							this["activeData" + this.activeID] = data
							this.useData12(data);
						})
					}
					break;
				case 16:
					if (this.hasInitArr[this.activeID] == 1 && this["activeData" + this.activeID] != null) {
						this.useData16(this["activeData" + this.activeID]);
					} else {
						let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd["Active" + this.activeID], null);
						lcp.send(pkt);
						GameApp.LListener.on(ProtoCmd["Active" + this.activeID], this, (data) => {
							this.hasInitArr[this.activeID] = 1;
							this["activeData" + this.activeID] = data
							this.useData16(data);
						})
					}
					break;
				case 18:
					if (this.hasInitArr[this.activeID] == 1 && this["activeData" + this.activeID] != null) {
						this.useData18(this["activeData" + this.activeID]);
					} else {
						let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd["Active" + this.activeID], null);
						lcp.send(pkt);
						GameApp.LListener.on(ProtoCmd["Active" + this.activeID], this, (data) => {
							this.hasInitArr[this.activeID] = 1;
							this["activeData" + this.activeID] = data
							this.useData18(data);
						})
					}
					break;
				case 19:
					if (this.hasInitArr[this.activeID] == 1 && this["activeData" + this.activeID] != null) {
						this.useData19(this["activeData" + this.activeID]);
					} else {
						let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd["Active" + this.activeID], null);
						lcp.send(pkt);
						GameApp.LListener.on(ProtoCmd["Active" + this.activeID], this, (data) => {
							this.hasInitArr[this.activeID] = 1;
							this["activeData" + this.activeID] = data
							this.useData19(data);
						})
					}
					break;

				case 32:
					if (this.hasInitArr[this.activeID] == 1 && this["activeData" + this.activeID] != null) {
						this.useData32(this["activeData" + this.activeID]);
					} else {
						let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd["Active" + this.activeID], null);
						lcp.send(pkt);
						GameApp.LListener.on(ProtoCmd["Active" + this.activeID], this, (data) => {
							this.hasInitArr[this.activeID] = 1;
							this["activeData" + this.activeID] = data
							this.useData32(data);
						})
					}
					break;
				case 40:
					if (this.hasInitArr[this.activeID] == 1 && this["activeData" + this.activeID] != null) {
						this.useData40(this["activeData" + this.activeID]);
					} else {
						let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd["Active" + this.activeID], null);
						lcp.send(pkt);
						GameApp.LListener.on(ProtoCmd["Active" + this.activeID], this, (data) => {
							this.hasInitArr[this.activeID] = 1;
							this["activeData" + this.activeID] = data
							this.useData40(data);
						})
					}
					break;
				case 41:
					if (this.hasInitArr[this.activeID] == 1 && this["activeData" + this.activeID] != null) {
						this.useData41(this["activeData" + this.activeID]);
					} else {
						let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd["Active" + this.activeID], null);
						lcp.send(pkt);
						GameApp.LListener.on(ProtoCmd["Active" + this.activeID], this, (data) => {
							this.hasInitArr[this.activeID] = 1;
							this["activeData" + this.activeID] = data
							this.useData41(data);
						})
					}

					break;

			}


		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, function () {
				this.Dispose();
				PopUpManager.checkPanel(this);
			})
			EventManage.onWithEffect(this.btn_get, Laya.UIEvent.CLICK, this, function () {
				if (this.buttonBJ == 1) {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MeiRiShouChongGet, null)
					lcp.send(pkt);
				} else if (this.buttonBJ == 0) {
					//前往充值
				} else if (this.buttonBJ == 2) {
					return;
				}
			})

		}
		public useData4(data) {
			this.box_rank.visible = true
			if (data.leftsec >= 0) {
				this.leftTime = data.leftsec;
			} if (data.yuanbao >= 0) {
				this.curConsume = data.yuanbao;
			}
			this.lab_rules.text = data.introduce;
			this.showRank(data.item, data.rank)
			this.upDateView()
		}
		public useData12(data) {
			if (data.lefttime >= 0) {
				this.leftTime = data.lefttime;
			} if (data.rmb >= 0) {
				this.curConsume = data.rmb;
			}
			this.lab_rules.text = data.introduce;
			this.infoData = data.itemtab
			this.upDateView()
		}
		public useData16(data) {
			if (data.lefttime >= 0) {
				this.leftTime = data.lefttime;
			} if (data.rmb >= 0) {
				this.curConsume = data.rmb;
			}
			// this.lab_rules.text = data.introduce;
			this.lab_rules.text = "参加活动赢得奖励"
			this.infoData = data.itemtab
			this.upDateView()
		}
		public useData18(data) {
			if (data.lefttime >= 0) {
				this.leftTime = data.lefttime;
			} if (data.achieve >= 0) {
				this.curConsume = data.achieve;
			}
			this.lab_rules.text = data.introduce;
			this.infoData = data.itemtab
			this.upDateView()

		}
		public useData19(data) {
			if (data.lefttime >= 0) {
				this.leftTime = data.lefttime;
			} if (data.achieve >= 0) {
				this.curConsume = data.achieve;
			}
			this.lab_rules.text = data.introduce;
			this.infoData = data.itemtab
			this.upDateView()
		}
		public useData32(data) {
			if (data.lefttime >= 0) {
				this.leftTime = data.lefttime;
			} if (data.achieve >= 0) {
				this.curConsume = data.achieve;
			}
			this.lab_rules.text = data.introduce;
			this.infoData = data.itemtab
			this.upDateView()
		}
		public useData40(data) {
			if (data.lefttime >= 0) {
				this.leftTime = data.lefttime;
			} if (data.achieve >= 0) {
				this.curConsume = data.achieve;
			}
			delete (data["lefttime"])
			delete data["lefttime"]
			// this.lab_rules.text = data.introduce;
			this.infoData = data
			this.upDateView()
		}
		public useData41(data) {
			this.box_EveryDayRecharge.visible = true;
			if (data.leftsec >= 0) {
				this.leftTime = data.leftsec;
			} if (data.yuanbao >= 0) {
				this.curConsume = data.yuanbao;
			}
			// this.lab_rules.text = data.introduce;
			this.showEveryDayRecharge(data.item, data.bj)
			this.upDateView()
		}


		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.Active4, this)
			GameApp.LListener.offCaller(ProtoCmd.Active7, this)
			GameApp.LListener.offCaller(ProtoCmd.Active12, this)
			GameApp.LListener.offCaller(ProtoCmd.Active16, this)
			GameApp.LListener.offCaller(ProtoCmd.Active18, this)
			GameApp.LListener.offCaller(ProtoCmd.Active19, this)
			GameApp.LListener.offCaller(ProtoCmd.Active32, this)
			GameApp.LListener.offCaller(ProtoCmd.Active40, this)
			GameApp.LListener.offCaller(ProtoCmd.Active41, this)
			PopUpManager.Dispose(this)
		}

		private changeTabState() {
			for (let i = 0; i < this.panel_tab.numChildren; i++) {
				let p: any = this.panel_tab.getChildAt(i);
				p.btn_icon.selected = false;
				if (p.itemID == this.touchTabID) {
					p.btn_icon.selected = true;
				}
				console.log(p)

			}
		}
		public onChooseTabItem(index) {
			this.touchTabID = index;
			this.changeTabState();
			this.setData(this.tabData);
		}
		public showRank(needData, nameData) {
			for (let i = 1; i < 6; i++) {
				// this.item_1.lab_rank.text
				this["item_" + i].lab_rank.text = i.toString();
				this["item_" + i].lab_name.text = nameData[i].name;
				this["item_" + i].lab_num.text = needData[i].needyuanbao.toString();
				let length = 0
				for (let aa in needData[i].item) {
					length++
				}
				if (length == 1) {
					// 152
					let o = new view.compart.DaoJuItem();
					let item1 = new ProtoCmd.ItemBase()
					item1.dwBaseID = needData[i].item[1].index;
					item1.dwCount = needData[i].item[1].num;
					item1.dwBinding = needData[i].item[1].bind;
					o.x = 152;
					o.y = 10;
					o.setData(item1, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					this["item_" + i].addChild(o);

				} else if (length == 2) {
					// 112/191
					let o1 = new view.compart.DaoJuItem();
					let o2 = new view.compart.DaoJuItem();
					let item1 = new ProtoCmd.ItemBase()
					let item2 = new ProtoCmd.ItemBase()
					item1.dwBaseID = needData[i].item[1].index;
					item1.dwCount = needData[i].item[1].num;
					item1.dwBinding = needData[i].item[1].bind;
					item2.dwBaseID = needData[i].item[2].index;
					item2.dwCount = needData[i].item[2].num;
					item2.dwBinding = needData[i].item[2].bind;
					o1.setData(item1, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					o2.setData(item2, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					o1.x = 112;
					o1.y = 10;
					this["item_" + i].addChild(o1);
					o2.x = 191;
					o2.y = 10;
					this["item_" + i].addChild(o2);
				} else if (length == 3) {
					// 76\152\228    10
					let o1 = new view.compart.DaoJuItem();
					let o2 = new view.compart.DaoJuItem();
					let o3 = new view.compart.DaoJuItem();
					let item1 = new ProtoCmd.ItemBase()
					let item2 = new ProtoCmd.ItemBase()
					let item3 = new ProtoCmd.ItemBase()
					item1.dwBaseID = needData[i].item[1].index;
					item1.dwCount = needData[i].item[1].num;
					item1.dwBinding = needData[i].item[1].bind;
					item2.dwBaseID = needData[i].item[2].index;
					item2.dwCount = needData[i].item[2].num;
					item2.dwBinding = needData[i].item[2].bind;
					item3.dwBaseID = needData[i].item[3].index;
					item3.dwCount = needData[i].item[3].num;
					item3.dwBinding = needData[i].item[3].bind;
					o1.setData(item1, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					o2.setData(item2, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					o3.setData(item3, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					o1.x = 76;
					o1.y = 10;
					this["item_" + i].addChild(o1);
					o2.x = 152;
					o2.y = 10;
					this["item_" + i].addChild(o2);
					o3.x = 228;
					o3.y = 10;
					this["item_" + i].addChild(o2);
				}


			}
		}
		public showEveryDayRecharge(data, bj) {
			this.buttonBJ = bj;
			if (bj == 0) {
				this.btn_get.label = "前往充值";
			} else if (bj == 1) {
				this.btn_get.label = "领取";
			} else if (bj == 2) {
				this.btn_get.gray = true;
				this.btn_get.label = "已领取"
			}
			for (let i = 1; i < 5; i++) {
				let o = new view.compart.DaoJuItem();
				let itemBase = new ProtoCmd.ItemBase();
				itemBase.dwBaseID = data[i].index;
				itemBase.dwBinding = data[i].binding;
				itemBase.dwCount = data[i].num;
				o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this["box_" + i].addChild(o);
				let name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(data[i].index);
				this["lab_name" + i].text = name;
			}
		}

		public upDateView() {
			//通用
			this.leftTime -=this.hasTimeNum; 
			if (this.leftTime > 0) {
				
				let aa = TimeUtils.getFormatBySecond(this.leftTime, 6)
				this.html_curTime.style.align = "center";
				this.html_curTime.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
				this.onshowTime()
			} else {
				this.timerEnd();
			}

			if (this.curConsume != null) {
				this.html_cost.style.align = "center";
				this.html_cost.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>当前消费：</span>" + "<span style='color:#179a0d;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + this.curConsume + "</span>";
			}
			else {
				this.html_cost.innerHTML = "";
			}

			if (this.infoData) {
				if (this.activeID == 16 || this.activeID == 18 || this.activeID == 32 || this.activeID == 19) {
					for (let i in this.infoData) {
						let o = new Active_listInfoItem();
						o.setData(this.infoData[i], i);
						o.y = (o.height + 10) * (parseInt(i) - 1)
						this.panle_info.addChild(o)
					}
				}
				else if (this.activeID == 12) {
					for (let i in this.infoData) {
						let o = new Active_equipMix();
						o.setData(this.infoData[i], i);
						o.y = (o.height + 10) * (parseInt(i) - 1)
						this.panle_info.addChild(o)
					}
				}
				else if (this.activeID == 40) {
					for (let i in this.infoData) {
						let o = new Active_timeBuy();
						o.setData(this.infoData[i], i);
						o.y = (o.height + 10) * (parseInt(i) - 1)
						this.panle_info.addChild(o)
					}
				}

			}


		}
		public onshowTime() {
			// this.leftTime = 10;
			if (this.leftTime > 0) {
				Laya.timer.frameLoop(60, this, function () {
					ActivityPanel.self.hasTimeNum++
					ActivityPanel.self.leftTime --;;
					if (this.leftTime > 0) {
						let aa = TimeUtils.getFormatBySecond(this.leftTime, 6)
						this.html_curTime.style.align = "center";
						this.html_curTime.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
					}
					else {

						this.timerEnd()

					}
				});
			} else {
				this.timerEnd();
			}
		}
		public timerEnd() {
			Laya.timer.clearAll(this)
			TipsManage.showTips("活动已结束")
			this.Dispose();
			PopUpManager.checkPanel(this);
		}
	}
}