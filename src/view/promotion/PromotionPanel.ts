/**Created by the LayaAirIDE*/
module view.promotion {
	export class PromotionPanel extends ui.promotion.PromotionPanelUI {
		public static self: PromotionPanel;
		public tabNameArr = ["超值礼包", "特惠礼包", "特选礼包","每日特惠"];
		public btnState = 0;
		constructor() {
			super();
			PromotionPanel.self = this;

			this.panel_tab.hScrollBarSkin = "";
		}
		public setData() {
			this.hbox_tab['sortItem'] = (items) => { };

			for (let i = 0; i < this.tabNameArr.length; i++) {
				let o = new laya.ui.Button();
				o.label = this.tabNameArr[i];
				o.width = 140;
				o.height = 60;
				o.labelFont = "FZXK";
				o.labelSize = 28;
				o.skin = "image/main/btn_haoyou.png"
				o.stateNum = 2;
				this.hbox_tab.addChild(o);
				// 添加view_stack
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.View_S.addItem(box);
			}



			// for (let i = 0; i < 3; i++) {
			// 	let box = new Laya.Box();
			// 	box.top = box.bottom = box.right = box.left = 0;
			// 	this.View_S.addItem(box);
			// }
			this.View_S.selectedIndex = this.btnState;
			this.getActiveInfoData(this.btnState);
			this.addEvent();
		}

		public addEvent() {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
			for (let i = 0; i < this.tabNameArr.length; i++) {
				let p: any = this.hbox_tab.getChildAt(i);
				p.on(Laya.UIEvent.CLICK, this, function () {
					this.btnState = i;
					this.View_S.selectedIndex = this.btnState;
					this.getActiveInfoData(this.btnState);
				})
			}
		}

		public getActiveInfoData(id) {
			this.setBtnState();
			let box = this.View_S.getChildAt(id);
			if (box.numChildren == 0) {
				if (id == 0) {
					GameApp.LListener.on(ProtoCmd.chaozhiopen, this, (data) => {
						box.removeChildren();
						let o = new Promotion_WorthGift_Item()
						o.setData(data)
						box.addChild(o);
					})
					let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.chaozhiopen, null)
					lcp.send(pkt0);
				} else if (id == 1) {
					GameApp.LListener.on(ProtoCmd.TeHuiIndex, this, (data) => {
						box.removeChildren();
						let o = new Promotion_SpecialGift()
						o.setData(data, 1)
						box.addChild(o);
					})
					let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.TeHuiIndex, null)
					lcp.send(pkt0);

				} else if (id == 2) {
					GameApp.LListener.on(ProtoCmd.WorthGiftBagPanel, this, (data) => {
						box.removeChildren();
						let o = new Promotion_SpecialGift()
						o.setData(data, 2)
						box.addChild(o);
					})
					let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.WorthGiftBagPanel, null)
					lcp.send(pkt0);
				}
				else if (id == 3) {
					GameApp.LListener.on(ProtoCmd.Active33, this, (data) => {
						box.removeChildren()
						let o = new activity.Active_EveryDayRecharge_Item()
						o.setData(data)
						box.addChild(o);
					})
					let pkt33 = new ProtoCmd.QuestClientData().setString(ProtoCmd.Active33, null)
					lcp.send(pkt33);
				}
			}
		}
		public setBtnState() {
			for (let i = 0; i < 3; i++) {
				this["btn_promotion_" + i].selected = false;
				if (i == this.btnState) {
					this["btn_promotion_" + i].selected = true;
				}

			}
		}
		public Dispose() {
			GameApp.LListener.offCaller(ProtoCmd.chaozhiopen, this)
			GameApp.LListener.offCaller(ProtoCmd.TeHuiIndex, this)
			GameApp.LListener.offCaller(ProtoCmd.WorthGiftBagPanel, this)
			GameApp.LListener.offCaller(ProtoCmd.Active33, this)

			Laya.timer.clearAll(this)
			PopUpManager.Dispose(this)
		}

	}
}