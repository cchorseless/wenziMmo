/**Created by the LayaAirIDE*/
module view.promotion {
	export class PromotionPanel extends ui.promotion.PromotionPanelUI {
		public static self: PromotionPanel;
		public tabNameArr = [];
		// EnumData.activityType.CZJJ_OpenPlane,
		
		/**
		 * 动态福利ID
		 */
		public activityState = [
			EnumData.activityType.chaozhiopen,
			EnumData.activityType.TeHuiIndex,
			EnumData.activityType.WorthGiftBagPanel,
			EnumData.activityType.LimitTimePanicBuyPanel,
			EnumData.activityType.MeiRiTeHuiPanel,
			EnumData.activityType.EverydayBuyPanel,
			EnumData.activityType.LimitTimeGiftBagPanel,
			EnumData.activityType.QuanMingLiBaoOpen,
		]
		public data = [];//实际上存在的动态福利
		constructor() {
			super();
			PromotionPanel.self = this;

			this.panel_tab.hScrollBarSkin = "";
		}
		public setData() {
			this.hbox_tab['sortItem'] = (items) => { };

			for (let i = 0; i < this.activityState.length; i++) {
				for (let o in GameApp.GameEngine.activityStatus) {
					if (GameApp.GameEngine.activityStatus[o].id == this.activityState[i]) {
						this.data.push(GameApp.GameEngine.activityStatus[o])
					}
				}
			}
			if (this.data.length > 0) {
				for (let i = 0; i < this.data.length; i++) {
					this.tabNameArr.push(this.data[i].name)
					let box = new Laya.Box();
					box.top = box.bottom = box.right = box.left = 0;
					this.View_S.addItem(box);
				}
			}
			let labels: string;
			labels = this.tabNameArr.join(',')
			this.hbox_tab.labels = labels;

			// this.View_S.selectedIndex = 0;
			this.getActiveInfoData(0);
			this.addEvent();
		}

		public addEvent() {
			this.hbox_tab.selectHandler = Laya.Handler.create(this, (index) => {
				// this.viw_fuli.selectedIndex = index;
				this.getActiveInfoData(index);
			}, null, false);
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
		}

		public getActiveInfoData(id) {
			let box = this.View_S.getChildAt(id);
			let actID = this.data[id].id
			if (box.numChildren == 0) {
				switch (actID) {
					case 202:
						GameApp.LListener.on(ProtoCmd.chaozhiopen, this, (data) => {
							box.removeChildren();
							let o = new Promotion_WorthGift_Item()
							o.setData(data)
							box.addChild(o);
						})
						let pkt202 = new ProtoCmd.QuestClientData().setString(ProtoCmd.chaozhiopen, null)
						lcp.send(pkt202);
						break;
					case 203:
						GameApp.LListener.on(ProtoCmd.TeHuiIndex, this, (data) => {
							box.removeChildren();
							let o = new Promotion_SpecialGift()
							o.setData(data, 1)
							box.addChild(o);
						})
						let pkt203 = new ProtoCmd.QuestClientData().setString(ProtoCmd.TeHuiIndex, null)
						lcp.send(pkt203);
						break;
					case 204:
						GameApp.LListener.on(ProtoCmd.WorthGiftBagPanel, this, (data) => {
							box.removeChildren();
							let o = new Promotion_SpecialGift()
							o.setData(data, 2)
							box.addChild(o);
						})
						let pkt204 = new ProtoCmd.QuestClientData().setString(ProtoCmd.WorthGiftBagPanel, null)
						lcp.send(pkt204);
						break;
					case 33://每日特惠
					let pcmdString = ProtoCmd["Active" + actID];
						GameApp.LListener.on(pcmdString, this, (data) => {
							box.removeChildren()
							let o = new activity.Active_EveryDayRecharge_Item()
							o.setData(data)
							box.addChild(o);
						})
						let pkt33 = new ProtoCmd.QuestClientData().setString(pcmdString, null)
						lcp.send(pkt33);
						break;
					case 100://限时礼包
					let pcmdString1 = ProtoCmd["Active" + actID];
						GameApp.LListener.on(pcmdString1, this, (data) => {
							box.removeChildren()
							let o = new activity.Active_Panel_Item()
							o.setData(data, 100)
							box.addChild(o);
						})
						let pkt100 = new ProtoCmd.QuestClientData().setString(pcmdString1, null)
						lcp.send(pkt100);
						break;
					case 1: case 5: case 35:
					let pcmdString2 = ProtoCmd["Active" + actID];
						GameApp.LListener.on(pcmdString2, this, (data) => {
							box.removeChildren()
							let o = new activity.Active_Panel_Item()
							o.setData(data, actID)
							box.addChild(o);
						})
						let pkt12 = new ProtoCmd.QuestClientData().setString(pcmdString2, null)
						lcp.send(pkt12);
						break;
				}
			}
			this.View_S.selectedIndex = id;
		}
		public Dispose() {
			GameApp.LListener.offCaller(ProtoCmd.chaozhiopen, this)
			GameApp.LListener.offCaller(ProtoCmd.TeHuiIndex, this)
			GameApp.LListener.offCaller(ProtoCmd.WorthGiftBagPanel, this)
			GameApp.LListener.offCaller(ProtoCmd.Active33, this)
			GameApp.LListener.offCaller(ProtoCmd.Active35, this)
			GameApp.LListener.offCaller(ProtoCmd.Active1, this)
			GameApp.LListener.offCaller(ProtoCmd.Active5, this)
			GameApp.LListener.offCaller(ProtoCmd.Active100, this)

			Laya.timer.clearAll(this)
			PopUpManager.Dispose(this)
		}

	}
}