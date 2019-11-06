/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_Panel_Item extends ui.activity.Active_Panel_ItemUI {
		constructor() {
			super();
			this.panel_ui.vScrollBarSkin = ""
			this.addEvent();
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_buy, Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.ChaoZhiLC_Buy, null)
				lcp.send(pkt);
			})
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
				case 16: case 18: case 19: case 32: case 14: case 13: case 36: case 17: case 1: case 100:
				case 10: case 35:
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
				case 3:
					for (let i in data.tab) {
						let o = new Active_DevelopFundItem();
						o.setData(data.tab[i]);
						let s = parseInt(i);
						o.y = Math.floor((s - 1) / 2) * (o.height + 30);
						o.x = (s - 1) % 2 * (o.width + 30)
						this.panel_ui.addChild(o)
					}
					this.box_develop_fund.visible = true;
					this.lab_costNum.text = data.needrmb + "元宝"
					if (data.shengyucnt > 0) {
						if (data.buyflag == 0) {
							this.btn_buy.label = "购买";
							this.btn_buy.disabled = false;
						} else if (data.buyflag == 1) {
							this.btn_buy.label = "已购买";
							this.btn_buy.disabled = true;
						}
					}
					else {
						this.btn_buy.label = "已售罄";
						this.btn_buy.disabled = true;
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

			} else if (id == 18 || id == 19 || id == 32 || id == 5 || id == 14 || id == 13 || id == 36 || id == 17 || id == 1 || id == 100 || id == 10 || id == 35) {
				if (data.lefttime >= 0) {
					leftTime = data.lefttime;
				} if (data.achieve >= 0) {
					yuanbao = data.achieve;
				}
			}
			else if (id == 3) {
				leftTime = data.daojishi
			}

			if (data.introduce) {
				this.lab_rules.text = data.introduce;
			} else if (data.context) {
				this.lab_rules.text = data.context;
			}
			else {
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
			if (id == 17) {
				this.html_cost.style.align = "center";
				this.html_cost.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>登录天数：</span>"
					+ "<span style='color:#179a0d;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.cnt + "</span>";
			}
			if (id == 36) {
				this.html_time.style.align = "center";
				this.html_time.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.time + "</span>"
			}
			if (id == 3) {
				this.html_cost.style.align = "center";
				this.html_cost.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>全服剩余数量：</span>"
					+ "<span style='color:#179a0d;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.shengyucnt + "</span>";
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
			// TipsManage.showTips("活动已结束")
			// PopUpManager.checkPanel(this);
		}
	}
}