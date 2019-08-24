/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuPanel extends ui.menu.MenuPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.btn_menuTujian.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTuJianJiangHuPanel();
			})
			this.btn_qiandao.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MenuQiandaoDialog().popup(true);
			})
			this.btn_mail.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MailDialog().popup(true);
			})
			this.btn_menuPaiming.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MenuPaiHangDialog().popup(true);
			})
			this.btn_menuChengjiu.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MenuChengJiuDialog().popup(true);
			})

		}
	}
}
