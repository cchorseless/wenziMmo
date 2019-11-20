/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_MainPanel extends ui.luckDraw.LuckDraw_MainPanelUI {
		constructor() {
			super();
		}
		public data = null;
		public setData(): void {
			this.panel_top.hScrollBarSkin = '';
			this.tab_top.labels = '';
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.init_luckDrawPanel(index);
			}, null, false);
			this.addEvent();
			this.init_getData();
		}
		public addEvent(): void {
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
				this.box_LuckBagDraw.removeChildren()
				let i = index + 1;
				switch (this.data[i].id) {
					case 0:
						this.box_LuckBagDraw.addChild(new view.luckDraw.LuckDraw_CangBaoItem());
						break;
					case 8:
						this.box_LuckBagDraw.addChild(new view.luckDraw.LuckDraw_TurntableItem());
						break;
					case 15:
						this.box_LuckBagDraw.addChild(new view.luckDraw.LuckDraw_LuckDrawItem());
						break;
					case 31:
						this.box_LuckBagDraw.addChild(new view.luckDraw.LuckDraw_OnLineDrawItem());
						break;
					case 34:
						this.box_LuckBagDraw.addChild(new view.activity.Active_LuckBagDraw());
						break;
				}
			}
		}
	}
}