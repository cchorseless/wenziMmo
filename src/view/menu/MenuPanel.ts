/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuPanel extends ui.menu.MenuPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.initUI();
			this.addEvent();
		}
		

		public initUI(): void {
			let getScaleY = PanelManage.getScaleY();
			this.img_bg.scaleY = getScaleY;
			this.box_bottom.scaleY = getScaleY;
		}

		public addEvent(): void {
			//图鉴
			this.btn_menuTujian.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTuJianJuesePanel();
			})
			//签到
			this.btn_qiandao.on(Laya.UIEvent.CLICK, this, () => {
				new view.menu.MenuQiandaoDialog().popup(true);
			})
			//邮件
			this.btn_mail.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MailDialog().popup(true);
			})
			//排名
			this.btn_menuPaiming.on(Laya.UIEvent.CLICK, this, () => {
				new view.menu.MenuPaiHangDialog().popup(true);
			})
			//成就
			this.btn_menuChengjiu.on(Laya.UIEvent.CLICK, this, () => {
				new view.menu.MenuChengJiuDialog().popup(true);
			})
			//祈福
			this.btn_Blessing.on(Laya.UIEvent.CLICK, this, () => {
				new view.menu.Menu_BlessingDialog().popup(true);
			})
			//抽奖
			this.btn_luckDraw.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openLuckDrawPanel();
			})
			//活动
			this.btn_active.on(Laya.UIEvent.CLICK, this, () => {
				let pkt32 = new ProtoCmd.QuestClientData().setString(ProtoCmd.JingCaiSendShow, null, 0, this, function (data) {
					PanelManage.openActivePanel(data);
				})
				lcp.send(pkt32);

			})
			this.btn_recharge.on(Laya.UIEvent.CLICK, this, function () {
				let o = new view.beiBao.Bag_Recharge();
				let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.cashPanel, null, 0, this, function (data) {
					let base = data;
					o.setData(data);
					o.popup(true);
				});
				lcp.send(pkt);

			})

			// 商城
			this.btn_mall.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openShopMallPanel();
			})
			// 福利
			this.btn_fuli.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuLiPanel();
			})
		}
	}
}
