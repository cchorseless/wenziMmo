/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_InfoItem extends ui.hero.Hero_InfoItemUI {
		constructor() {
			super();
			this.setData();
		}
		private num;
		private proto;
		public setData(): void {
			this.addEvent();
			this.haveDizi();
		}
		public addEvent(): void {
			//激活弟子
			this.btn_jihuo1.on(Laya.UIEvent.CLICK, this, () => {
				if (this.num == 1) {
					//激活弟子1
					this.proto = ProtoCmd.Hero_firstGenHero;
					this.init_JiHuo();
				}
				else {
					//激活弟子2|3
					this.proto = ProtoCmd.Hero_HeroJiHuo2and3;
					this.init_JiHuo();
				}

			})
		}
		/**
		 * 弟子基本信息
		 */
		public baseInfo(i): void {
			GameApp.LListener.on(ProtoCmd.Hero_HeroBaseInfo, this, (jsonData: ProtoCmd.itf_Hero_BaseInfo) => {
				let j = i + 1;
				this.num = j
				if (jsonData[j].STATE == 0) {
					this.btn_jihuo1.gray = true;
					this.viw_dizi.selectedIndex = 0;
				}
				if (jsonData[j].STATE == 1) {
					this.btn_jihuo1.label = '可激活';

					this.viw_dizi.selectedIndex = 0;
				}
				if (jsonData[j].STATE == 2) {
					this.viw_dizi.selectedIndex = 1;
				}
			})
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.Hero_HeroBaseInfo, this);
			super.destroy(isbool);
		}
		//弟子基本信息发协议
		public haveDizi(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_HeroBaseInfo)
			lcp.send(pkt);
		}
		//激活第一个弟子
		public init_JiHuo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(this.proto, [this.num], null, this, (jsonData) => {
			})
			lcp.send(pkt);

		}
	}

}