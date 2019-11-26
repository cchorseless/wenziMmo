/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuPanel extends ui.menu.MenuPanelUI {
		public changeActID = 1;  //活动页ID
		//下面的动态活动
		public dynamicActivities = [
			EnumData.activityType.ExpRefineOpen,
			EnumData.activityType.JingCaiClientOpen,
		]
		public rechargeActivities = [
			EnumData.activityType.FirstChargeOpen,
			EnumData.activityType.MeiRiTeHuiPanel,
		]

		public dataDynamic = [];//实际上存在的动态活动    下面的三个动态
		public dataRecharge = [];//实际上存在的充值活动   充值ICon

		constructor() {
			super();
			this.panel_mission.vScrollBarSkin = '';
		}
		public setData(): void {
			this.panel_mission.vScrollBarSkin = '';
			// this.vbox_down['sortItem'] = (items) => { };
			this.initUI();
			this.addEvent();
			this.changeActivity();
			this.checkdynamicActivityState();
			this.rechargeActivitiesState();
		}
		public rechargeActivitiesState() {

			for (let i in GameApp.GameEngine.activityStatus) {
				if (GameApp.GameEngine.activityStatus[i].id == EnumData.activityType.FirstChargeOpen) {
					this.btn_FirstRecharge_Icon.skin = "image/activity/active_icon205.png";
					this.lab_FirstRecharge.text = "首充";
				} else {
					this.btn_FirstRecharge_Icon.skin = "image/activity/active_icon33.png";
					this.lab_FirstRecharge.text = "每日特惠";
				}
			}
		}
		public checkdynamicActivityState() {
			for (let i = 0; i < this.dynamicActivities.length; i++) {
				for (let o in GameApp.GameEngine.activityStatus) {
					if (GameApp.GameEngine.activityStatus[o].id == this.dynamicActivities[i]) {
						this.dataDynamic.push(GameApp.GameEngine.activityStatus[o])
					}
				}
			}
			for (let i = 1; i < 4; i++) {
				if (this.dataDynamic[i]) {
					this["btn_Activity" + i].visible = true;
					this["lab_Activty" + i].text = this.dataDynamic[i].name;
					this["btn_act_Icon" + i].skin = "image/menu/active_icon" + this.dataDynamic[i].id + ".png";
				} else {
					this["btn_Activity" + i].visible = false;
				}

			}
		}
		//8s一次活动页刷新
		public changeActivity() {
			let self = this;
			let curID = this.changeActID;
			Laya.timer.frameLoop(300, self, function () {
				if (self.changeActID < 5) {
					self.changeActID++
				} else {
					self.changeActID = 1
				}
				for (let i = 1; i < 6; i++) {
					self["img_Turn" + i].skin = "image/menu/img_common_28.png";
					let p = new Laya.Image();
					p.width = self.img_xinfuActive.width;
					p.height = self.img_xinfuActive.height;
					p.y = self.img_xinfuActive.y;
					p.x = self.img_xinfuActive.x + p.width;
					self.panel_changeAct.addChild(p)
					p.skin = "image/menu/img_xuanchuang_0" + self.changeActID + ".png"
					Laya.Tween.to(self.img_xinfuActive, { x: self.img_xinfuActive.width * (-1) }, 250);
					Laya.Tween.to(p, { x: 0 }, 250, null, Laya.Handler.create(this, () => {
						self.img_xinfuActive.skin = "image/menu/img_xuanchuang_0" + self.changeActID + ".png"
						self.img_xinfuActive.x = 0;
						self.panel_changeAct.removeChild(p);
					}))
					if (i == self.changeActID) {
						self["img_Turn" + i].skin = "image/menu/img_common_28down.png"
					}
				}
			});

		}
		public initUI(): void {
			let getScaleY = PanelManage.getScaleY();
			this.box_bottom.scaleY = getScaleY;
		}

		public addEvent(): void {

			// tubiaofasong
			GameApp.LListener.on(ProtoCmd.tubiaofasong, this, (data) => {
				console.log(data);
			})
			//返回
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
			this.btn_Activity1.on(Laya.UIEvent.CLICK, this, () => {
				if (this.dataDynamic[1].id == EnumData.activityType.ExpRefineOpen) {
					new view.menu.Menu_ExpRefine().popup(true);
				} else if (this.dataDynamic[1].id == EnumData.activityType.JingCaiClientOpen) {
					let pkt = new ProtoCmd.QuestClientData();
					let data = 0;
					pkt.setString(ProtoCmd.Menu_JingCaiClientOpen, null, null, this, (jsonData) => {
						data = jsonData;
						if (data != 0) {
							new view.menu.MenuGuessDialog().popup(true);
						}
					});
					lcp.send(pkt);
					if (data == 0) {
						TipsManage.showTips('活动未开启')
					}
				}

			})
			//竞猜
			this.btn_Activity2.on(Laya.UIEvent.CLICK, this, () => {
				if (this.dataDynamic[1].id == EnumData.activityType.ExpRefineOpen) {
					new view.menu.Menu_ExpRefine().popup(true);
				} else if (this.dataDynamic[1].id == EnumData.activityType.JingCaiClientOpen) {
					let pkt = new ProtoCmd.QuestClientData();
					let data = 0;
					pkt.setString(ProtoCmd.Menu_JingCaiClientOpen, null, null, this, (jsonData) => {
						data = jsonData;
						if (data != 0) {
							new view.menu.MenuGuessDialog().popup(true);
						}
					});
					lcp.send(pkt);
					if (data == 0) {
						TipsManage.showTips('活动未开启')
					}
				}
			})
			this.btn_EveryDayFirstRecharge.on(Laya.UIEvent.CLICK, this, () => {
				new view.menu.Menu_EveryDayRechargeDialog().popup(true);
			})


			//上面的轮换页活动
			this.img_xinfuActive.on(Laya.UIEvent.CLICK, this, () => {
				switch (this.changeActID) {
					case 1:
						this.init_newServerOpen();
						break;
					case 2: case 3: case 4: case 5:
						TipsManage.showTips("当前是轮换活动" + this.changeActID)
						break;

				}
			})

			// //图鉴
			// this.btn_menuTujian.on(Laya.UIEvent.CLICK, this, () => {
			// 	PanelManage.openTuJianJuesePanel();
			// })
			//签到
			this.btn_qiandao.on(Laya.UIEvent.CLICK, this, () => {
				new view.menu.MenuQiandaoDialog().popup(true);
			})
			//邮件
			this.btn_mail.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.MailDialog().popup(true);
			})
			// //排名
			// this.btn_menuPaiming.on(Laya.UIEvent.CLICK, this, () => {

			// })
			// //成就
			// this.btn_menuChengjiu.on(Laya.UIEvent.CLICK, this, () => {
			// 	new view.menu.MenuChengJiuDialog().popup(true);
			// })
			//祈福
			this.btn_Blessing.on(Laya.UIEvent.CLICK, this, () => {
				new view.menu.Menu_BlessingDialog().popup(true);
			})
			//膜拜城主
			this.btn_mobai.on(Laya.UIEvent.CLICK, this, () => {
				new view.menu.MenuMoBaiDialog().popup(true);
			})

			//新服活动
			// this.img_xinfuActive.on(Laya.UIEvent.CLICK, this, () => {
			// 	this.init_newServerOpen();
			// })
			//抽奖
			this.btn_luckDraw.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openLuckDrawPanel();
			})
			//活动
			this.btn_active.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openActivePanel();
			})
			this.btn_recharge.on(Laya.UIEvent.CLICK, this, function () {
				let o = new view.recharge_vip.Recharge_VipDialog();
				o.setData(0);
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
			// EventManage.onWithEffect(this.btn_totalLogin, Laya.UIEvent.CLICK, this, function () {
			// 	let o = new view.menu.Menu_TotalLogin();
			// 	// o.setData(0);
			// 	o.popup(true);
			// })
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
			this.btn_operatorRank.on(Laya.UIEvent.CLICK, this, function () {
				new view.menu.Menu_OperatorRankDialog().popup(true);
			})
			this.btn_monthCard.on(Laya.UIEvent.CLICK, this, function () {
				new view.menu.Menu_MonthCard().popup(true);
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
					if (jsonData.General[key].name != undefined && jsonData.General[key].state == 1) {
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
