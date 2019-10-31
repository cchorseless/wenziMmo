/**Created by the LayaAirIDE*/
module view.activity {
	// view.activity.Active_EveryDayRecharge_Item
	export class Active_EveryDayRecharge_Item extends ui.activity.Active_EveryDayRecharge_ItemUI {
		public buttonBJ = 0;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data) {
			this.buttonBJ = data.state;
			if (this.buttonBJ == 0) {
				this.btn_get.label = "已领取";
			} else if (this.buttonBJ == 1) {
				this.btn_get.label = "领取";
			}
			this.setTimeShow(data)
			for (let i = 1; i < 5; i++) {
				let o = new view.compart.DaoJuItem();
				let itemBase = new ProtoCmd.ItemBase();
				itemBase.dwBaseID = data.item[i].index;
				itemBase.dwBinding = data.item[i].binding;
				itemBase.dwCount = data.item[i].num;
				o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this["box_" + i].addChild(o);
				let itemID = itemBase.dwBaseID
				let name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(itemID.toString());
				this["lab_name" + i].text = name;
			}
		}
		public setTimeShow(data) {
			let leftTime = data.leftsec;
			if (data.introduce) {
				this.lab_rules.text = data.introduce;
			} else {
				this.lab_rules.text = "参加活动赢得奖励"
			}

			if (leftTime > 0) {
				let aa = TimeUtils.getFormatBySecond(leftTime, 6);
				this.html_time.style.align = "center";
				this.html_time.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
				this.onshowTime(leftTime)
			} else {
				this.timerEnd();
			}
			if (data.yuanbao != null) {
				this.html_cost.style.align = "center";
				let str: string = "当前消费：";
				this.html_cost.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" + str + "</span>" + "<span style='color:#179a0d;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.yuanbao + "</span>";
			}
			else {
				this.html_cost.innerHTML = "";
			}
		}
		private onshowTime(leftTime) {
			if (leftTime > 0) {
				Laya.timer.frameLoop(3600, this, function () {
					leftTime -= 60;
					if (leftTime > 0) {
						let aa = TimeUtils.getFormatBySecond(leftTime, 6)
						this.html_time.style.align = "center";
						this.html_time.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
					}
					else {
						this.timerEnd()
					}
				});
			} else {
				this.timerEnd();
			}

		}
		private timerEnd() {
			Laya.timer.clearAll(this)
			TipsManage.showTips("活动已结束")
			// PopUpManager.checkPanel(this);
		}
		private addEvent() {
			EventManage.onWithEffect(this.btn_get, Laya.UIEvent.CLICK, this, function () {
				if (this.buttonBJ == 1) {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.GetMeiRiTeHuiAward, null)
					lcp.send(pkt)

				} else if (this.buttonBJ == 0) {
					TipsManage.showTips("今日已领取")
					return;
				}
			})
		}
	}
}