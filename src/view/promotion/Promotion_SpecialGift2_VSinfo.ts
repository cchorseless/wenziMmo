/**Created by the LayaAirIDE*/
module view.promotion {
	export class Promotion_SpecialGift2_VSinfo extends ui.promotion.Promotion_SpecialGift2_VSinfoUI {
		public id;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data, lefttime, text) {
			GameUtil.timeCountDown(lefttime, this.html_time);
			this.html_title.style.align = "center"
			this.html_title.innerHTML = "<span style='color:#ffffff;font-family:STLiti;fontSize:30;stroke:3;strokeColor:#000000'>花费</span>"
				+ "<span style='color:#f9e596;font-family:STLiti;fontSize:32;stroke:3;strokeColor:#000000'>" + data.yuanbao + "元宝" + "</span>"
				+ "<span style='color:#ffffff;font-family:STLiti;fontSize:30;stroke:3;strokeColor:#000000'>获得神装礼包</span>"

			this.id = data.id;
			this.lab_buytimes.text = "限购次数：" + data.leftcnt
			this.lab_curRmb.text = "现价：" + data.rmb;
			this.lab_oldtime.text = "原价：" + data.oldrmb;
			for (let i in data.items) {
				let o = new Promotion_Special_VSinfo_Itembox();
				o.setData(data.items[i])
				let p = parseInt(i) - 1;
				o.y = Math.floor(p / 2) * (o.height + 10);
				o.x = p % 2 * (o.width + 18)
				this.panel_item.addChild(o);
			}
		}
		public addEvent() {
			this.btn_get.on(Laya.UIEvent.CLICK, this, function () {
				let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.BuyWorthGiftBag, [this.id])
				lcp.send(pkt0);

			})
		}
	}
}