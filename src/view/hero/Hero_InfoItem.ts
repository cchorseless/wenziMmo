/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_InfoItem extends ui.hero.Hero_InfoItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.addEvent();
			this.haveDizi();
		}
		public addEvent(): void {
			//激活弟子1
			this.btn_jihuo1.on(Laya.UIEvent.CLICK, this, () => {
				this.init_JiHuo();
			})
		}
		/**
		 * 弟子基本信息
		 */
		public baseInfo(i): void {
			GameApp.LListener.on(ProtoCmd.JS_HeroBaseInfo, this, (jsonData: ProtoCmd.itf_Hero_BaseInfo) => {
				let j = i + 1;
				console.log('====>有无弟子', jsonData, jsonData[j], jsonData[j].STATE)
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
		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.JS_shuxingxitong_minabandakai, this);
			PopUpManager.Dispose(this);
		}
		//弟子基本信息发协议
		public haveDizi(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_HeroBaseInfo)
			lcp.send(pkt);
		}
		//激活第一个弟子
		public init_JiHuo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_firstGenHero, null, null, this, (jsonData) => {
				console.log('====>弟子弟子激活', jsonData)
			})
			lcp.send(pkt);

		}
	}

}