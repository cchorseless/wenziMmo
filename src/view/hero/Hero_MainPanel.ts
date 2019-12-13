/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_MainPanel extends ui.hero.Hero_MainPanelUI {
		constructor() {
			super();
		}
		public state = false
		public setData(): void {
			this.btn_hero.selected = true;
			this.tab_left.selectHandler = Laya.Handler.create(this, (index) => {
				(this.viw_left.getChildAt(index) as any).setData();
				this.viw_left.selectedIndex = index;
			}, null, false);
			this.addEvent();
			this.init_dizi();
			this.init_heroInfo();
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			})
			EventManage.onWithEffect(this.btn_self, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJueSePanel();
			})
		}
		public init_dizi(): void {
			if (this.state == false) {
				let heroInfo = [GameApp.MainPlayer.hero1, GameApp.MainPlayer.hero2, GameApp.MainPlayer.hero3];
				for (let idx in heroInfo) {
					if (heroInfo[idx].lockState == 2) {
						this.state = true;
						break;
					}
				}
				if (this.state) {
					this.tab_left.disabled = false;
				} else {
					this.tab_left.disabled = true;
				}
			}
		}
		public init_heroInfo(): void {
			for (let i = 1; i < 4; i++) {
				let pkt = new ProtoCmd.SUBCMD_HERO_ABILITY;
				pkt.setValue('btJob', i);
				lcp.send(pkt);
			}
		}
	}
}