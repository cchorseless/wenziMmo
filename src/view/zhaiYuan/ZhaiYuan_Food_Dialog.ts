/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_Food_Dialog extends ui.zhaiYuan.ZhaiYuan_Food_DialogUI {
		public changeNum;
		public useNum;
		constructor() {
			super();
			this.addEvent();
			this.setData();
		}
		public setData() {
			let arr: ProtoCmd.itf_ZHAIYUAN_INFO = GameApp.GameEngine.zhaiYuaninfo;
			this.lab_foodNum.text = arr.foodValue + '';
			this.lab_cost.text = arr.totalConsume + '/H'
			let span = arr.servants - arr.leisureServants;
			this.lab_PY_Use.text = span + '/' + arr.servants;
			this.timeCutDown(arr.leftTime);
			// this.lab_num.text = arr.leisureServants + '';
			this.useNum = span;
			this.showXiaoLv(this.useNum)

		}
		public showXiaoLv(num) {
			this.lab_num.text = num + '';
			this.lab_xiaolv.text = 1000 + 1000 * num + '';
		}
		public timeCutDown(second) {
			let self = this;
			if (second > 0) {
				second = second * 60;
				let aa = TimeUtils.getFormatBySecond(second, 6);
				this.lab_costTime.text = aa;
			} else if (second == 0) {
				this.lab_costTime.text = "已耗尽";
			} else if (second == -1) {
				this.lab_costTime.text = "无限";
				return;
			}
			Laya.timer.loop(60000, ui, round);
			function round() {
				second--;
				if (second >= 0) {
					let time = TimeUtils.getFormatBySecond(second, 6)
					self.lab_costTime.text = time;
				}
				else {
					self.lab_costTime.text = "已耗尽";
					Laya.timer.clear(ui, round)
				}
			}
		}
		public addEvent() {
			this.btn_add.on(Laya.UIEvent.CLICK, this, function () {
				if (this.useNum < GameApp.GameEngine.zhaiYuaninfo.servants) {
					this.useNum++;
					this.showXiaoLv(this.useNum)
				} else {
					return
				}

			})
			this.btn_cut.on(Laya.UIEvent.CLICK, this, function () {
				if (this.useNum > 0) {
					this.useNum--;
					this.showXiaoLv(this.useNum)
				} else {
					return
				}
			})
			this.btn_confirm.on(Laya.UIEvent.CLICK, this, function () {
				let span = this.useNum - (GameApp.GameEngine.zhaiYuaninfo.servants - GameApp.GameEngine.zhaiYuaninfo.leisureServants);
				if (span > 0) {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.addOrRemoveServant, [0, span]
						, 0, this, function (data) {
							GameApp.GameEngine.zhaiYuaninfo.leisureServants = data.leisureServants;
							ZhaiYuanPanel.self.showZhaiYuanMsg(GameApp.GameEngine.zhaiYuaninfo)
							this.close();
						});
					lcp.send(pkt);
				} else if (span == 0) {
					this.close();
					return;
				} else if (span < 0) {
					span = Math.abs(span)
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.addOrRemoveServant, [1, span],
						0, this, function (data) {
							GameApp.GameEngine.zhaiYuaninfo.leisureServants = data.leisureServants;
							ZhaiYuanPanel.self.showZhaiYuanMsg(GameApp.GameEngine.zhaiYuaninfo)
							this.close();
						});
					lcp.send(pkt);
				}
				// 
			})
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
		}
	}
}