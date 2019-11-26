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
			for (let key of keys) {
				//活动名称不为零&&活动状态为1时显示
				if (this.data.General[key].name != undefined && this.data.General[key].state == 1) {
					name.push(this.data.General[key].name);
					let box = new Laya.Box();
					box.top = box.bottom = box.right = box.left = 0;
					this.view_newServer.addItem(box);
				}
			}
			this.tab_top.labels = '' + name;
			this.init_addBox();
		}
		public init_addBox(): void {
			this.box_time.visible = false
			let index = this.tab_top.selectedIndex;
			let ids = index + 1;
			this.box_newServer.removeChildren();
			let id = this.data.General[ids].id;
			if (this.data.General[ids].state == 1) {
				if (this.data != null) {
					switch (id) {
						case 10:
							this.box_newServer.addChild(new view.newServer.NewServer_sportsItem())
							break;
						case 2:
							this.box_newServer.addChild(new view.newServer.NewServer_allBossItem())
							break;
						case 3:
							this.box_newServer.addChild(new view.newServer.NewServer_DragonItem())
							break;
					}
				}
			}
		}
		public init_time(time: string): void {
			this.box_time.visible = true;
			this.lbl_time.text = time;
		}
	}
}