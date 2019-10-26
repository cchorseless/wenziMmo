/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_MainPanel extends ui.luckDraw.LuckDraw_MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_top.hScrollBarSkin = '';
			this.hbox_top['sortItem'] = (items) => { };
			this.addEvent();
			this.init_getData();
			this.box_item.addChild(new view.luckDraw.LuckDraw_CangBaoItem())
		}
		public addEvent(): void {
		}
		public init_getData(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_chouJiangPanel, null, null, this, (jsonData: ProtoCmd.itf_LD_Info) => {
				let keys = Object.keys(jsonData)
				this.hbox_top.removeChildren();
				for (let key of keys) {
					let data = jsonData[key];
					this.hbox_top.addChild(new view.luckDraw.LuckDraw_TitleBtnItem().setData(data))
				}
			})
			lcp.send(pkt);
		}
	}
}