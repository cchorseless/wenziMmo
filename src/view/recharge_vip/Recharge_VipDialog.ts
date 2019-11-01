/**Created by the LayaAirIDE*/
module view.recharge_vip {
	export class Recharge_VipDialog extends ui.recharge_vip.Recharge_VipDialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		//0:月卡  1:充值   2:VIP特权
		public setData(tab) {
			for (let i = 0; i < 3; i++) {
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.ViewS_show.addItem(box);
			}
			this.tab_div.selectedIndex = tab;
			this.getActiveInfoData(this.tab_div.selectedIndex);

		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, () => {

				this.close();
			})
			EventManage.onWithEffect(this.tab_div, Laya.UIEvent.CLICK, this, () => {
				this.ViewS_show.selectedIndex = this.tab_div.selectedIndex;
				this.getActiveInfoData(this.tab_div.selectedIndex);

			})
		}
		public getActiveInfoData(id) {
			let box = this.ViewS_show.getChildAt(id);
			if (id == 0) {
				let pkt0 = new ProtoCmd.QuestClientData().setString(ProtoCmd.cashPanel, null)
				lcp.send(pkt0);
			} else if (id == 1) {
				GameApp.LListener.on(ProtoCmd.cashPanel, this, (data) => {
					box.removeChildren();
					let o = new Recharge_Item()
					o.setData(data)
				})
				let pkt1 = new ProtoCmd.QuestClientData().setString(ProtoCmd.cashPanel, null)
				lcp.send(pkt1);
			} else if (id == 2) {
				GameApp.LListener.on(ProtoCmd.VIP_OpenPlane, this, (data) => {
					box.removeChildren();
					let o = new Recharge_VipWelfare()
					o.setData(data)
				})
				let pkt2 = new ProtoCmd.QuestClientData().setString(ProtoCmd.VIP_OpenPlane, null)
				lcp.send(pkt2);
			}
		}
	}
}