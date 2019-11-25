/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_ExpRefine extends ui.menu.Menu_ExpRefineUI {
		constructor() {
			super();
			this.addEvent()
			this.setData()
			
		}
		public setData() {
			let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.ExpRefineOpen, null);
			lcp.send(pkt);
		}
		public addEvent() {
			GameApp.LListener.on(ProtoCmd.ExpRefineOpen, this, (data) => {
				this.setView(data);
			})
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				GameApp.LListener.offCaller(ProtoCmd.ExpRefineOpen, this)
				this.close();
			})
			this.btn_refine1.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.ExpRefining, [1])
				lcp.send(pkt);
			})
			this.btn_refine2.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.ExpRefining, [2]);
				lcp.send(pkt);
			})

		}
		public setView(data) {
			this.lab_getExp.text = data.addexp + "";
			this.lab_cost1.text = data.yuanbao + "";
			this.lab_cost2.text = data.heroyuanbao + "";
			this.lab_LvNum1.text = data.lv + "";
			this.lab_LvNum2.text = data.herolv + "";
			this.lab_refrushNum1.text = data.cnt + "";
			this.lab_refrushNum2.text = data.herocnt + "";
			GameUtil.timeCountDown(data.leftsec, this.html_time);
		}
	}
}