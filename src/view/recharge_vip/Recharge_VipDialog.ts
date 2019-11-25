/**Created by the LayaAirIDE*/
module view.recharge_vip {
	export class Recharge_VipDialog extends ui.recharge_vip.Recharge_VipDialogUI {
		public static self: Recharge_VipDialog;
		constructor() {
			super();
			Recharge_VipDialog.self = this;
			this.addEvent();
		}
		//  0:充值   1:VIP特权      月卡转移到menu界面
		public setData(tab) {
			for (let i = 0; i < 2; i++) {
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.ViewS_show.addItem(box);
			}
			this.ViewS_show.selectedIndex = this.tab_div.selectedIndex = tab;
			this.getActiveInfoData(this.tab_div.selectedIndex);

		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {
				// GameApp.LListener.offCaller(ProtoCmd.ZGTQ_Open, this)
				GameApp.LListener.offCaller(ProtoCmd.cashPanel, this)
				GameApp.LListener.offCaller(ProtoCmd.VIP_OpenPlane, this)
				this.close();
			})

			this.tab_div.on(Laya.UIEvent.CLICK, this, () => {
				this.ViewS_show.selectedIndex = this.tab_div.selectedIndex;
				this.getActiveInfoData(this.tab_div.selectedIndex);

			})
		}
		// 
		// 	if (id == 0) {
		// 		GameApp.LListener.on(ProtoCmd.ZGTQ_Open, this, (data) => {
		// 			box.removeChildren();
		// 			let o = new Recharge_VIPMonthCard()
		// 			o.setData(data)
		// 			box.addChild(o);
		// 		})
		// 		let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.ZGTQ_Open, null)
		// 		lcp.send(pkt0);
		// 	}
		public changeTab() {
			this.ViewS_show.selectedIndex = this.tab_div.selectedIndex = 1;
			this.getActiveInfoData(this.tab_div.selectedIndex);
		}
		public getActiveInfoData(id) {
			let box = this.ViewS_show.getChildAt(id);
			if (box.numChildren == 0) {
				if (id == 0) {
					GameApp.LListener.on(ProtoCmd.cashPanel, this, (data) => {
						box.removeChildren();
						let o = new Recharge_Item()
						o.setData(data)
						box.addChild(o);
					})
					let pkt1 = new ProtoCmd.QuestClientData().setString(ProtoCmd.cashPanel, null)
					lcp.send(pkt1);
				} else if (id == 1) {
					GameApp.LListener.on(ProtoCmd.VIP_OpenPlane, this, (data) => {
						box.removeChildren();
						let o = new Recharge_VipWelfare()
						o.x = 16;
						o.setData(data)
						box.addChild(o);
					})
					let pkt2 = new ProtoCmd.QuestClientData().setString(ProtoCmd.VIP_OpenPlane, null)
					lcp.send(pkt2);
				}
			}
		}
	}
}