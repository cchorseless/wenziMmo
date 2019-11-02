/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_Luck_ExtraGift_Dialog extends ui.activity.Active_Luck_ExtraGift_DialogUI {
		public data;
		constructor() {
			super();
			this.addEvent();
			this.setData()
			this.panel_item.vScrollBarSkin = "";
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				GameApp.LListener.offCaller(ProtoCmd.SendExItemPlane, this)
				this.close();
			})
			GameApp.LListener.on(ProtoCmd.SendExItemPlane, this, (data) => {
				this.upDataView(data)
			})
		}
		public setData() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.SendExItemPlane, null)
			lcp.send(pkt);
		}
		public upDataView(data) {
			this.data = data;
			this.lab_num.text = data.totaljifen.toString();
			for (let i in data.exitem) {
				let o = new Active_Luck_ExtraGift_Item()
				o.setData(data.exitem[i], parseInt(i));
				let p = parseInt(i)
				o.y = (o.height + 15) * (p - 1)
				this.panel_item.addChild(o);
			}

		}
	}
}