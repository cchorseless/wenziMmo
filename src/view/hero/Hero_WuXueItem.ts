/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_WuXueItem extends ui.hero.Hero_WuXueItemUI {
		constructor() {
			super();
			this.setData();
		}
		public client_func_index = 53;
		//开启所需等级总数
		private sum;
		//玩家等级总数
		private mySum;
		public setData(): void {
			this.vbox_1['sortItem'] = (items) => { };
			this.vbox_2['sortItem'] = (items) => { };
			this.vbox_3['sortItem'] = (items) => { };
			this.activation();
			this.addEvent();
		}
		public addEvent(): void {
			if (this.mySum >= this.sum) {
				//开启
				this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
					GameUtil.setServerData(this.client_func_index);
					this.activation();
				})
			}
			else {
				this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
					TipsManage.showTips('您当前等级不足，暂时不能开启')
				});
			}
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
				this.notActivation();
			}
		}
		/**
			 * 未激活时
			 */
		public notActivation(): void {
			let id = this.client_func_index + 1000;
			let activationLvl = SheetConfig.Introduction_play.getInstance(null).LEVEL('' + id);
			let zsLvl = Math.floor(activationLvl / 1000);
			let lvl = activationLvl % 1000;
			this.lbl_detail.text = SheetConfig.Introduction_play.getInstance(null).CONTENT('' + id);
			this.lbl_condition.text = '' + SheetConfig.Introduction_play.getInstance(null).TEXT1('' + id)
			this.sum = zsLvl * 1000 + lvl;
			this.mySum = GameApp.MainPlayer.zslevel * 1000 + GameApp.MainPlayer.level;
		}
		public init_wuxuePanel(): void {
			let pkt = new ProtoCmd.QuestClientData();
			GameApp.LListener.on(ProtoCmd.Hero_heroJingMaiPanel, this, (jsonData: ProtoCmd.itf_Hero_WuXueInfo) => {
				//GameApp.GameEngine.heroJob为1战士
				let shuxing = GameUtil.parseEffectidToString('' + jsonData.effid)
				let attribute = shuxing.des;
				this.vbox_1.removeChildren();
				for (let i=0;i<3;i++) {
					this.vbox_1.addChild(new view.juese.Person_LableItem().setData(attribute[i]))
				}
				this.vbox_2.removeChildren();
				for (let i=3;i<7;i++) {
					this.vbox_2.addChild(new view.juese.Person_LableItem().setData(attribute[i]))
				}
				this.vbox_3.removeChildren();
				for (let i=7;i<11;i++) {
					this.vbox_2.addChild(new view.juese.Person_LableItem().setData(attribute[i]))
				}
				console.log('====>真气真气', GameApp.GameEngine.heroJob)
				this.lbl_gas.text = '消耗真气：' + jsonData.realGas + '/' + jsonData.gas;
				this.lbl_gold.text = '消耗金币：' + jsonData.gold;
				this.lbl_ballValue.text = jsonData.fakeGas + '/' + jsonData.maxfakegas;
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
			pkt.setString(ProtoCmd.Hero_getHeroRealGasPanel, null, null, this, (jsonData: ProtoCmd.itf_Hero_WuXueGasInfo) => {
				//兑换所需经验
				this.lbl_exp.text = '' + jsonData.exp;
				//兑换所需金币
				this.lbl_neddGold.text = '' + jsonData.gold;
				//一次可兑换的真气值
				this.lbl_Realgas.text = '' + jsonData.gas;
				//道具1
				let _itemUI1 = new view.compart.DaoJuWithNameItem();
				let itemInfo1 = new ProtoCmd.ItemBase();
				itemInfo1.dwBaseID = jsonData.oneid;
				_itemUI1.setData(itemInfo1);
				this.box_01.addChild(_itemUI1);
				//道具2
				let _itemUI2 = new view.compart.DaoJuWithNameItem();
				let itemInfo2 = new ProtoCmd.ItemBase();
				itemInfo2.dwBaseID = jsonData.twoid;
				_itemUI2.setData(itemInfo2);
				this.box_02.addChild(_itemUI2)
			})
			lcp.send(pkt);
		}
		/**
		 * 获取真气球
		 */
		public init_getRealGasBallData(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_exchangeRealGasByFakeGas, null, null, this, (jsonData) => {

			})
			lcp.send(pkt);
		}
	}
}