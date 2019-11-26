/**Created by the LayaAirIDE*/
module view.newServer {
	export class NewServer_TotalLoginItem extends ui.newServer.NewServer_TotalLoginItemUI {
		public static self: NewServer_TotalLoginItem;
		public touchID = 1;
		public data;
		constructor() {
			super();
			NewServer_TotalLoginItem.self = this;
			this.addEvent();
			this.getData();
			this.panel_item.vScrollBarSkin = "";
		}
		public addEvent() {
			GameApp.LListener.on(ProtoCmd.leijidenglu_minbandakai, this, function (data) {
				this.setData(data);
			})
			EventManage.onWithEffect(this.btn_get, Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.leijidenglu_minbandakai, [this.touchID])
				lcp.send(pkt);
			})
		}
		public getData() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.leijidenglu_minbandakai, [0])
			lcp.send(pkt);
		}
		public setData(data) {
			this.data = data;
			for (let i = 1; i < 8; i++) {
				if (data[i]) {
					let o = new view.newServer.NewServer_TotalLogin_Item()
					o.setData(data[i]);
					o.x = (i - 1) % 3 * (o.width + 15);
					o.y = Math.floor((i - 1) / 3) * (o.width + 15)
					this.panel_item.addChild(o);
				}
			}
			this.itemState();
		}
		public onChooseItem(id) {
			this.touchID = id;
			this.itemState();
		}
		public itemState() {
			for (let i = 0; i < this.panel_item.numChildren; i++) {
				let p: any = this.panel_item.getChildAt(i);
				p.img_circle.visible = false;
				if (p.id == this.touchID) {
					p.img_circle.visible = true;
				}
			}
		}
	}
}