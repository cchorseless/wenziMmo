/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_Luck_ExtraGift_Item extends ui.activity.Active_Luck_ExtraGift_ItemUI {
		public bj;
		public id;
		constructor() {
			super();
			this.addEvent()
			this.panel_item.hScrollBarSkin = "";
		}
		public setData(data, id) {
			this.bj = data.bj;
			this.id = id;
			if (this.bj == 0) {
				this.btn_get.disabled = true;
				this.btn_get.label = "领取"
			} else if (this.bj == 1) {
				this.btn_get.disabled = false;
				this.btn_get.label = "领取"
			} else if (this.bj == 2) {
				this.btn_get.disabled = true;
				this.btn_get.label = "已领取"
			}
			this.lab_name.text = "达到" + data.cnt + "次可领取"
			for (let i in data.item) {
				let o = new view.compart.DaoJuItem();
				let base = new ProtoCmd.ItemBase();
				base.dwBaseID = data.item[i].index;
				base.dwCount = data.item[i].num;
				base.dwBinding = data.item[i].binding;
				o.setData(base, EnumData.ItemInfoModel.SHOW_IN_MAIL)
				let p = parseInt(i);
				o.x = (o.width + 8) * (p - 1);
				this.panel_item.addChild(o);
			}
		}
		public addEvent() {
			this.btn_get.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.FuDaiGet, [this.id])
				lcp.send(pkt);
			})
		}
	}
}