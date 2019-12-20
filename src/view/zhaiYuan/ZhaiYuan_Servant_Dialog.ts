/**Created by the LayaAirIDE*/
module view.zhaiYuan {
	export class ZhaiYuan_Servant_Dialog extends ui.zhaiYuan.ZhaiYuan_Servant_DialogUI {
		constructor() {
			super();
			this.addEvent();
			this.setData();
		}
		public setData() {
			let arr: ProtoCmd.itf_ZHAIYUAN_INFO = GameApp.GameEngine.zhaiYuaninfo;
			this.lab_costYuanbao.text = arr.recruitServantRmb + '';
			let span = arr.servants - arr.leisureServants;
			this.lab_ServantNum.text = span + '/' + arr.servants;
		}
		public addEvent() {
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
			this.btn_get.on(Laya.UIEvent.CLICK, this, function () {
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.recruitServant, null
					, 0, this, function (data) {
						GameApp.GameEngine.zhaiYuaninfo.servants = data.servants;
						GameApp.GameEngine.zhaiYuaninfo.leisureServants = data.leisureServants;
						ZhaiYuanPanel.self.showZhaiYuanMsg(GameApp.GameEngine.zhaiYuaninfo)
						this.setData();
					});
				lcp.send(pkt);
			})
		}
	}
}