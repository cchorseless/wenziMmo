/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_LuckBagDraw extends ui.activity.Active_LuckBagDrawUI {
		public data;
		public score;
		public tempMap: any = [];
		public giftType = 1;
		constructor() {
			super();
			this.addEvent();
			this.getData();

		}
		public tabStata() {
			for (let i = 1; i < 6; i++) {
				this["btn_gift" + i].selected = false;
				if (i == this.giftType) {
					this["btn_gift" + i].selected = true;
				}
			}
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, function () {
				PopUpManager.checkPanel(PanelManage.LuckDraw, true);
			})

			for (let i = 1; i < 6; i++) {
				this["box_" + i].on(Laya.UIEvent.CLICK, this, function () {
					let o = new Active_Luck_Gift_Dialog()
					o.setData(this.tempMap[i - 1], this["lab_name" + i].text);
					o.popup();
				})
			}
			this.img_aimReward.on(Laya.UIEvent.CLICK, this, function () {
				let o = new Active_Luck_ExtraGift_Dialog()
				o.popup();
			})
			for (let i = 1; i < 6; i++) {
				this["btn_gift" + i].on(Laya.UIEvent.CLICK, this, function () {
					this.giftType = i;
					this.getData();
				})
			}
			this.btn_open.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.FuDaiChouJiang, [this.giftType])
				lcp.send(pkt);
			})
			GameApp.LListener.on(ProtoCmd.Active34, this, (data) => {
				this.setData(data)
			})
		}

		public destroy(e = true) {
			GameApp.LListener.offCaller(ProtoCmd.Active34, this)
			super.destroy(e)
		}

		public getData() {
			let pkt34 = new ProtoCmd.QuestClientData().setString(ProtoCmd.Active34, [this.giftType])
			lcp.send(pkt34);
		}
		public setData(data) {
			this.data = data;
			this.setTimeShow(data)
			this.tabStata();
			this.score = data.item.jifen
			delete (data.item["cnt"])
			delete data.item["cnt"]
			delete (data.item["jifen"])
			delete data.item["jifen"]
			for (let i = 1; i < 6; i++) {
				this["lab_name" + i].text = data.item[i].name;
				delete (data.item[i]["rnd"])
				delete data.item[i]["rnd"]
				delete (data.item[i]["name"])
				delete data.item[i]["name"]
				let temp = data.item[i]
				this.tempMap[i - 1] = temp;
			}
			this.lab_costText.text = "消耗" + this.score + "点积分开启";

		}

		public setTimeShow(data) {
			let leftTime = data.leftsec;
			if (data.introduce) {
				this.lab_detail.text = data.introduce;
			} else {
				this.lab_detail.text = "参加活动赢得奖励"
			}
			this.html_leftTimes.style.align = "center";
			this.html_leftTimes.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余次数：</span>" + "<span style='color:#179a0d;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.leftcnt + "</span>";

			if (leftTime > 0) {
				let aa = TimeUtils.getFormatBySecond(leftTime, 6);
				this.html_time.style.align = "center";
				this.html_time.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
				this.onshowTime(leftTime)
			}
			if (data.jifen != null) {
				this.html_cost.style.align = "center";
				let str: string = "当前积分：";
				this.html_cost.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" + str + "</span>" + "<span style='color:#179a0d;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.jifen + "</span>";
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
			}

		}
	}
}