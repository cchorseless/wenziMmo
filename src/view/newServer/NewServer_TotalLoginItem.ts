/**Created by the LayaAirIDE*/
module view.newServer {
	export class NewServer_TotalLoginItem extends ui.newServer.NewServer_TotalLoginItemUI {
		public static self: NewServer_TotalLoginItem;
		public touchID = 1;
		public data;
		public totalDay = 0;
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
			this.btn_back.on(Laya.UIEvent.CLICK, this, function () {
				GameApp.LListener.offCaller(ProtoCmd.leijidenglu_minbandakai,this)
				PopUpManager.checkPanel(PanelManage.NewServerActive, true);
			})
		}
		public getData() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.leijidenglu_minbandakai, [0])
			lcp.send(pkt);
		}
		public setData(data) {
			if (this.panel_item.numChildren > 0) {
				this.panel_item.removeChildren();
			}

			delete data['desc'];
			delete (data.desc);
			for (let i in data) {
				if (data[i]) {
					let o = new view.newServer.NewServer_TotalLogin_Item()
					o.setData(data[i]);
					o.x = 4;
					o.y = (parseInt(i) - 1) * (o.height + 15)
					this.panel_item.addChild(o);
					if (data[i].status == 2) {
						this.totalDay++
					}
				}
			}
			this.FC_num.value = "" + this.totalDay;
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