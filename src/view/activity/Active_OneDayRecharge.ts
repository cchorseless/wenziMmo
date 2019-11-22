/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_OneDayRecharge extends ui.activity.Active_OneDayRechargeUI {
		public chooseItem = 1;
		public ratio = 0;
		constructor() {
			super();

		}
		//领取状态
		public state;
		public setData(data) {
			this.state = data.state;
			this.setTimeShow(data);
			this.onShowChooseGift();
			if (data.state == 0) {
				this.btn_recharge.label = "立即充值"
				this.btn_recharge.disabled = false;
			}
			else if (data.state == 1) {
				this.btn_recharge.label = "可领取"
				this.btn_recharge.disabled = false;
			} else if (data.state == 2) {
				this.btn_recharge.label = "已领取"
				this.btn_recharge.disabled = true;
			} for (let i = 1; i < 5; i++) {
				this["ui_gift" + i].lab_giftName.text = data.itemtab[i].name;
				let items = data.itemtab[i].items;
				for (let j = 1; j < 4; j++) {
					let o = new view.compart.DaoJuItem();
					let base = new ProtoCmd.ItemBase();
					base.dwBaseID = items[j].index;
					base.dwCount = items[j].num;
					o.setData(base, EnumData.ItemInfoModel.SHOW_IN_MAIL)
					this["ui_gift" + i]["item" + j].addChild(o)
				}
			}
			this.addEvent()
		}
		public addEvent() {
			for (let i = 1; i < 5; i++) {
				this["ui_gift" + i].on(Laya.UIEvent.CLICK, this, function () {
					this.chooseItem = i;
					this.onShowChooseGift();
				})
			}
			EventManage.onWithEffect(this.btn_recharge, Laya.UIEvent.CLICK, this, function () {
				if (this.state == 0) {
					let o = new view.recharge_vip.Recharge_VipDialog();
					o.setData(1);
					o.popup(true);
				}
				if (this.state == 1) {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.GetOneDayRechargeAward, [this.chooseItem])
					lcp.send(pkt);
				}
			})
			EventManage.onWithEffect(this.btn_recharge, Laya.UIEvent.CLICK, this, function () {
				//打开充值界面
				// GameUtil.timeCountDown(70,this.html_time)
			})
		}

		private onShowChooseGift() {
			for (let i = 1; i < 5; i++) {
				this["ui_gift" + i].img_circle.visible = false;
				if (i == this.chooseItem) {
					this["ui_gift" + i].img_circle.visible = true;
				}
			}
		}
		public setTimeShow(data) {
			let leftTime = data.lefttime;
			if (data.introduce) {
				this.lab_rules.text = data.introduce
			} else {
				this.lab_rules.text = "参加活动赢得奖励";
			}

			if (leftTime > 0) {
				let aa = TimeUtils.getFormatBySecond(leftTime, 6);
				this.html_time.style.align = "center";
				this.html_time.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
				this.onshowTime(leftTime)
			}
			if (data.achieve != null) {
				this.html_cost.style.align = "center";
				this.html_cost.innerHTML = "<span style='color:#554536;font-family:LiSu;fontSize:24;stroke:0.5;strokeColor:#000000'>当日充值：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.achieve + "</span>";
			}
			else {
				this.html_cost.innerHTML = "";
			}
	
			this.html_hastimes.style.wordWrap=false;
			this.html_hastimes.innerHTML = "<span style='color:#554536;font-family:LiSu;fontSize:24;stroke:0.5;strokeColor:#000000'>今日可参加次数：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.leftcnt + "</span>"
				+ "<span style='color:#554536;font-family:LiSu;fontSize:24;stroke:0.5;strokeColor:#000000'>/</span>" + "<span style='color:#554536;font-family:LiSu;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.maxcnt + "</span>"

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

				});
			}

		}
	}
}