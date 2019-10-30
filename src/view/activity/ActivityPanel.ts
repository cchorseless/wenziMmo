/**Created by the LayaAirIDE*/
module view.activity {
	export class ActivityPanel extends ui.activity.ActivityPanelUI {
		constructor() {
			super();
		}
		public setData(data: ProtoCmd.itf_ACT_JingCaiSendShow) {
			console.log(data);
			this.panel_tab.hScrollBarSkin = "";
			this.hbox_tab['sortItem'] = (items) => { };
			for (let i in data) {
				let o = new Active_list_tabItem();
				let index = parseInt(i) - 1;
				data[i].index = index;
				o.setData(data[i]);
				this.hbox_tab.addChild(o);
				// 添加view_stack
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.viewS_main.addItem(box);
			}
			this.addEvent();
			// 第一个活动
			this.onChooseTabItem(data[1]);
		}

		/**
		 * 切换界面
		 * @param item 
		 */
		public onChooseTabItem(item: ProtoCmd.itf_ACT_JingCaiSendShow) {
			this.changeTabState(item.index);
			this.getActiveInfoData(item);
		}


		/**
		 * 改变tab状态
		 * @param index 
		 */
		private changeTabState(index) {
			for (let i = 0; i < this.hbox_tab.numChildren; i++) {
				let p: any = this.hbox_tab.getChildAt(i);
				p.btn_icon.selected = (index == i);
			}
		}

		public getActiveInfoData(item: ProtoCmd.itf_ACT_JingCaiSendShow) {
			let box = this.viewS_main.getChildAt(item.index);
			let pcmdString = ProtoCmd["Active" + item.id];
			// 需要拉界面
			if (box.numChildren == 0) {
				switch (item.id) {
					// 	case 4: case 7:                   //排行榜
					// 		if (this.hasInitArr[this.activeID] == 1 && this["activeData" + this.activeID] != null) {
					// 			this.useRankData(this["activeData" + this.activeID]);
					// 		} else {
					// 			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd["Active" + this.activeID], null);
					// 			lcp.send(pkt);
					// 			GameApp.LListener.on(ProtoCmd["Active" + this.activeID], this, (data) => {
					// 				this.hasInitArr[this.activeID] = 1;
					// 				this["activeData" + this.activeID] = data
					// 				this.useRankData(data);
					// 			})
					// 		}
					// 		break;



					// 	case 12: case 16:                 //可复用
					// 		if (this.hasInitArr[this.activeID] == 1 && this["activeData" + this.activeID] != null) {
					// 			this.useData12_16(this["activeData" + this.activeID]);
					// 		} else {
					// 			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd["Active" + this.activeID], null);
					// 			lcp.send(pkt);
					// 			GameApp.LListener.on(ProtoCmd["Active" + this.activeID], this, (data) => {
					// 				this.hasInitArr[this.activeID] = 1;
					// 				this["activeData" + this.activeID] = data
					// 				this.useData12_16(data);
					// 			})
					// 		}
					// 		break;

					// 	case 18: case 19: case 32:         //可复用
					// 		if (this.hasInitArr[this.activeID] == 1 && this["activeData" + this.activeID] != null) {
					// 			this.useData18_19_32(this["activeData" + this.activeID]);
					// 		} else {
					// 			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd["Active" + this.activeID], null);
					// 			lcp.send(pkt);
					// 			GameApp.LListener.on(ProtoCmd["Active" + this.activeID], this, (data) => {
					// 				this.hasInitArr[this.activeID] = 1;
					// 				this["activeData" + this.activeID] = data
					// 				this.useData18_19_32(data);
					// 			})
					// 		}
					// 		break;
					// 	case 40:                             //可复用
					// 		if (this.hasInitArr[this.activeID] == 1 && this["activeData" + this.activeID] != null) {
					// 			this.useData40(this["activeData" + this.activeID]);
					// 		} else {
					// 			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd["Active" + this.activeID], null);
					// 			lcp.send(pkt);
					// 			GameApp.LListener.on(ProtoCmd["Active" + this.activeID], this, (data) => {
					// 				this.hasInitArr[this.activeID] = 1;
					// 				this["activeData" + this.activeID] = data
					// 				this.useData40(data);
					// 			})
					// 		}
					// 		break;
					// 	case 41:                          //每日首充
					// 		if (this.hasInitArr[this.activeID] == 1 && this["activeData" + this.activeID] != null) {
					// 			this.useData41(this["activeData" + this.activeID]);
					// 		} else {
					// 			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd["Active" + this.activeID], null);
					// 			lcp.send(pkt);
					// 			GameApp.LListener.on(ProtoCmd["Active" + this.activeID], this, (data) => {
					// 				this.hasInitArr[this.activeID] = 1;
					// 				this["activeData" + this.activeID] = data
					// 				this.useData41(data);
					// 			})
					// 		}
					// 		break;

				}
			}
			this.viewS_main.selectedIndex = item.index;
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, function () {
				PopUpManager.checkPanel(this);
			})
		}
		// public useRankData(data) {
		// 	// this.box_rank.visible = true
		// 	if (data.leftsec >= 0) {
		// 		this.leftTime = data.leftsec;
		// 	} if (data.yuanbao >= 0) {
		// 		this.curConsume = data.yuanbao;
		// 	}
		// 	this.lab_rules.text = data.introduce;
		// 	// this.showRank(data.item, data.rank)
		// 	let o = new Active_RankPanel_Item()
		// 	o.setData(data.item, data.rank)
		// 	o.x = 18;
		// 	o.y = 123;
		// 	// this.viewS_main.addChild(o)
		// 	// this.viewS_main.getChildAt[0];

		// 	this.viewS_main.addItem(o);
		// 	this.viewS_main.selectedIndex = 0
		// 	console.log(o);
		// 	console.log("viewStack:", this.viewS_main)
		// 	this.upDateView()
		// }
		// public useData12_16(data) {
		// 	if (data.lefttime >= 0) {
		// 		this.leftTime = data.lefttime;
		// 	} if (data.rmb >= 0) {
		// 		this.curConsume = data.rmb;
		// 	}
		// 	if (data.introduce) {
		// 		this.lab_rules.text = data.introduce;
		// 	} else {
		// 		this.lab_rules.text = "参加活动赢得奖励"
		// 	}

		// 	this.infoData = data.itemtab
		// 	this.upDateView()
		// }
		// public useData18_19_32(data) {
		// 	if (data.lefttime >= 0) {
		// 		this.leftTime = data.lefttime;
		// 	} if (data.achieve >= 0) {
		// 		this.curConsume = data.achieve;
		// 	}
		// 	this.lab_rules.text = data.introduce;
		// 	this.infoData = data.itemtab
		// 	this.upDateView()
		// }
		// public useData40(data) {
		// 	if (data.lefttime >= 0) {
		// 		this.leftTime = data.lefttime;
		// 	} if (data.achieve >= 0) {
		// 		this.curConsume = data.achieve;
		// 	}
		// 	delete (data["lefttime"])
		// 	delete data["lefttime"]
		// 	// this.lab_rules.text = data.introduce;
		// 	this.infoData = data
		// 	this.upDateView()
		// }
		// public useData41(data) {
		// 	this.box_EveryDayRecharge.visible = true;
		// 	if (data.leftsec >= 0) {
		// 		this.leftTime = data.leftsec;
		// 	} if (data.yuanbao >= 0) {
		// 		this.curConsume = data.yuanbao;
		// 	}
		// 	// this.lab_rules.text = data.introduce;
		// 	this.showEveryDayRecharge(data.item, data.bj)
		// 	let o = new Active_EveryDayRecharge_Item()
		// 	o.setData(data.item, data.bj)
		// 	o.x = 7;
		// 	o.y = 1;
		// 	this.viewS_main.addChild(o)
		// 	this.upDateView()
		// 	// 7/1
		// }


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
		// public showEveryDayRecharge(data, bj) {
		// 	this.buttonBJ = bj;
		// 	if (bj == 0) {
		// 		this.btn_get.label = "前往充值";
		// 	} else if (bj == 1) {
		// 		this.btn_get.label = "领取";
		// 	} else if (bj == 2) {
		// 		this.btn_get.gray = true;
		// 		this.btn_get.label = "已领取"
		// 	}
		// 	for (let i = 1; i < 5; i++) {
		// 		let o = new view.compart.DaoJuItem();
		// 		let itemBase = new ProtoCmd.ItemBase();
		// 		itemBase.dwBaseID = data[i].index;
		// 		itemBase.dwBinding = data[i].binding;
		// 		itemBase.dwCount = data[i].num;
		// 		o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
		// 		this["box_" + i].addChild(o);
		// 		let name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(data[i].index);
		// 		this["lab_name" + i].text = name;
		// 	}
		// }
		// //刷新通用显示
		// public upDateView() {
		// 	//通用
		// 	this.leftTime -= this.hasTimeNum;
		// 	if (this.leftTime > 0) {

		// 		let aa = TimeUtils.getFormatBySecond(this.leftTime, 6)
		// 		this.html_curTime.style.align = "center";
		// 		this.html_curTime.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
		// 		this.onshowTime()
		// 	} else {
		// 		this.timerEnd();
		// 	}

		// 	if (this.curConsume != null) {
		// 		this.html_cost.style.align = "center";
		// 		this.html_cost.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>当前消费：</span>" + "<span style='color:#179a0d;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + this.curConsume + "</span>";
		// 	}
		// 	else {
		// 		this.html_cost.innerHTML = "";
		// 	}
		// 	if (this.infoData) {
		// 		if (this.activeID == 16 || this.activeID == 18 || this.activeID == 32 || this.activeID == 19) {
		// 			for (let i in this.infoData) {
		// 				let o = new Active_listInfoItem();
		// 				o.setData(this.infoData[i], i);
		// 				o.y = (o.height + 10) * (parseInt(i) - 1)
		// 				this.panle_info.addChild(o)
		// 			}
		// 		}
		// 		else if (this.activeID == 12) {
		// 			for (let i in this.infoData) {
		// 				let o = new Active_equipMix();
		// 				o.setData(this.infoData[i], i);
		// 				o.y = (o.height + 10) * (parseInt(i) - 1)
		// 				this.panle_info.addChild(o)
		// 			}
		// 		}
		// 		else if (this.activeID == 40) {
		// 			for (let i in this.infoData) {
		// 				let o = new Active_timeBuy();
		// 				o.setData(this.infoData[i], i);
		// 				o.y = (o.height + 10) * (parseInt(i) - 1)
		// 				this.panle_info.addChild(o)
		// 			}
		// 		}
		// 	}
		// }
		// //计时器开始
		// public onshowTime() {
		// 	// this.leftTime = 10;
		// 	if (this.leftTime > 0) {
		// 		Laya.timer.frameLoop(60, this, function () {
		// 			ActivityPanel.self.hasTimeNum++
		// 			ActivityPanel.self.leftTime--;;
		// 			if (this.leftTime > 0) {
		// 				let aa = TimeUtils.getFormatBySecond(this.leftTime, 6)
		// 				this.html_curTime.style.align = "center";
		// 				this.html_curTime.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
		// 			}
		// 			else {

		// 				this.timerEnd()
		// 			}
		// 		});
		// 	} else {
		// 		this.timerEnd();
		// 	}
		// }
		// //计时器结束、关闭界面
		// public timerEnd() {
		// 	Laya.timer.clearAll(this)
		// 	TipsManage.showTips("活动已结束")
		// 	this.Dispose();
		// 	PopUpManager.checkPanel(this);
		// }
	}
}