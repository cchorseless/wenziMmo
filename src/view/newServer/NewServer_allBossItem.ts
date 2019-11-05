/**Created by the LayaAirIDE*/
module view.newServer {
	export class NewServer_allBossItem extends ui.newServer.NewServer_allBossItemUI {
		constructor() {
			super();
			this.setData();
		}
		public num = 1;
		public data = null;
		public setData(): void {
			this.panel_boss.hScrollBarSkin = '';
			this.hbox_boss['sortItem'] = (items) => { };
			this.addEvent();
			this.init_panel();
		}

		public addEvent(): void {
			//前一页
			this.btn_last.on(Laya.UIEvent.CLICK, this, () => {
				this.num = this.num - 1;
				if (this.num !== 0) {
					this.init_clickEvent();
				}
			})
			//后一页
			this.btn_next.on(Laya.UIEvent.CLICK, this, () => {
				this.num = this.num + 1;
				if (this.num !== 5) {
					this.init_clickEvent();
				}
			})
			this.addLcpEvent();
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.NS_QuanMingBoss, this, (jsonData: ProtoCmd.itf_NS_AllBossInfo) => {
				console.log('======》全民boss', jsonData);
				this.data = jsonData;
				this.init_clickEvent();
			})

		}
		/**
		 * 全民BOSS面板
		 */
		public init_panel(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.NS_QuanMingBoss);
			lcp.send(pkt);
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.NS_QuanMingBoss, this);
			super.destroy(isbool);
		}
		/**
		 *  领取奖励
		 * 
		 */
		public init_get(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.NS_TeHuiClientOpen)
			lcp.send(pkt)
		}
		/**
		 * 拉取boss数据
		 */
		public init_clickEvent(): void {
			if (this.data !== null) {
				this.lbl_type.text = this.data[this.num].name;
				let keys = Object.keys(this.data[this.num].boss)
				this.hbox_boss.removeChildren();
				for (let key of keys) {
					let id = this.data[this.num].boss[key].bossid
					this.hbox_boss.addChild(new view.compart.NpcIconItem())
				}
			}
		}
	}
}