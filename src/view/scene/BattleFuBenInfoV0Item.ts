/**Created by the LayaAirIDE*/
module view.scene {
	export class BattleFuBenInfoV0Item extends ui.scene.BattleFuBenInfoV0ItemUI {
		constructor() {
			super();
			this.name = 'BattleFuBenInfoV0Item';
			this.addEvent();
		}


		public setData(): void {

		}

		public addEvent() {
			EventManage.onWithEffect(this.btn_exit, Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.FB_ChuMoLeave);
				lcp.send(pkt);
			});

			this.addLcpEvent();
		}

		public addLcpEvent() {
			GameApp.LListener.on(ProtoCmd.FB_ChuMoRightPlane, this, (jsonData: ProtoCmd.itf_FB_MainFBjindu) => {
				console.log(jsonData);
				this.lbl_leftTime.text = '' + jsonData.sec + '秒';
				this.lbl_tongGuanTiaoJian.text = '' + jsonData.tiaojian + '(' + jsonData.curcnt + '/' + jsonData.totalcnt + ')';
				// if (this.hbox_0.numChildren > 0) {
				// 	for (let i = 0; jsonData.item[i]; i++) {
				// 		let itemBase = new ProtoCmd.ItemBase();
				// 		let new_ui = new view.compart.DaoJuWithNameItem();
				// 		new_ui.setData(itemBase);
				// 		this.vbox_0.addChild(new_ui);
				// 	}
				// }
			})
		}

		public destroy() {
			GameApp.LListener.offCaller(ProtoCmd.FB_ChuMoRightPlane, this);
			super.destroy(true)
		}
	}
}