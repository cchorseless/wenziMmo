/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_timeBuy extends ui.activity.Active_timeBuyUI {
		public data;
		public itemID;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data, index) {
			this.data = data;
			this.itemID = index;
			this.lab_lastNum.text = "原:" + data.oldprice;
			this.lab_curNum.text = data.price;
			let baseid = data.index;
			let str = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(baseid.toString());
			this.lab_name.text = str;
			if (data.flag > 0) {
				this.btn_get.gray = false;
				this.btn_get.label = "购买";
			}
			else {
				this.btn_get.gray = true;
				this.btn_get.label = "已购买";
			}
			let b = new ProtoCmd.ItemBase()
			b.dwBaseID = baseid;
			b.dwCount = data.num;
			// 20/9
			let o = new view.compart.DaoJuItem();
			o.setData(b);
			o.x = 20;
			o.y = 9;
			this.addChild(o);
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_get, Laya.UIEvent.CLICK, this, function () {
				if (this.data.flag <= 0) {
					return;
				}
				else {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.LimitTimePanicBuy, [this.data.order]);
					lcp.send(pkt);
				}
			})
		}
	}
}