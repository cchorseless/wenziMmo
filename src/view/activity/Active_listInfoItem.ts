/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_listInfoItem extends ui.activity.Active_listInfoItemUI {
		public data;
		public itemID;
		public btnState;
		public htmlText: number = null;
		public order;
		public tabid;
		constructor() {
			super();
			this.panel_allItem.hScrollBarSkin = ""
			this.addEvent();
		}
		// 40 /55
		public setData(data, index, tabid) {
			this.tabid = tabid;
			let str = "";
			this.data = data;
			this.itemID = index
			switch (tabid) {
				case 16:
					this.btnState = this.data.bj;
					str = "充值" + this.data.num + "元宝";
					for (let i in this.data.item) {
						let o = new view.compart.DaoJuItem();
						let itemBase = new ProtoCmd.ItemBase()
						itemBase.dwBaseID = parseInt(this.data.item[i].index);
						itemBase.dwCount = this.data.item[i].num;
						itemBase.dwBinding = this.data.item[i].bind;
						o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
						o.x = (o.width + 24) * (parseInt(i) - 1)
						this.panel_allItem.addChild(o)
					}
					break;
				case 18:
					this.btnState = this.data.state;
					str = this.data.name
					for (let i in this.data.items) {
						let o = new view.compart.DaoJuItem();
						let itemBase = new ProtoCmd.ItemBase()
						itemBase.dwBaseID = parseInt(this.data.items[i].index);
						itemBase.dwCount = this.data.items[i].num;
						o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
						o.x = (o.width + 24) * (parseInt(i) - 1)
						this.panel_allItem.addChild(o)
					}
					break;
				case 19:
					this.order = data.order;
					this.btnState = this.data.state;
					str = this.data.name
					delete (data["name"])
					delete data["name"]
					delete (data["order"])
					delete data["order"]
					delete (data["state"])
					delete data["state"]
					for (let i in data) {
						let o = new view.compart.DaoJuItem();
						let itemBase = new ProtoCmd.ItemBase()
						itemBase.dwBaseID = parseInt(data[i].index);
						itemBase.dwCount = data[i].num;
						o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
						o.x = (o.width + 24) * (parseInt(i) - 1)
						this.panel_allItem.addChild(o)
					}
					break;
				case 32:
					if (this.data.state == 0) {
						this.data.state = 2
					}
					this.btnState = this.data.state
					str = this.data.name
					this.htmlText = this.data.leftcnt
					this.order = data.order;
					delete (data["leftcnt"])
					delete data["leftcnt"]
					delete (data["name"])
					delete data["name"]
					delete (data["order"])
					delete data["order"]
					delete (data["state"])
					delete data["state"]
					for (let i in data) {
						let o = new view.compart.DaoJuItem();
						let itemBase = new ProtoCmd.ItemBase()
						itemBase.dwBaseID = parseInt(data[i].index);
						itemBase.dwCount = data[i].num;
						o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
						o.x = (o.width + 24) * (parseInt(i) - 1)
						this.panel_allItem.addChild(o)
					}

					break;
				case 14:
					this.btnState = this.data.state
					str = this.data.name
					this.htmlText = this.data.leftcnt
					this.order = data.order;
					for (let i in data.items) {
						let o = new view.compart.DaoJuItem();
						let itemBase = new ProtoCmd.ItemBase()
						itemBase.dwBaseID = parseInt(data.items[i].index);
						itemBase.dwCount = data.items[i].num;
						o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
						o.x = (o.width + 24) * (parseInt(i) - 1)
						this.panel_allItem.addChild(o)
					}
					break;
				case 13:
					this.btnState = this.data.state;
					str = this.data.name
					this.order = data.order;
					for (let i in this.data.items) {
						let o = new view.compart.DaoJuItem();
						let itemBase = new ProtoCmd.ItemBase()
						itemBase.dwBaseID = parseInt(this.data.items[i].index);
						itemBase.dwCount = this.data.items[i].num;
						o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
						o.x = (o.width + 24) * (parseInt(i) - 1)
						this.panel_allItem.addChild(o)
					}
					break;
				case 36:
					this.btnState = this.data.state;
					this.order = data.order;
					this.html_name.style.fontSize = 28
					this.html_name.style.fontFamily = "STLiti"
					this.html_name.style.stroke = 0.5;
					this.html_name.style.strokeColor = "#000000"
					this.html_name.innerHTML = this.data.name;
					for (let i in this.data.items) {
						let o = new view.compart.DaoJuItem();
						let itemBase = new ProtoCmd.ItemBase()
						itemBase.dwBaseID = parseInt(this.data.items[i].index);
						itemBase.dwCount = this.data.items[i].num;
						itemBase.dwBinding = this.data.items[i].bind;
						o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
						o.x = (o.width + 24) * (parseInt(i) - 1)
						this.panel_allItem.addChild(o)
					}
					break;
			}

			this.onShowBtnState()
			this.lab_infoName.text = str
			if (this.htmlText) {
				this.html_curTimes.style.align = "center";
				this.html_curTimes.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余次数：</span>" + "<span style='color:#179a0d;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + this.htmlText + "</span>";
				this.btn_get.y = 40;
			}
			else {
				this.html_curTimes.innerHTML = "";
				this.btn_get.y = 55;
			}


		}
		public onShowBtnState() {
			if (this.btnState == 0) {
				this.btn_get.gray = true;
				this.btn_get.label = "未领取";
			}
			else if (this.btnState == 1) {
				this.btn_get.gray = false;
				this.btn_get.label = "领取";
			} else if (this.btnState == 2) {
				this.btn_get.gray = true;
				this.btn_get.label = "已领取";
			}
		}
		private addEvent() {
			EventManage.onWithEffect(this.btn_get, Laya.UIEvent.CLICK, this, function () {
				if (this.btnState != 1) {
					return;
				}
				switch (this.tabid) {
					case 16:
						let pkt16 = new ProtoCmd.QuestClientData().setString(ProtoCmd.MeiRiChongZhiGet, [this.itemID])
						lcp.send(pkt16);
						break;
					case 18:
						let pkt18 = new ProtoCmd.QuestClientData().setString(ProtoCmd.GetConsumeGiftAward, [this.itemID])
						lcp.send(pkt18);
						break;
					case 19:
						let pkt19 = new ProtoCmd.QuestClientData().setString(ProtoCmd.GetNationalResourceAward, [this.order])
						lcp.send(pkt19);
						break;
					case 32:
						let pkt32 = new ProtoCmd.QuestClientData().setString(ProtoCmd.GetExchangePointAward, [this.order])
						lcp.send(pkt32);
						break;
					case 40:
						let pkt40 = new ProtoCmd.QuestClientData().setString(ProtoCmd.GetExchangeGiftAward, [this.order])
						lcp.send(pkt40);
						break;
					case 13:
						let pkt13 = new ProtoCmd.QuestClientData().setString(ProtoCmd.GetContinueRechargeAward, [this.order])
						lcp.send(pkt13);
						break;
					case 42:
						let pkt42 = new ProtoCmd.QuestClientData().setString(ProtoCmd.MZJJ_LingQu, [this.order])
						lcp.send(pkt42);
						break;
				}

			})
		}
	}
}