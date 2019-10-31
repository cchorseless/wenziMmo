/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_Panel_Item extends ui.activity.Active_Panel_ItemUI {
		constructor() {
			super();
			this.panel_ui.vScrollBarSkin = ""
		}
		public setData(data, id) {
			let baseData = data;
			this.setTimeShow(data, id)
			let infoData = baseData.itemtab

			switch (id) {
				case 12:
					for (let i in infoData) {
						let o = new Active_equipMix();
						o.setData(infoData[i], i);
						o.y = (o.height + 10) * (parseInt(i) - 1)
						this.panel_ui.addChild(o)
					}
					break;
				case 16: case 18: case 19: case 32: case 14: case 13: case 36:
					for (let i in infoData) {
						let o = new Active_listInfoItem();
						o.setData(infoData[i], i, id);
						o.y = (o.height + 10) * (parseInt(i) - 1)
						this.panel_ui.addChild(o)
					}
					break;
				case 5:
					for (let i in infoData) {
						let o = new Active_timeBuy();
						o.setData(infoData[i], i);
						o.y = (o.height + 10) * (parseInt(i) - 1)
						this.panel_ui.addChild(o)
					}
					break;
			}

		}
		public setTimeShow(data, id) {
			let leftTime;
			let yuanbao;
			if (id == 12) {
				leftTime = data.lefttime;
				yuanbao = data.yuanbao
			}
			else if (id == 16) {
				leftTime = data.lefttime;
				yuanbao = data.rmb

			} else if (id == 18 || id == 19 || id == 32 || id == 5 || id == 14 || id == 13 || id == 36) {
				if (data.lefttime >= 0) {
					leftTime = data.lefttime;
				} if (data.achieve >= 0) {
					yuanbao = data.achieve;
				}
			}

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
			if (yuanbao != null) {
				this.html_cost.style.align = "center";
				this.html_cost.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>当前消费：</span>" + "<span style='color:#179a0d;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + yuanbao + "</span>";
			}
			else {
				this.html_cost.innerHTML = "";
			}
			if (id == 36) {
				this.html_time.style.align = "center";
				this.html_time.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.time + "</span>"
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
	}
}