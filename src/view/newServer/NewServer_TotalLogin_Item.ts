/**Created by the LayaAirIDE*/
module view.newServer {
	export class NewServer_TotalLogin_Item extends ui.newServer.NewServer_TotalLogin_ItemUI {
		public id;
		public data;
		public desc;
		public status;
		constructor() {
			super();
			this.addEvent()
			this.panel_item.hScrollBarSkin = '';
		}
		public addEvent() {
			this.on(Laya.UIEvent.CLICK, this, function () {
				NewServer_TotalLoginItem.self.onChooseItem(this.id);
			})
			this.btn_get.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.leijidenglu_minbandakai, [this.id])
				lcp.send(pkt);
			})
		}
		public setData(data) {
			this.data = data;
			this.id = data.day;
			this.desc = data.desc;
			this.lab_title.text = this.desc;
			this.status = data.status;
			if (this.status == 1) {
				this.btn_get.disabled = false;
				this.btn_get.label = "领取"
			} else if (this.status == 2) {
				this.btn_get.disabled = true;
				this.btn_get.label = "已领取"
			} else if (this.status == 0) {
				this.btn_get.disabled = true;
				this.btn_get.label = "领取"
			}
			for (let i in data.items) {
				let o = new compart.DaoJuItem();
				let item = new ProtoCmd.ItemBase();
				item.dwBaseID = data.items[i].index;
				item.dwBinding = data.items[i].binding;
				item.dwCount = data.items[i].num;
				o.setData(item, EnumData.ItemInfoModel.SHOW_IN_MAIL)
				o.x = (parseInt(i) - 1) * (o.width + 10)
				o.scaleX=o.scaleY=0.86;
				this.hbox_item.addChild(o);
			}
		}
	}
}