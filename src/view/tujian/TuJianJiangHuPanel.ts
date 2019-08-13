/**Created by the LayaAirIDE*/
module view.tujian {
	export class TuJianJiangHuPanel extends ui.tujian.TuJianJiangHuPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_jianghuTujian.vScrollBarSkin = "";
			this.vbox_jianghuTujian['sortItem'] = (items) => { };
			this.img_tujianJuese.on(Laya.UIEvent.CLICK, this, () => {
				// PanelManage.openTuJianJuesePanel();
			});
			this.img_tujianDaoju.on(Laya.UIEvent.CLICK, this, () => {
				// PanelManage.openTuJianDaojuPanel();
			});
			this.img_tujianBoss.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTuJianBossPanel();
			});
		}
	}
}