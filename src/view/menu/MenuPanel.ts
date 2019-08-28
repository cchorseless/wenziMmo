/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuPanel extends ui.menu.MenuPanelUI {
		constructor() {
			super();
		}
		public setData(): void {

			this.addEvent();
		}
		public addEvent(): void {
			//图鉴
			this.btn_menuTujian.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTuJianJuesePanel();
			})
			//签到
			this.btn_qiandao.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MenuQiandaoDialog().popup(true);
			})
			//邮件
			this.btn_mail.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MailDialog().popup(true);
			})
			//排名
			this.btn_menuPaiming.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MenuPaiHangDialog().popup(true);
			})
			//成就
			this.btn_menuChengjiu.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MenuChengJiuDialog().popup(true);
			})
			// 菜单活动
			this.btn_active.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_active.selected = !this.btn_active.selected;
				if (this.btn_active.selected) {
					this.box_menuMain.visible = false;
					this.ui_active.visible = true;
				}
				else {
					this.box_menuMain.visible = true;
					this.ui_active.visible = false
				}
			})
			// 菜单促销
			this.btn_cuxiao.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_cuxiao.selected = !this.btn_cuxiao.selected;
				if (this.btn_cuxiao.selected) {
					this.box_menuMain.visible = false;
					this.ui_cuxiao.visible = true;
				}
				else {
					this.box_menuMain.visible = true;
					this.ui_cuxiao.visible = false
				}
			})
			// 菜单抽奖
			this.btn_choujiang.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_choujiang.selected = !this.btn_choujiang.selected;
				if (this.btn_choujiang.selected) {
					this.box_menuMain.visible = false;
					this.ui_choujiang.visible = true;
				}
				else {
					this.box_menuMain.visible = true;
					this.ui_choujiang.visible = false
				}
			})
			// 菜单商城
			this.btn_mall.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_mall.selected = !this.btn_mall.selected;
				if (this.btn_mall.selected) {
					this.box_menuMain.visible = false;
					this.ui_mall.visible = true;
				}
				else {
					this.box_menuMain.visible = true;
					this.ui_mall.visible = false
				}
			})
			// 菜单福利
			this.btn_fuli.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_fuli.selected = !this.btn_fuli.selected;
				if (this.btn_fuli.selected) {
					this.box_menuMain.visible = false;
					this.ui_fuli.visible = true;
				}
				else {
					this.box_menuMain.visible = true;
					this.ui_fuli.visible = false
				}
			})
			// 菜单玩法攻略
			this.btn_menuGonglve.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_menuGonglve.selected = !this.btn_menuGonglve.selected;
				if (this.btn_menuGonglve.selected) {
					this.box_menuMain.visible = false;
					this.ui_gonglve.visible = true;
				}
				else {
					this.box_menuMain.visible = true;
					this.ui_gonglve.visible = false
				}
			})
		}
	}
}
