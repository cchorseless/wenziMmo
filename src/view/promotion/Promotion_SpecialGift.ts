/**Created by the LayaAirIDE*/
module view.promotion {
	export class Promotion_SpecialGift extends ui.promotion.Promotion_SpecialGiftUI {
		public static self: Promotion_SpecialGift
		constructor() {
			super();
			Promotion_SpecialGift.self = this;
		}
		public setData(data) {
			this.panel_tab.hScrollBarSkin = "";
			this.hbox_tab['sortItem'] = (items) => { };
			for (let i in data) {
				let o = new Promotion_SpecialGift_TabItem();
				let index = parseInt(i) - 1;
				data[i].id = index;
				o.setData(data[i]);
				o.x = (o.width + 25) * index + 15;
				this.hbox_tab.addChild(o);

				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.viewS_main.addItem(box);
			}
			this.addEvent();
			// 第一个活动
			this.onChooseTabItem(data[1]);
		}
		public addEvent() {
		}
		public onChooseTabItem(item) {
			this.changeTabState(item.id);
			this.viewS_main.selectedIndex = item.id;
			this.getActiveInfoData(item);
		}
		private changeTabState(index) {
			for (let i = 0; i < this.hbox_tab.numChildren; i++) {
				let p: any = this.hbox_tab.getChildAt(i);
				p.img_circle.visible = false;
				if (p.itemID == index) {
					p.img_circle.visible = true;
				}

			}
		}
		public getActiveInfoData(item) {
			
			let box = this.viewS_main.getChildAt(item.id);
			if (box.numChildren <= 0) {
				let index = item.id + 1;
				GameApp.LListener.on(ProtoCmd.TeHuiClientOpen, this, (data) => {
					box.removeChildren();
					let o = new Promotion_SpecialGift_VSinfo()
					o.setData(data)
					box.addChild(o);
				})
				let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.TeHuiClientOpen, [index])
				lcp.send(pkt0);
			}
			
		}
		public destroy(e=true) {
			GameApp.LListener.offCaller(ProtoCmd.TeHuiClientOpen, this)
			super.destroy(e)
		}
	}
}