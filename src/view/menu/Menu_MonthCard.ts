/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_MonthCard extends ui.menu.Menu_MonthCardUI {
		constructor() {
			super();
			this.setData();
			this.addEvent()
		}
		public setData() {
			let box = new Laya.Box();
			box.top = box.bottom = box.right = box.left = 0;
			this.ViewS_show.addItem(box);
			GameApp.LListener.on(ProtoCmd.ZGTQ_Open, this, (data: ProtoCmd.itf_Menu_MoonCardInfo) => {
				box.removeChildren();
				let o = new recharge_vip.Recharge_VIPMonthCard()
				PanelManage.Main.getMoonCardData();
				o.setData(data)
				box.addChild(o);
			})
			let pkt1 = new ProtoCmd.QuestClientData().setString(ProtoCmd.ZGTQ_Open, null)
			lcp.send(pkt1)
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				GameApp.LListener.offCaller(ProtoCmd.ZGTQ_Open, this)
				this.close();
			})
		}
	}
}