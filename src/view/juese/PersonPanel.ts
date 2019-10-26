/**Created by the LayaAirIDE*/
module view.juese {
	export class PersonPanel extends ui.juese.PersonPanelUI {
		constructor() {
			super();
			GameApp.GameEngine.mainPlayer.playerORHero = 0;
		}

		public setData(): void {
			this.tab_player.selectHandler = Laya.Handler.create(this, (index) => {
				(this.viw_player.getChildAt(index) as any).setData();
				this.viw_player.selectedIndex = index;
				this.img_cloud.visible = index == 1;
			}, null, false);
			this.addEvent();
			this.init_Dizi();
			this.addLcpEvent();
		}
		public addEvent(): void {
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel()
			});
			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});
			for (let i = 0; i < 3; i++) {
				this['btn_dizi' + i].on(Laya.UIEvent.CLICK, this, () => {
					PanelManage.openDiZiPanel(i);
					GameApp.GameEngine.mainPlayer.playerORHero = i + 1;
				})

			}
			this.btn_self.on(Laya.UIEvent.CLICK, this, () => {
				GameApp.GameEngine.mainPlayer.playerORHero = 0;
			})
		}
		public Dispose(): void {
			console.log(1111111111, 'PersonPanel')
			PopUpManager.Dispose(this)
		}
		/**
		 * 初始化弟子基本信息
		 */
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.Hero_HeroBaseInfo, this, (jsonData: ProtoCmd.itf_Hero_BaseInfo) => {
				GameApp.GameEngine.HeroInfo = jsonData;
			})
		}
		public DisposeHero(): void {
			GameApp.LListener.offCaller(ProtoCmd.Hero_HeroBaseInfo, this);
			PopUpManager.Dispose(this);
		}
		//弟子基本信息发协议
		public init_Dizi(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_HeroBaseInfo)
			lcp.send(pkt);
		}
	}
}