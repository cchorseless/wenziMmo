/**Created by the LayaAirIDE*/
module view.hero {
	export class HeroPanel extends ui.hero.HeroPanelUI {
		constructor() {
			super();
		}
		public setData(index): void {
			this.tab_left.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_left.selectedIndex = index;
				if (index == 0) {
					this.img_bg.visible = true;
				}
			}, null, false);
			this.ui_diziInfo.baseInfo(index);
			this.ui_equipProps.baseInfo(index);
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel()
			});
			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});
			this.btn_player.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJueSePanel();
			});
			for (let i = 0; i < 3; i++) {
				this['btn_dizi' + i].on(Laya.UIEvent.CLICK, this, () => {
					PanelManage.openDiZiPanel(i);
					this.ui_diziInfo.baseInfo(i);
					this.ui_equipProps.baseInfo(i);
				})
			}
		}
	}
}