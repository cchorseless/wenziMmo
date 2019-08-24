/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuPanel extends ui.menu.MenuPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.addEvent();
			this.smallEvent();
		}
		public addEvent(): void {
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
			this.btn_active.on(Laya.Event.CLICK, this, () => {
				this.box_menuMain.visible = false;
				this.box_menuActive.visible = true;
			})
			this.btn_choujiang.on(Laya.UIEvent.CLICK, this, () => {
				this.box_menuMain.visible = false;
				this.box_menuChoujiang.visible = true;
			})
			this.btn_cuxiao.on(Laya.UIEvent.CLICK, this, () => {
				this.box_menuMain.visible = false;
				this.box_menuCuxiao.visible = true;
			})
			this.btn_menuGonglve.on(Laya.UIEvent.CLICK, this, () => {
				this.box_menuMain.visible = false;
				this.box_menuGonglve.visible = true;
			})
			this.btn_jifenGet.on(Laya.UIEvent.CLICK, this, () => {
				this.box_mainChoujiang.visible = false;
				this.box_choujiangDuiHuan.visible = true;
			})
		}
		public smallEvent(): void {
			this.panel_menuActive.vScrollBarSkin = '';
			this.vbox_menuActive['sortItem'] = (items) => { };
			for (let i = 0; i < 10; i++) {
				this.vbox_menuActive.addChild(new view.compart.MenuActiveItem());
			}
		}
	}
}
