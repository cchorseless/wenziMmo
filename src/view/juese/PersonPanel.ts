/**Created by the LayaAirIDE*/
module view.juese {
	export class PersonPanel extends ui.juese.PersonPanelUI {
		constructor() {
			super();
			GameApp.GameEngine.mainPlayer.playerORHero = 0;
		}

		public setData(): void {
			this.btn_self.selected=true;
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
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel()
			})
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel()
			})
			for (let i = 0; i < 3; i++) {
				EventManage.onWithEffect(this['btn_dizi' + i], Laya.UIEvent.CLICK, this, () => {
					PanelManage.openDiZiPanel(i);
					GameApp.GameEngine.mainPlayer.playerORHero = i + 1;
					PanelManage.DiZi.tab_left.selectedIndex = PanelManage.DiZi.viw_left.selectedIndex = 0;
				})

			}
			EventManage.onWithEffect(this.btn_self, Laya.UIEvent.CLICK, this, () => {
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
				console.log(jsonData)
				GameApp.GameEngine.HeroInfo = jsonData;
				this.init_event();
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
		/**
		 * 初始化ICON
		 */
		public init_event(): void {
			//我的头像
			this.img_my.skin = LangConfig.getPlayerIconSkin();
			//弟子头像
			let heroSex;
			if (GameApp.MainPlayer.sex == EnumData.SEX_TYPE.SEX_MAN) {
				heroSex = EnumData.SEX_TYPE.SEX_WOMEN;
			}
			if (GameApp.MainPlayer.sex == EnumData.SEX_TYPE.SEX_WOMEN) {
				heroSex = EnumData.SEX_TYPE.SEX_MAN;
			}
			for (let i = 1; i < 4; i++) {
				this['img_di' + i].skin = LangConfig.getPlayerIconSkin(heroSex, GameApp.GameEngine.HeroInfo[i].JOB);
			}
		}
	}
}