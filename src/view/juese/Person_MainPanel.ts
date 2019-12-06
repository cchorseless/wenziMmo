/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_MainPanel extends ui.juese.Person_MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.btn_self.selected = true;
			this.tab_player.selectHandler = Laya.Handler.create(this, (index) => {
				// (this.viw_player.getChildAt(index) as any).setData();
				this.viw_player.selectedIndex = index;
			}, null, false);
			this.addEvent();
			this.init_Dizi();
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel()
			})
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel()
			})
			// for (let job = 1; job < 4; job++) {
			// 	EventManage.onWithEffect(this['btn_dizi' + job], Laya.UIEvent.CLICK, this, () => {
			// 		PanelManage.openDiZiPanel(job);
			// 	})
			// }

		}
		//弟子基本信息发协议
		public init_Dizi(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_HeroBaseInfo, null, null, this, (jsonData: { [v: string]: ProtoCmd.itf_Hero_BaseInfo }) => {
				// 更新弟子状态
				for (let i = 1; i < 4; i++) {
					switch (jsonData[i].JOB) {
						case EnumData.JOB_TYPE.JOB_WARRIOR:
							GameApp.MainPlayer.hero1.lockState = jsonData[i].STATE;
							break;
						case EnumData.JOB_TYPE.JOB_MAGE:
							GameApp.MainPlayer.hero2.lockState = jsonData[i].STATE;
							break;
						case EnumData.JOB_TYPE.JOB_MONK:
							GameApp.MainPlayer.hero3.lockState = jsonData[i].STATE;
							break;
					}
				}
			});
			lcp.send(pkt);
		}
	}
}