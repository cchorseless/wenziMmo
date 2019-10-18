/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_WuXueItem extends ui.hero.Hero_WuXueItemUI {
		constructor() {
			super();
			this.setData();
		}
		public client_func_index = 56;
		public setData(): void {
			this.activation();
			this.addEvent();
		}
		public addEvent(): void {
			//开启
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				GameUtil.setServerData(this.client_func_index);
				this.activation();
			})
			//一键激活
			this.btn_allActivation.on(Laya.UIEvent.CLICK, this, () => {
				this.init_activation();
			})
			//兑换真气
			this.btn_exchange.on(Laya.UIEvent.CLICK, this, () => {
				this.sendExchangeData();
			})
			//获取真气球
			this.btn_gas.on(Laya.UIEvent.CLICK, this, () => {
				this.init_getRealGasBallData();
			})
		}
		public activation(): void {
			//判断是否激活
			if (GameUtil.getServerData(this.client_func_index)) {
				this.viw_zhaoshi.selectedIndex = 1;
				this.init_wuxuePanel();
				this.sendJingMaiData();
				this.init_getRealGasData();

			}
			else {
				this.viw_zhaoshi.selectedIndex = 0;
			}
		}
		public init_wuxuePanel(): void {
			let pkt = new ProtoCmd.QuestClientData();
			GameApp.LListener.on(ProtoCmd.Hero_heroJingMaiPanel, this, (jsonData: ProtoCmd.itf_Hero_WuXueInfo) => {
				console.log('===========>武学招式招式', jsonData)
				this.lbl_gas.text = '消耗真气：' + jsonData.realGas + '/' + jsonData.gas;
				this.lbl_gold.text = '消耗金币：' + jsonData.gold;
				let line = jsonData.jingMaiLvl - 1;
				//穴位点亮
				for (let i = 0; i < jsonData.jingMaiLvl; i++) {
					let g = i + 1
					this['btn_xuewei' + g].selected = true;
				}
				//穴位连接线点亮
				for (let i = 0; i < line; i++) {
					let g = i + 1;
					if (jsonData.jingMaiLvl >= 2) {
						this['btn_xueweiLine' + g].selected = true;
					}
				}
			})

		}
		public destroy(bool): void {
			GameApp.LListener.offCaller(ProtoCmd.Hero_heroJingMaiPanel, this);
			super.destroy(bool);
		}
		/**
		 * 发拉取武学招式面板协议
		 */
		public sendJingMaiData(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_heroJingMaiPanel)
			lcp.send(pkt);
		}
		/**
		 * 发兑换真气协议
		 */
		public sendExchangeData(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_exchangeRealGas)
			lcp.send(pkt);
		}
		public init_activation(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_activeJingMai)
			lcp.send(pkt);
		}
		/**
		 * 获取真气面板
		 */
		public init_getRealGasData(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_getHeroRealGasPanel, null, null, this, (jsonData) => {
				console.log('====>真气真气', jsonData)
			})
			lcp.send(pkt);
		}
		/**
		 * 获取真气球
		 */
		public init_getRealGasBallData(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_exchangeRealGasByFakeGas, null, null, this, (jsonData) => {
				console.log('====>真气真气球', jsonData)
			})
			lcp.send(pkt);
		}
	}
}