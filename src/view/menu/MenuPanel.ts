/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuPanel extends ui.menu.MenuPanelUI {
		constructor() {
			super();
			this.panel_mission.vScrollBarSkin = '';
		}
		public setData(): void {
			this.panel_mission.vScrollBarSkin = '';
			this.vbox_down['sortItem'] = (items) => { };
			this.initUI();
			this.addEvent();
		}
		public initUI(): void {
			let getScaleY = PanelManage.getScaleY();
			this.box_bottom.scaleY = getScaleY;
		}

		public addEvent(): void {
			//返回
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
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
				let pkt = new ProtoCmd.QuestClientData();
				let data = 0;
				pkt.setString(ProtoCmd.Menu_JingCaiClientOpen, null, null, this, (jsonData) => {
					data = jsonData;
					if (data !== 0) {
						new view.menu.MenuGuessDialog().popup(true);
					}
				});
				lcp.send(pkt);
				if (data == 0) {
					TipsManage.showTips('活动未开启')
				}
			})
			//新服活动
			this.img_xinfuActive.on(Laya.UIEvent.CLICK, this, () => {
				this.init_newServerOpen();
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
			//玩法攻略
			this.btn_menuGonglve.on(Laya.UIEvent.CLICK, this, function () {
				new view.menu.Menu_PlayWayDialog().popup();
			})

			this.btn_cuxiao.on(Laya.UIEvent.CLICK, this, function () {
				PanelManage.openPromotionPanel();
			})
			EventManage.onWithEffect(this.btn_FirstCharge, Laya.UIEvent.CLICK, this, function () {
				let o = new view.menu.Menu_FirstChargeDialog();
				// o.setData(0);
				o.popup(true);
			})
			EventManage.onWithEffect(this.btn_totalLogin, Laya.UIEvent.CLICK, this, function () {
				let o = new view.menu.Menu_TotalLogin();
				// o.setData(0);
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
			//设置
			this.btn_setUp.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.SetUpDialog().popup(true);
			})
		}
		/**
		 * 判断新服活动是否开启事件
		 */
		public init_newServerOpen(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.NS_XinFuClientOpen, null, null, this, (jsonData) => {
				let keys = Object.keys(jsonData.General)
				let name = [];
				for (let key of keys) {
					//活动名称不为零&&活动状态为1时显示
					if (jsonData.General[key].name !== undefined && jsonData.General[key].state == 1) {
						name.push(jsonData.General[key].name)
					}
				}
				if (name.length == 0) {
					TipsManage.showTips('新服活动未开启');
				} else {
					//打开新服活动界面
					PanelManage.openNewServer_MainPanel(jsonData);
				}
			})
			lcp.send(pkt);
		}
	}
}
