/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_FirstChargeDialog extends ui.menu.Menu_FirstChargeDialogUI {
		public static self: Menu_FirstChargeDialog;
		public data;
		public curTab = 0;
		constructor() {
			super();
			Menu_FirstChargeDialog.self = this;
			this.addEvent();
			this.getData()
		}
		public getData() {
			let pkt2 = new ProtoCmd.QuestClientData().setString(ProtoCmd.FirstChargeOpen, null)
			lcp.send(pkt2);
		}
		//0:任意金额  1:10元   2:40元  3：100元
		public setData(data) {
			// this.data = data;

			if (this.ViewS_show.items.length >0) {
				for (let o = 0; o < this.ViewS_show.items.length; o++) {
					this.ViewS_show.items[o].removeChildren();
					let p = new view.menu.Menu_FirstCharge_VSinfo()
					p.setData(data.tab[o + 1], data.num, o + 1)
					this.ViewS_show.items[o].addChild(p);
				}
			} else {
				for (let i = 0; i < 4; i++) {
					let box = new Laya.Box();
					box.top = box.bottom = box.right = box.left = 0;
					this.ViewS_show.addItem(box);
					box.removeChildren();
					let o = new view.menu.Menu_FirstCharge_VSinfo()
					o.setData(data.tab[i + 1], data.num, i + 1)
					box.addChild(o);
				}

			}
			this.ViewS_show.selectedIndex = this.tab_div.selectedIndex = this.curTab;
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				GameApp.LListener.offCaller(ProtoCmd.FirstChargeOpen, this)
				this.close();
			})

			this.tab_div.on(Laya.UIEvent.CLICK, this, () => {
				this.ViewS_show.selectedIndex = this.tab_div.selectedIndex;
				this.curTab = this.tab_div.selectedIndex;
				let p = this.ViewS_show.getChildAt(this.tab_div.selectedIndex)
				let o: any = p.getChildAt(0);
				o.panel_info.scrollTo(1);
			})
			GameApp.LListener.on(ProtoCmd.FirstChargeOpen, this, (data) => {
				this.setData(data)
			})
		}
	}
}