/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_InfoItem extends ui.hero.Hero_InfoItemUI {
		constructor() {
			super();
			this.setData();
		}
		private num;
		private proto;
		public job;
		public setData(): void {
			this.addEvent();

		}
		public addEvent(): void {
			//激活弟子
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
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
			//符文套装
			this.btn_rune.on(Laya.UIEvent.CLICK, this, () => {
				new view.hero.Hero_RuneDialog().setData(this.job).popup(true);
			})
		}
		/**
		 * 弟子基本信息
		 */
		public baseInfo(i): void {
			let info=GameApp.GameEngine.HeroInfo;
		
				let j = i + 1;
				this.job=info[j].JOB;
				this.num = j
				if (info[j].STATE == 0) {
					this.btn_jihuo.gray = true;
					this.viw_dizi.selectedIndex = 0;
				}

				if (info[j].STATE == 1) {
					this.btn_jihuo.label = '可激活';

					this.viw_dizi.selectedIndex = 0;
				}
				if (info[j].STATE == 2) {
					this.viw_dizi.selectedIndex = 1;
				}
			
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