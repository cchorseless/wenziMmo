/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_MainPanel extends ui.luckDraw.LuckDraw_MainPanelUI {
		public static self: LuckDraw_MainPanel;
		constructor() {
			super();
			LuckDraw_MainPanel.self = this;
		}
		public data = null;
		public setData(): void {
			this.panel_top.hScrollBarSkin = '';
			this.tab_top.labels = '';
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_luck.selectedIndex = index;
				this.init_luckDrawPanel(index);
			}, null, false);
			this.addEvent();
			this.init_getData();
		}
		public addEvent(): void {
		}
		public upDataCangBaoMap() {
			this.lab_mapNum.text = '' + GameUtil.findItemInBag(353, GameApp.GameEngine.bagItemDB);
		}
		public init_getData(): void {

			let pkt = new ProtoCmd.QuestClientData();
			//获取页签
			pkt.setString(ProtoCmd.LD_chouJiangPanel, null, null, this, (jsonData: ProtoCmd.itf_LD_Info) => {
				this.data = jsonData;
				let keys = Object.keys(jsonData)
				let luckDrawData = [];
				for (let key of keys) {
					let data = jsonData[key];
					luckDrawData.push(data.name)
					let box = new Laya.Box();
					let i = parseInt(key) - 1;
					box.name = 'item' + i;
					box.top = box.bottom = box.right = box.left = 0;
					this.viw_luck.addItem(box);
				}
				this.tab_top.labels = '' + luckDrawData;
				let index = 0;
				this.init_luckDrawPanel(index);
			})
			lcp.send(pkt);
		}
		/**
		 * 
		 * @param index 抽奖索引
		 */
		public init_luckDrawPanel(index) {
			if (this.data !== null) {
				let ui_item;
				let i = index + 1;
				switch (this.data[i].id) {
					case 0:
						LuckDraw_MainPanel.self.box_cangbao.visible = true;
						this.upDataCangBaoMap();
						ui_item = view.luckDraw.LuckDraw_CangBaoItem;
						break;
					case 15:
						LuckDraw_MainPanel.self.box_cangbao.visible = false;
						ui_item = view.luckDraw.LuckDraw_TurntableItem;
						break;
					case 31:
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
				for (let single of this.viw_luck._childs) {
					let name = single.name.split('item')[1];
					if (name == index && single._childs.length == 0) {
						single.addChild(new ui_item());
					}
				}

			}
		}
	}
}