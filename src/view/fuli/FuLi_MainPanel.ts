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
		constructor() {
			super();
			this.panel_tab.hScrollBarSkin = '';
		}
		public setData(): void {
			let data = [];
			for (let i = 0; i < this.activityState.length; i++) {
				for (let o in GameApp.GameEngine.activityStatus) {
					if (GameApp.GameEngine.activityStatus[o].id == this.activityState[i]) {
						data.push(GameApp.GameEngine.activityStatus[o])
					}
				}
			}
			if (data.length > 0) {
				for (let i = 0; i < data.length; i++) {
					this.tabLabels.push(data[i].name)
				}
			}
			let labels: string;
			labels = this.tabLabels.join(',')
			this.tab_fuli.labels = labels;

			for (let i = 0; i < data.length; i++) {
				let box = new Laya.Box();
				box.name = "item" + i + 3
				box.top = box.bottom = box.right = box.left = 0;
				this.viw_fuli.addItem(box);
			}

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
		public init_view(id): void {
			if(id != 1||id != 2){
				this.img_left.visible = this.img_right.visible = false;
			}else{
				this.img_left.visible = this.img_right.visible = true;
			}
			this.viw_fuli.selectedIndex = id;

		}
	}
}