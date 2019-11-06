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
				new view.menu.MenuQiandaoDialog().setData().popup(true);
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
			//膜拜城主
			this.btn_mobai.on(Laya.UIEvent.CLICK, this, () => {
				new view.menu.MenuMoBaiDialog().popup(true);
			})
			//竞猜
			this.btn_guess.on(Laya.UIEvent.CLICK, this, () => {
				new view.menu.MenuGuessDialog().popup(true);
			})
			//新服活动
			this.img_xinfuActive.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openNewServer_MainPanel();
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
				let o = new view.recharge_vip.Recharge_VipDialog();
				o.setData(1);
				o.popup(true);
			})
			this.btn_cuxiao.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openPromotionPanel();
			})
			EventManage.onWithEffect(this.btn_FirstCharge, Laya.UIEvent.CLICK, this, function () {
				let o = new view.menu.Menu_FirstChargeDialog();
				o.popup(true);

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
