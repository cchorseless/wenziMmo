/**Created by the LayaAirIDE*/
module view.fuli {
	export class FuLi_MainPanel extends ui.fuli.FuLi_MainPanelUI {
		/**
		 * 动态福利ID
		 */
		public activityState = [
			EnumData.activityType.ComposeEquipPanel,
			EnumData.activityType.ExchangeGiftPanel,
			EnumData.activityType.MRLQ_Plane,
			EnumData.activityType.ExchangePointPanel,
		]
		public tabLabels = ["邀请有礼", "在线奖励", "资源找回"]
		public data = [];//实际上存在的动态福利
		constructor() {
			super();
		}
		public setData(): void {
			for (let i = 0; i < this.activityState.length; i++) {
				for (let o in GameApp.GameEngine.activityStatus) {
					if (GameApp.GameEngine.activityStatus[o].id == this.activityState[i]) {
						this.data.push(GameApp.GameEngine.activityStatus[o])
					}
				}
			}
			if (this.data.length > 0) {
				for (let i = 0; i < this.data.length; i++) {
					this.tabLabels.push(this.data[i].name)
					let box = new Laya.Box();
					box.top = box.bottom = box.right = box.left = 0;
					this.viw_fuli.addItem(box);
				}
			}
			let labels: string;
			labels = this.tabLabels.join(',')
			this.tab_fuli.labels = labels;
			this.addEvent();
			this.init_view(0);
		}
		public addEvent(): void {
			this.btn_return.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
			this.tab_fuli.selectHandler = Laya.Handler.create(this, (index) => {
				// this.viw_fuli.selectedIndex = index;
				this.init_view(index);
			}, null, false);
		}
		public Dispose() {
			GameApp.LListener.offCaller(ProtoCmd.Active32, this)
			GameApp.LListener.offCaller(ProtoCmd.Active12, this)
			GameApp.LListener.offCaller(ProtoCmd.Active14, this)
			GameApp.LListener.offCaller(ProtoCmd.Active17, this)
			Laya.timer.clearAll(this)
			PopUpManager.Dispose(this)
		}
		public init_view(id): void {
			this.viw_fuli.selectedIndex = id;
			let box = this.viw_fuli.getChildAt(id);
			if (box.numChildren == 0) {
				let actID = this.data[id - 3].id;
				let pcmdString = ProtoCmd["Active" + actID];
				GameApp.LListener.on(pcmdString, this, (data) => {
					box.removeChildren()
					let o = new activity.Active_Panel_Item()
					o.setData(data, actID)
					box.addChild(o);
				})
				let pkt12 = new ProtoCmd.QuestClientData().setString(pcmdString, null)
				lcp.send(pkt12);
			}

		}
	}
}