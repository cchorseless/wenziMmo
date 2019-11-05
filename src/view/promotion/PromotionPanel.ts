/**Created by the LayaAirIDE*/
module view.promotion {
	export class PromotionPanel extends ui.promotion.PromotionPanelUI {
		public static self: PromotionPanel;
		public btnState = 0;
		constructor() {
			super();
			PromotionPanel.self = this;
			this.addEvent();
		}
		public setData() {
			for (let i = 0; i < 3; i++) {
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.View_S.addItem(box);
			}
			this.View_S.selectedIndex = this.btnState;
			this.getActiveInfoData(this.btnState);
		}

		public addEvent() {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
			for (let i = 0; i < 3; i++) {
				this["btn_promotion_" + i].on(Laya.UIEvent.CLICK, this, function () {
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
						o.setData(data)
						box.addChild(o);
					})
					let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.TeHuiIndex, null)
					lcp.send(pkt0);

				} else if (id == 2) {

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



			Laya.timer.clearAll(this)
			PopUpManager.Dispose(this)
		}

	}
}