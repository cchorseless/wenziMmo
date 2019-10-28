/**Created by the LayaAirIDE*/
module view.compart {
	export class RechargeListInfo extends ui.compart.RechargeListInfoUI {
		public infoID;
		public itemBaseID;
		public data;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data, id) {
			this.data = data;
			this.infoID = id;
			// this.itemBaseID = data.id;
			// let strName = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(this.itemBaseID.toString());
			this.lab_text.text = "赠送" + data[1] + "元宝";
			this.btn_pay.label = data[0] + "元"
			// this.img_icon.skin = ""

		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_pay, Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.test_sendrmb, [this.data[0]])
				lcp.send(pkt);
			})
		}
	}
}