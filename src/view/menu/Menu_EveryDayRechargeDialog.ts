/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_EveryDayRechargeDialog extends ui.menu.Menu_EveryDayRechargeDialogUI {
		public state;
		constructor() {
			super();
			this.addEvent();
			this.setData();
		}
		public setData() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.Active41, null);
			lcp.send(pkt);
		}
		public addEvent() {
			GameApp.LListener.on(ProtoCmd.Active41, this, (data) => {
				this.setView(data);
			})
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				GameApp.LListener.offCaller(ProtoCmd.Active41, this)
				this.close();
			})
			this.btn_recharge.on(Laya.UIEvent.CLICK, this, function () {
				if (this.state == 0) {
					let o = new recharge_vip.Recharge_VipDialog();
					o.setData(0);
					o.show()
				} else if (this.state == 1) {
					let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.MeiRiShouChongGet,null);
					lcp.send(pkt);
				}
			})

		}
		public setView(data) {
			GameUtil.timeCountDown(data.leftsec, this.html_time);
			this.state = data.bj;
			if (this.state == 0) {
				this.btn_recharge.label = "充点小钱"
				this.btn_recharge.disabled = false;
			} else if (this.state == 1) {
				this.btn_recharge.label = "领取"
				this.btn_recharge.disabled = false;
			} else if (this.state == 2) {
				this.btn_recharge.disabled = true;
				this.btn_recharge.label = "已领取"
			}
			for (let i in data.item) {
				let o = new view.compart.DaoJuWithNameItem();
				let itemBase = new ProtoCmd.ItemBase()
				itemBase.dwBaseID = parseInt(data.item[i].index);
				itemBase.dwCount = data.item[i].num;
				itemBase.dwBinding = data.item[i].binding;
				o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				o.x = (o.width + 40) * ((parseInt(i) - 1) % 2)
				o.y = (o.height + 40) * Math.floor((parseInt(i) - 1) / 2)
				this.panel_reward.addChild(o)
			}
		}
	}
}