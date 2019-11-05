/**Created by the LayaAirIDE*/
module view.activity {
	export class ActivityPanel extends ui.activity.ActivityPanelUI {
		constructor() {
			super();
		}
		public setData(data: ProtoCmd.itf_ACT_JingCaiSendShow) {
			this.panel_tab.hScrollBarSkin = "";
			this.hbox_tab['sortItem'] = (items) => { };
			for (let i in data) {
				let o = new Active_list_tabItem();
				let index = parseInt(i) - 1;
				data[i].index = index;
				o.setData(data[i]);
				this.hbox_tab.addChild(o);
				// 添加view_stack
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.viewS_main.addItem(box);
			}
			this.addEvent();
			// 第一个活动
			this.onChooseTabItem(data[1]);
		}

		/**
		 * 切换界面
		 * @param item 
		 */
		public onChooseTabItem(item: ProtoCmd.itf_ACT_JingCaiSendShow) {
			this.changeTabState(item.index);
			this.getActiveInfoData(item);
		}


		/**
		 * 改变tab状态
		 * @param index 
		 */
		private changeTabState(index) {
			for (let i = 0; i < this.hbox_tab.numChildren; i++) {
				let p: any = this.hbox_tab.getChildAt(i);
				p.btn_icon.selected = (index == i);
			}
		}

		public getActiveInfoData(item: ProtoCmd.itf_ACT_JingCaiSendShow) {
			let box = this.viewS_main.getChildAt(item.index);
			let pcmdString = ProtoCmd["Active" + item.id];
			// 需要拉界面
			if (box.numChildren == 0) {
				switch (item.id) {
					case 4: case 7:      //消费、充值排行
						GameApp.LListener.on(pcmdString, this, function (data) {
							box.removeChildren()
							let o = new Active_RankPanel_Item()
							o.setData(data, item.id)
							box.addChild(o);
						})
						let pkt4 = new ProtoCmd.QuestClientData().setString(pcmdString, null)
						lcp.send(pkt4);
						break;
					/**
					  * 12 装备箱合成  16 每日领取 18 消费豪礼 19 全民官印  32 积分兑换
					  * 5 限时抢购  14 兑换豪礼   36每周基金  17每日领取  13连续充值  1每日必买
					  */
					case 1: case 5: case 12: case 13: case 14: case 16: case 17: case 18:
					case 19: case 32: case 36: case 10: case 35: case 3:
						GameApp.LListener.on(pcmdString, this, (data) => {
							box.removeChildren()
							let o = new Active_Panel_Item()
							o.setData(data, item.id)
							box.addChild(o);
						})
						let pkt12 = new ProtoCmd.QuestClientData().setString(pcmdString, null)
						lcp.send(pkt12);
						break;
					case 33:   //每日特惠
						GameApp.LListener.on(pcmdString, this, (data) => {
							box.removeChildren()
							let o = new Active_EveryDayRecharge_Item()
							o.setData(data)
							box.addChild(o);
						})
						let pkt33 = new ProtoCmd.QuestClientData().setString(pcmdString, null)
						lcp.send(pkt33);
						break;
					case 39:   //单日充值
						GameApp.LListener.on(pcmdString, this, (data) => {
							box.removeChildren()
							let o = new Active_OneDayRecharge()
							o.setData(data)
							box.addChild(o);
						})
						let pkt39 = new ProtoCmd.QuestClientData().setString(pcmdString, null)
						lcp.send(pkt39);
						break;
					case 9://神秘商店
						GameApp.LListener.on(pcmdString, this, (data) => {
							box.removeChildren()
							let o = new Active_Mysteryshop()
							o.setData(data)
							box.addChild(o);
						})
						let pkt9 = new ProtoCmd.QuestClientData().setString(pcmdString, null)
						lcp.send(pkt9);
						break;
					case 24://资源线豪礼  即：龙魂排行
						GameApp.LListener.on(pcmdString, this, (data) => {
							box.removeChildren()
							let o = new Active_DragonSoul()
							o.setData(data)
							box.addChild(o);
						})
						let pkt24 = new ProtoCmd.QuestClientData().setString(pcmdString, null)
						lcp.send(pkt24);
						break;
					case 34://福袋抽奖
						box.removeChildren()
						let o = new Active_LuckBagDraw()
						box.addChild(o);
						break;
					case 2://限时礼包
						GameApp.LListener.on(ProtoCmd.Active100, this, (data) => {
							box.removeChildren()
							let o = new Active_Panel_Item()
							o.setData(data, 100)
							box.addChild(o);
						})
						let pkt100 = new ProtoCmd.QuestClientData().setString(ProtoCmd.Active100, null)
						lcp.send(pkt100);
						break;
				}
			}
			this.viewS_main.selectedIndex = item.index;
		}
		public addEvent() {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, function () {
				PopUpManager.checkPanel(this);
			})
		}
		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.Active1, this)
			GameApp.LListener.offCaller(ProtoCmd.Active4, this)
			GameApp.LListener.offCaller(ProtoCmd.Active5, this)
			GameApp.LListener.offCaller(ProtoCmd.Active7, this)
			GameApp.LListener.offCaller(ProtoCmd.Active9, this)
			GameApp.LListener.offCaller(ProtoCmd.Active12, this)
			GameApp.LListener.offCaller(ProtoCmd.Active13, this)
			GameApp.LListener.offCaller(ProtoCmd.Active14, this)
			GameApp.LListener.offCaller(ProtoCmd.Active16, this)
			GameApp.LListener.offCaller(ProtoCmd.Active17, this)
			GameApp.LListener.offCaller(ProtoCmd.Active18, this)
			GameApp.LListener.offCaller(ProtoCmd.Active19, this)
			GameApp.LListener.offCaller(ProtoCmd.Active24, this)
			GameApp.LListener.offCaller(ProtoCmd.Active32, this)
			GameApp.LListener.offCaller(ProtoCmd.Active33, this)
			GameApp.LListener.offCaller(ProtoCmd.Active34, this)
			GameApp.LListener.offCaller(ProtoCmd.Active36, this)
			GameApp.LListener.offCaller(ProtoCmd.Active39, this)


			GameApp.LListener.offCaller(ProtoCmd.Active100, this)

			// GameApp.LListener.offCaller(ProtoCmd.SendExItemPlane, this)    //额外奖励面板

			Laya.timer.clearAll(this)
			PopUpManager.Dispose(this)
		}
	}
}