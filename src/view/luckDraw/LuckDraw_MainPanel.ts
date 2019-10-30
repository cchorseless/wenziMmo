/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_MainPanel extends ui.luckDraw.LuckDraw_MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_top.hScrollBarSkin = '';
			this.tab_top.labels='';
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_luckDraw.selectedIndex = index;
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
				let keys = Object.keys(jsonData)
				let luckDrawData=[];
				for (let key of keys) {
					let data = jsonData[key];
					luckDrawData.push(data.name)	
				}
				this.tab_top.labels=''+luckDrawData;
			})
			lcp.send(pkt);
		}

	}
}