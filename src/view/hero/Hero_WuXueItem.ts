/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_WuXueItem extends ui.hero.Hero_WuXueItemUI {
		constructor() {
			super();
			this.setData();
		}
		public client_func_index = 55;
		public setData(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_heroJingMaiPanel, null, null, this, (jsonData) => {
				console.log('===========>武学招式招式',jsonData)
			})
			lcp.send(pkt);
		}
			public addEvent(): void {
			//开启
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				GameUtil.setServerData(this.client_func_index);
				this.activation();
			})

		}
			public activation(): void {
			//判断是否激活
			if (GameUtil.getServerData(this.client_func_index)) {
				this.viw_zhaoshi.selectedIndex = 1;
				// this.addLcpEvent();
			}
			else {
				this.viw_zhaoshi.selectedIndex = 0;
			}
		}
	}
}