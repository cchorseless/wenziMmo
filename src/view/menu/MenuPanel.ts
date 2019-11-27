/**Created by the LayaAirIDE*/
module view.menu {
	export class MenuPanel extends ui.menu.MenuPanelUI {
		public changeActID = 1;  //活动页ID
		//滑动上面的活动图
		public touchBeginX = 0;
		public touchEndX = 0;
		public maxTurnNum = 0;
		public turnActArr1 = [EnumData.activityType.KaiFuJingJiOpen,
		EnumData.activityType.QuanMingBoss,
		EnumData.activityType.LongChengClientOpen,
		EnumData.activityType.leijidenglu_minbandakai,]
		public turnActArr3 = [
			EnumData.activityType.ResourceGiftPanel,
			EnumData.activityType.ResourceGiftIsShow2,
			EnumData.activityType.ResourceGiftIsShow3,
			EnumData.activityType.ResourceGiftIsShow4,
			EnumData.activityType.ResourceGiftIsShow5
		]
		public turnActArr4 = [EnumData.activityType.chaozhiopen]
		public curTurnAct = [];

		public isTouch = false;
		//下面的动态活动
		public dynamicActivities = [
			EnumData.activityType.ExpRefineOpen,
			EnumData.activityType.JingCaiClientOpen,
		]
		public rechargeActivities = [
			EnumData.activityType.FirstChargeOpen,
			EnumData.activityType.MeiRiTeHuiPanel,
		]
		public rechargeActivityID = false;
		public dataDynamic = [];//实际上存在的动态活动    下面的三个动态
		public dataRecharge = [];//实际上存在的充值活动   充值ICon

		constructor() {
			super();
			this.panel_mission.vScrollBarSkin = '';
		}
		public turnActMax() {
			this.curTurnAct = [];
			let data1 = [];
			let data3 = [];
			let data4 = [];

			for (let i = 0; i < this.turnActArr1.length; i++) {
				for (let o in GameApp.GameEngine.activityStatus) {
					if (GameApp.GameEngine.activityStatus[o].id == this.turnActArr1[i]) {
						data1.push(GameApp.GameEngine.activityStatus[o])
					}
				}
			}
			if (data1.length > 0) {
				if (this.curTurnAct.length == 0) {
					this.curTurnAct.push(1);
				} else {
					for (let i = 0; i < this.curTurnAct.length; i++) {
						if (this.curTurnAct[i] != 1) {
							this.curTurnAct.push(1);
							break;
						}
						else {
							break
						}
					}
				}

			}
			if (this.curTurnAct.length == 0) {
				this.curTurnAct.push(2);
			} else {
				for (let i = 0; i < this.curTurnAct.length; i++) {
					if (this.curTurnAct[i] != 2) {
						this.curTurnAct.push(2);
						break;
					}
					else {
						break
					}
				}
			}
			for (let i = 0; i < this.turnActArr3.length; i++) {
				if (GameApp.GameEngine.turnActivity.id == this.turnActArr3[i]) {
					data3.push(GameApp.GameEngine.turnActivity.id)
				}
			}
			if (data3.length > 0) {
				if (this.curTurnAct.length == 0) {
					this.curTurnAct.push(3);
				} else {
					for (let i = 0; i < this.curTurnAct.length; i++) {
						if (this.curTurnAct[i] == 3) {
							break;
						}
						else {
							this.curTurnAct.push(3);
							break;
						}
					}
				}
			}
			for (let i = 0; i < this.turnActArr4.length; i++) {
				for (let o in GameApp.GameEngine.activityStatus) {
					if (GameApp.GameEngine.activityStatus[o].id == this.turnActArr4[i]) {
						data4.push(GameApp.GameEngine.activityStatus[o])
						break;
					}
					else {
						break
					}
				}
			}
			if (data4.length > 0) {
				if (this.curTurnAct.length == 0) {
					this.curTurnAct.push(4);
				} else {
					for (let i = 0; i < this.curTurnAct.length; i++) {
						if (this.curTurnAct[i] != 4) {
							this.curTurnAct.push(4);
						} else {
							break
						}
					}
				}
			}
			this.maxTurnNum = this.curTurnAct.length
			for (let i = 1; i < 6; i++) {
				this["img_Turn" + i].visible = false;
				if (i <= this.maxTurnNum) {
					// img_Turn
					this["img_Turn" + i].visible = true;
				}
			}


		}
		public setData(): void {
			this.panel_mission.vScrollBarSkin = '';
			// this.vbox_down['sortItem'] = (items) => { };
			this.initUI();
			this.addEvent();
			this.turnActMax()
			this.changeActivity();
			this.checkdynamicActivityState();
			this.rechargeActivitiesState();
		}
		public rechargeActivitiesState() {
			for (let i = 0; i < this.rechargeActivities.length; i++) {
				for (let o in GameApp.GameEngine.activityStatus) {
					if (GameApp.GameEngine.activityStatus[o].id == this.rechargeActivities[i]) {
						this.dataRecharge.push(GameApp.GameEngine.activityStatus[o])
					}
				}
			}
			for (let i = 0; i < this.dataRecharge.length; i++) {
				if (this.dataRecharge[i].id == EnumData.activityType.FirstChargeOpen) {
					this.rechargeActivityID = true;
					this.btn_FirstRecharge_Icon.skin = "image/activity/active_icon205.png"
					this.lab_FirstRecharge.text = "首充";
				} else {
					if (this.rechargeActivityID) {
						return;
					}
					this.rechargeActivityID = false;
					this.btn_FirstRecharge_Icon.skin = "image/activity/active_icon33.png"
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
		//5s一次活动页刷新
		public changeActivity() {
			let self = this;
			let curID = this.changeActID;
			Laya.timer.frameLoop(300, self, function () {
				if (self.changeActID < this.maxTurnNum) {
					self.changeActID++
				} else {
					self.changeActID = 1
				}
				console.log("for循环的max" + (this.maxTurnNum + 1), "|||", this.maxTurnNum)
				for (let i = 1; i < (this.maxTurnNum + 1); i++) {
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
					this.isTouch = false;
					this.touchEndX = 0;
				}
			});


		}
		public initUI(): void {
			let getScaleY = PanelManage.getScaleY();
			this.box_bottom.scaleY = getScaleY;
		}

		public addEvent(): void {



			EventManage.onWithEffect(this.btn_FirstCharge, Laya.UIEvent.CLICK, this, function () {

				if (this.rechargeActivityID) {
					let o = new view.menu.Menu_FirstChargeDialog();
					o.popup(true);
				} else if (!this.rechargeActivityID) {

					let o = new view.menu.Menu_EveryDaySpecial();
					o.popup(true);

				}
			})
			// tubiaofasong
			GameApp.LListener.on(ProtoCmd.tubiaofasong, this, (data) => {
				console.log(data);
				GameApp.GameEngine.turnActivity = data;
				this.turnActMax()
			})
			//返回
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				GameApp.LListener.offCaller(ProtoCmd.tubiaofasong, this)
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
						if (data !== 0) {
							new view.menu.MenuGuessDialog().popup(true);
						}
					});
					lcp.send(pkt);
				}

			})
			//竞猜
			this.btn_Activity2.on(Laya.UIEvent.CLICK, this, () => {
				if (this.dataDynamic[2].id == EnumData.activityType.ExpRefineOpen) {
					new view.menu.Menu_ExpRefine().popup(true);
				} else if (this.dataDynamic[2].id == EnumData.activityType.JingCaiClientOpen) {
					let pkt = new ProtoCmd.QuestClientData();
					let data = 0;
					pkt.setString(ProtoCmd.Menu_JingCaiClientOpen, null, null, this, (jsonData) => {
						data = jsonData;
						if (data !== 0) {
							new view.menu.MenuGuessDialog().popup(true);
						}
					});
					lcp.send(pkt);
				}
			})
			this.btn_EveryDayFirstRecharge.on(Laya.UIEvent.CLICK, this, () => {
				new view.menu.Menu_EveryDayRechargeDialog().popup(true);
			})


			//上面的轮换页活动
			// this.img_xinfuActive.on(Laya.UIEvent.CLICK, this, () => {
			// 	if (this.isTouch) {
			// 		switch (this.changeActID) {
			// 			case 1:
			// 				this.init_newServerOpen();
			// 				break;
			// 			case 2: case 3: case 4: case 5:
			// 				TipsManage.showTips("当前是轮换活动" + this.changeActID)
			// 				break;
			// 		}
			// 	}
			// })


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
			this.img_xinfuActive.on(Laya.Event.MOUSE_DOWN, this, function (ev) {
				this.touchBeginX = this.getPosX(ev)
				this.isTouch = true;
			})

			this.img_xinfuActive.on(Laya.Event.MOUSE_UP, this, function (ev) {
				this.turnActTouchEnd(ev)
			})
			this.img_xinfuActive.on(Laya.Event.MOUSE_OUT, this, function (ev) {
				this.turnActTouchEnd(ev)
			})
		}
		public turnActTouchEnd(ev) {
			if (this.isTouch) {
				if (this.touchEndX == 0) {
					this.touchEndX = this.getPosX(ev)
					let span = this.touchBeginX - this.touchEndX
					if (span < -30) {
						this.nextOrLastActivity(false)
					} else if (span > 30) {
						this.nextOrLastActivity(true)
					} else {
						this.isTouch = false;
						this.touchEndX = 0;
						this.chooseTurnAct(this.changeActID)
					}
				}
			}
		}
		public getPosX(ev) {
			let x = ev.stageX;
			return x;
		}
		public nextOrLastActivity(state) {
			// state true是+  false 是-  
			let self = this;
			if (state) {
				if (self.changeActID < this.maxTurnNum) {
					self.changeActID++
				} else {
					self.changeActID = 1
				}
				for (let i = 1; i < this.maxTurnNum + 1; i++) {
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
			} else {
				if (self.changeActID > 1) {
					self.changeActID--
				} else {
					self.changeActID = this.maxTurnNum
				}
				for (let i = 1; i < this.maxTurnNum + 1; i++) {
					self["img_Turn" + i].skin = "image/menu/img_common_28.png";
					let p = new Laya.Image();
					p.width = self.img_xinfuActive.width;
					p.height = self.img_xinfuActive.height;
					p.y = self.img_xinfuActive.y;
					p.x = self.img_xinfuActive.x - p.width;
					self.panel_changeAct.addChild(p)
					p.skin = "image/menu/img_xuanchuang_0" + self.changeActID + ".png"
					Laya.Tween.to(self.img_xinfuActive, { x: self.img_xinfuActive.width * 1 }, 250);
					Laya.Tween.to(p, { x: 0 }, 250, null, Laya.Handler.create(this, () => {
						self.img_xinfuActive.skin = "image/menu/img_xuanchuang_0" + self.changeActID + ".png"
						self.img_xinfuActive.x = 0;
						self.panel_changeAct.removeChild(p);
					}))
					if (i == self.changeActID) {
						self["img_Turn" + i].skin = "image/menu/img_common_28down.png"
					}
				}
			}
			this.isTouch = false;
			this.touchEndX = 0;
		}

		/**
		 * 判断新服活动是否开启事件
		 */
		public init_newServerOpen(): void {
			PanelManage.openNewServer_MainPanel()
		}
		/**
		 * 选择轮播条后根据id打开界面
		 */
		public chooseTurnAct(id): void {
			// PanelManage.openNewServer_MainPanel()
			let curIndex = this.curTurnAct[id - 1];

			switch (curIndex) {
				case 1:
					PanelManage.openNewServer_MainPanel()
					break;
				case 2:
					//打开活动列表
					let p = new Menu_TurnActivity2();
					p.setData();
					p.popup(true);
					break;
				case 3:
					let data3 = [];
					for (let i = 0; i < this.turnActArr3.length; i++) {
						if (GameApp.GameEngine.turnActivity.id == this.turnActArr3[i]) {
							data3.push(GameApp.GameEngine.turnActivity.id)
						}
					}
					let o = new Menu_TurnActivity3();
					o.getData(data3[0]);
					o.popup(true);
					//打开其中一个豪礼界面
					break;
				case 4:
					//打开促销界面
					PanelManage.openPromotionPanel()
					break;
			}
		}
	}
}
