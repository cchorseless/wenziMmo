/**Created by the LayaAirIDE*/
module view.promotion {
	export class Promotion_SpecialGift extends ui.promotion.Promotion_SpecialGiftUI {
		public static self: Promotion_SpecialGift;
		public SpecialGiftType;
		public data2;
		public curbox;
		constructor() {
			super();
			Promotion_SpecialGift.self = this;
		}
		//data  是数据用来设置tab              id  是用来判断是特惠礼包1\2  
		public setData(data, id) {
			this.SpecialGiftType = id
			this.panel_tab.hScrollBarSkin = "";
			this.hbox_tab['sortItem'] = (items) => { };
			if (id == 1) {
				this.hbox_tab.x = this.hbox_tab.y = 0;
				for (let i in data) {
					let o = new Promotion_SpecialGift_TabItem();
					let index = parseInt(i) - 1;
					data[i].id = index;
					o.setData(data[i].id, data[i].name);
					this.hbox_tab.addChild(o);
					let box = new Laya.Box();
					box.top = box.bottom = box.right = box.left = 0;
					this.viewS_main.addItem(box);
				}
			}
			else if (id == 2) {
				this.data2 = data;
				this.hbox_tab.x = 70;
				this.hbox_tab.y = 0;
				for (let i in data.itemtab) {
					let o = new Promotion_SpecialGift_TabItem();
					let index = parseInt(i) - 1;
					data.itemtab[i].id = index;
					o.setData(data.itemtab[i].id, "神秘礼包");
					this.hbox_tab.addChild(o);
					let box = new Laya.Box();
					box.top = box.bottom = box.right = box.left = 0;
					this.viewS_main.addItem(box);
				}

			}
			this.onChooseTabItem(0);
			this.addEvent();
			// 第一个活动

		}
		public addEvent() {

			for (let i = 0; i < this.hbox_tab.numChildren; i++) {
				let p: any = this.hbox_tab.getChildAt(i);
				p.on(Laya.UIEvent.CLICK, this, function () {
					this.changeTabState(i);
					// this.viewS_main.selectedIndex = i;
					this.getActiveInfoData(i);
				})
			}
		}
		public onChooseTabItem(id) {
			this.changeTabState(id);

			this.getActiveInfoData(id);
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
		public getActiveInfoData(id) {
			this.curbox = this.viewS_main.getChildAt(id);
			let index = id + 1;
			if (this.curbox.numChildren <= 0) {
				if (this.SpecialGiftType == 1) {
					GameApp.LListener.on(ProtoCmd.TeHuiClientOpen, this, (data) => {
						this.curbox.removeChildren();
						let o = new Promotion_SpecialGift_VSinfo()
						o.setData(data)
						this.curbox.addChild(o);
						// console.log("|||||||||||||||||" + Promotion_SpecialGift.self.curbox.name)
					})
					let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.TeHuiClientOpen, [index])
					lcp.send(pkt0);
				} else {
					// let index = id + 1;
					this.curbox.removeChildren();
					// console.log(":::::::::::::::" + Promotion_SpecialGift.self.curbox.name)
					let o = new Promotion_SpecialGift2_VSinfo();
					o.setData(this.data2.itemtab[index], this.data2.lefttime, this.data2.context)
					this.curbox.addChild(o);
				}

			}
			this.viewS_main.selectedIndex = id;
		}
		public destroy(e = true) {
			GameApp.LListener.offCaller(ProtoCmd.TeHuiClientOpen, this)
			super.destroy(e)
		}
	}
}