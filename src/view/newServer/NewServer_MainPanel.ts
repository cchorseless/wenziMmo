/**Created by the LayaAirIDE*/
module view.newServer {
	export class NewServer_MainPanel extends ui.newServer.NewServer_MainPanelUI {
		/**
		 * 动态活动ID
		 */
		public activityState = [
			EnumData.activityType.KaiFuJingJiOpen,
			EnumData.activityType.QuanMingBoss,
			EnumData.activityType.LongChengClientOpen,
			EnumData.activityType.leijidenglu_minbandakai,
		]
		public tabNameArr = [];
		constructor() {
			super();
			this.addEvent();
		}
		public data = [];
		public setData() {
			this.panel_newServer.hScrollBarSkin = '';

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
					this.view_newServer.addItem(box);
				}
			}
			let labels: string;
			labels = this.tabNameArr.join(',')
			this.tab_top.labels = labels;
			this.init_addBox();
		}
		public addEvent(): void {
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.init_addBox();
			}, null, false);
		}
		public init_addBox(): void {
			this.box_time.visible = false
			let index = this.tab_top.selectedIndex;
			let box = this.view_newServer.getChildAt(index)
			let ui_newServer;
			if (box.numChildren == 0) {
				switch (this.data[index].id) {
					case EnumData.activityType.KaiFuJingJiOpen:
						ui_newServer = view.newServer.NewServer_sportsItem;
						break;
					case EnumData.activityType.QuanMingBoss:
						ui_newServer = view.newServer.NewServer_allBossItem;
						break;
					case EnumData.activityType.LongChengClientOpen:
						ui_newServer = view.newServer.NewServer_DragonItem;
						break;
					case EnumData.activityType.leijidenglu_minbandakai:
						ui_newServer = view.newServer.NewServer_TotalLoginItem;
						break;
					// case EnumData.activityType.leijidenglu_minbandakai:
					// 	break;
				}
				box.addChild(new ui_newServer());

			}
			this.view_newServer.selectedIndex = index;
		}
		public init_time(time: string): void {
			this.box_time.visible = true;
			this.lbl_time.text = time;
		}
	}
}