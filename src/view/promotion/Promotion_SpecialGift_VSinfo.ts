/**Created by the LayaAirIDE*/
module view.promotion {
	export class Promotion_SpecialGift_VSinfo extends ui.promotion.Promotion_SpecialGift_VSinfoUI {
		public data;
		public bj;
		public id;
		constructor() {
			super();
			this.panel_item.vScrollBarSkin = "";
			this.addEvent();
		}
		public setData(data) {
			this.id = data.id;
			this.bj = data.bj;
			this.data = data;
			let items = data.item;
			this.setTimeShow(data)
			this.html_title.style.align = "center"
			this.html_title.innerHTML = "<span style='color:#ffffff;font-family:STLiti;fontSize:30;stroke:3;strokeColor:#000000'>花费</span>"
			 + "<span style='color:#f9e596;font-family:STLiti;fontSize:32;stroke:3;strokeColor:#000000'>"+ data.yuanbao + "元宝" + "</span>"
			 +"<span style='color:#ffffff;font-family:STLiti;fontSize:30;stroke:3;strokeColor:#000000'>获得神装礼包</span>"

			for (let i in items) {
				let o = new Promotion_Special_VSinfo_Itembox();
				o.setData(items[i])
				let p = parseInt(i) - 1;
				o.y = Math.floor(p / 2) * (o.height + 10);
				o.x = p % 2 * (o.width + 18)
				this.panel_item.addChild(o);
			}
			this.btnState();
		}
		public btnState() {
			if (this.bj != 2) {
				this.btn_get.disabled = false;
				if (this.bj == 0) {
					this.btn_get.label = "购买"
				}
				else if (this.bj == 1) {
					this.btn_get.label = "领取"
				}
			}
			else {
				this.btn_get.disabled = true;
				this.btn_get.label = "已领取"
			}
		}
		public setTimeShow(data) {

			let leftTime = data.leftsec;

			if (leftTime > 0) {
				let aa = TimeUtils.getFormatBySecond(leftTime, 6);
				this.html_time.style.align = "center";
				this.html_time.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>剩余时间：</span>" + "<span style='color:#a53232;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + aa + "</span>";
				this.onshowTime(leftTime)
			}
			// if (data.yuanbao != null) {
			// 	this.html_cost.style.align = "center";
			// 	let str: string;
			// 	str = "当前消费："
			// 	this.html_cost.innerHTML = "<span style='color:#554536;font-family:STLiti;fontSize:24;stroke:0.5;strokeColor:#000000'>" + str + "</span>" + "<span style='color:#179a0d;font-family:FZHuaLi-M14S;fontSize:24;stroke:0.5;strokeColor:#000000'>" + data.yuanbao + "</span>";
			// }
			else {
				// this.html_cost.innerHTML = "";
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

				});
			}

		}
		public addEvent() {
			this.btn_get
			EventManage.onWithEffect(this.btn_get, Laya.UIEvent.CLICK, this, function () {
				if (this.bj == 0) {
					let o = new view.recharge_vip.Recharge_VipDialog();
					o.setData(0);
					o.popup(true);
				}
				else if (this.bj == 1) {
					let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.TeHuiBuy, [this.id])
					lcp.send(pkt0);
				}
				else {
					return;
				}
			})
		}
	}
}