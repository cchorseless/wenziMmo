/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_FirstCharge_VSinfo extends ui.menu.Menu_FirstCharge_VSinfoUI {
		public data;
		public bj;
		public cost
		public id ;
		constructor() {
			super();
			this.panel_info.vScrollBarSkin = ""
			
			this.addEvent();
		}
		public setData(data, cost, id) {
			this.id = id;
			this.data = data;
			this.bj = data.bj;
			this.cost = cost;
			this.lab_GiftName.text = data.huode;
			this.setTimeShow(cost, id);
			this.setBtnState();
			for (let i in data.item) {
				let o = new Menu_FirstCharge_VSinfo_item();
				o.setData(data.item[i]);
				let p = parseInt(i);
				o.y = (o.height + 15) * (p - 1)
				this.panel_info.addChild(o);
			}
		}
		public setBtnState() {
			if (this.bj == 0) {
				this.btn_get.label = "立即充值";
				this.btn_get.disabled = false;
			} else if (this.bj == 1) {
				this.btn_get.label = "立即领取";
				this.btn_get.disabled = false;
			} else {
				this.btn_get.label = "已领取";
				this.btn_get.disabled = true;
			}
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_get, Laya.UIEvent.CLICK, this, function () {
				if (this.bj == 0) {
					let o = new view.recharge_vip.Recharge_VipDialog();
					o.setData(0);
					o.popup(true);
				} else if (this.bj == 1) {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.FirstChargeGet, [this.id])
					lcp.send(pkt);
				}
			})
		}
		public setTimeShow(cost, id) {

			this.html_cost.style.align = "center";
			let str: string;
			str = "已充值："
			this.html_cost.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" + str + "</span>"
				+ "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + cost + "</span>"
				+ "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>元</span>"
			let need: string;
			switch (id) {
				case 1:
					need = "充值任意金额"
					break;
				case 2:
					need = "充值10元"
					break;
				case 3:
					need = "充值40元"
					break;
				case 4:
					need = "充值100元"
					break;
			}
			this.html_need.style.align = "center";
			this.html_need.innerHTML = "<span style='color:#010101;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" + need + "</span>"
				+ "<span style='color:#179a0d;font-family:STLiti-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>可领取</span>"


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
		public destroy(e =true){
			this.panel_info.scrollTo(1)
			super.destroy(e)
		}
	}
}