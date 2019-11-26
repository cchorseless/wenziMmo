/**Created by the LayaAirIDE*/
module view.newServer {
	export class NewServer_MainPanel extends ui.newServer.NewServer_MainPanelUI {
		/**
		 * 动态活动ID
		 */
		public activityState = [
			EnumData.activityType.KaiFuJingJiOpen,
		]
		constructor() {
			super();
		}
		public data = null;
		public newServerActive = null;
		public setData(data): NewServer_MainPanel {
			this.data = data;
			this.panel_newServer.hScrollBarSkin = '';
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.init_addBox();
			}, null, false);
			this.addEvent();
			this.init_newServer();
			return this;
		}
		public addEvent(): void {

		}
		public init_newServer(): void {
			let keys = Object.keys(this.data.General)
			let name = [];
			let dataArray = [];
			for (let key of keys) {
				//活动名称不为零&&活动状态为1时显示
				if (this.data.General[key].name != undefined && this.data.General[key].state == 1) {
					name.push(this.data.General[key].name);
					dataArray.push(this.data.General[key]);
					let box = new Laya.Box();
					box.top = box.bottom = box.right = box.left = 0;
					this.view_newServer.addItem(box);
				}
			}
			this.newServerActive = dataArray;
			this.tab_top.labels = '' + name;
			this.init_addBox();
		}
		public init_addBox(): void {
			this.box_time.visible = false
			let index = this.tab_top.selectedIndex;
			let box = this.view_newServer.getChildAt(index)
			let ui_newServer;
			if (box.numChildren == 0) {
				if (this.newServerActive != null) {
					switch (this.newServerActive[index].id) {
						case 10:
							ui_newServer = view.newServer.NewServer_sportsItem;
							break;
						case 2:
							ui_newServer = view.newServer.NewServer_allBossItem;
							break;
						case 3:
							ui_newServer = view.newServer.NewServer_DragonItem;
							break;
					}
					box.addChild(new ui_newServer());
				}
			}
			this.view_newServer.selectedIndex=index;
		}
		public init_time(time: string): void {
			this.box_time.visible = true;
			this.lbl_time.text = time;
		}
	}
}