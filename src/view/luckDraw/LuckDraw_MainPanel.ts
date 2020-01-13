/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_MainPanel extends ui.luckDraw.LuckDraw_MainPanelUI {
		public static self: LuckDraw_MainPanel;
		/**
		 * 动态福利ID
		 */
		public activityState = [
			EnumData.activityType.FLZP_Plane,
			EnumData.activityType.FuDaiOpen,
			EnumData.activityType.ZXCJ_Plane,
			EnumData.activityType.LuckyDrawOpen,
		]
		public tabLabels = ["藏宝阁"]
		public curdata = [];//实际上存在的动态福利
		constructor() {
			super();
			LuckDraw_MainPanel.self = this;
		}
		public data = null;
		public setData(): void {
			this.panel_top.hScrollBarSkin = '';
			this.tab_top.labels = '';

			this.addEvent();
			this.init_getData();
		}
		public addEvent(): void {
			//返回菜单界面
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(PanelManage.LuckDraw, true);
			})
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.init_luckDrawPanel(index);
			}, null, false);
		}
		public upDataCangBaoMap() {
			this.lab_mapNum.text = '' + GameUtil.findItemInBag(353, GameApp.GameEngine.bagItemDB);
		}
		public init_getData(): void {
			for (let i = 0; i < this.activityState.length; i++) {
				for (let o in GameApp.GameEngine.activityStatus) {
					if (GameApp.GameEngine.activityStatus[o].id == this.activityState[i]) {
						this.curdata.push(GameApp.GameEngine.activityStatus[o])
					}
				}
			}
			if (this.curdata.length > 0) {
				for (let i = 0; i < this.curdata.length; i++) {
					this.tabLabels.push(this.curdata[i].name)
				}
			}
			for (let i = 0; i < this.tabLabels.length; i++) {
				let box = new Laya.Box();
				box.top = box.bottom = box.right = box.left = 0;
				this.viw_luck.addItem(box);
			}
			let labels: string;
			labels = this.tabLabels.join(',')
			this.tab_top.labels = labels;
			this.init_luckDrawPanel(0);
		}
		/**
		 * 
		 * @param index 抽奖索引
		 */
		public init_luckDrawPanel(index) {
			let box = this.viw_luck.getChildAt(index)
			let ui_item;
			if (box.numChildren == 0) {
				if (index == 0) {
					LuckDraw_MainPanel.self.box_cangbao.visible = true;
					this.upDataCangBaoMap();
					ui_item = view.luckDraw.LuckDraw_CangBaoItem;
				} else {
					LuckDraw_MainPanel.self.box_cangbao.visible = false;
					let actid = this.curdata[index - 1].id;
					switch (actid) {
						case 15:
							LuckDraw_MainPanel.self.box_cangbao.visible = false;
							ui_item = view.luckDraw.LuckDraw_TurntableItem;
							break;
						case 201:
							LuckDraw_MainPanel.self.box_cangbao.visible = false;
							ui_item = view.luckDraw.LuckDraw_LuckDrawItem;
							break;
						case 34:
							LuckDraw_MainPanel.self.box_cangbao.visible = false;
							ui_item = view.activity.Active_LuckBagDraw;
							break;
						case 38:
							LuckDraw_MainPanel.self.box_cangbao.visible = false;
							ui_item = view.luckDraw.LuckDraw_OnLineDrawItem;
							break;
					}
				}
				box.addChild(new ui_item());
			}
			this.viw_luck.selectedIndex = index;
		}
	}
}