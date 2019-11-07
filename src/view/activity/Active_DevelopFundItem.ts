/**Created by the LayaAirIDE*/
module view.activity {
	export class Active_DevelopFundItem extends ui.activity.Active_DevelopFundItemUI {
		public state;
		public index;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data) {
			this.state = data.flag;
			this.index = data.idx;
			let o = new view.compart.DaoJuItem();
			let itemBase = new ProtoCmd.ItemBase()
			itemBase.dwBaseID = 89;
			itemBase.dwCount = data.num;
			o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
			this.box_item.addChild(o)
			this.lab_name.text = "角色达到" + data.ms + "可领取";
			if (this.state == 1) {
				this.btn_get.label = "领取";
				this.btn_get.disabled = true;
			} else if (this.state == 0) {
				this.btn_get.label = "未领取";
				this.btn_get.disabled = false;
			}
			else if (this.state == 2) {
				this.btn_get.label = "已领取";
				this.btn_get.disabled = true;
			}
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_get, Laya.UIEvent.CLICK, this, function () {
				if (this.state != 0) {
					return;
				}
				let pkt35 = new ProtoCmd.QuestClientData().setString(ProtoCmd.ChaoZhiLC_LingQu, [this.index])
				lcp.send(pkt35);
			})
		}
	}
}