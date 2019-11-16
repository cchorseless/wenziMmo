/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_SanGongItem extends ui.hero.Hero_SanGongItemUI {
		constructor() {
			super();

		}
		//当前经验-最大经验
		public exp;
		//功能编号
		public client_func_index = 56;
		//开启所需等级总数
		private sum;
		//判断是第几个弟子
		private job;
		public setData(job): void {
			this.job = job;
			let hasActive = GameApp.MainPlayer.heroObj(job).lockState == 2;
			this.vbox_left['sortItem'] = (items) => { };
			this.vbox_right['sortItem'] = (items) => { };
			this.activation();
			this.addEvent();
		}
		public addEvent(): void {
			//转生突破
			this.btn_zhuanSheng.on(Laya.UIEvent.CLICK, this, () => {
				this.init_UpLevel();
			})
			//返璞归真
			this.btn_xiuwei.on(Laya.UIEvent.CLICK, this, () => {
				this.init_UpXiuWei();
			})
			//开启
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				if (GameApp.MainPlayer.lvlCount >= this.sum) {
					GameUtil.setServerData(this.client_func_index);
					this.activation();
				}
				else {
					TipsManage.showTips('您当前等级不足，暂时不能开启')
				}
			})
		}
		public activation(): void {
			//判断是否激活
			if (GameUtil.getServerData(this.client_func_index)) {
				this.viw_sangong.selectedIndex = 1;
				this.addLcpEvent();
				this.init_zhuangshengPanel();
				this.init_xiuwei();
			}
			else {
				this.viw_sangong.selectedIndex = 0;
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
		}
		/**
		 * 转生面板
		 */
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.Hero_zhuanShengPanel, this, (jsonData: ProtoCmd.itf_Hero_ZhuanShengInfo) => {
				let exp = jsonData.xw - jsonData.maxxw;
				this.exp = exp;
				if (jsonData.xw <= jsonData.maxxw) {
					this.lbl_progress.text = jsonData.xw + '/' + jsonData.maxxw;
					this.img_progress.width = 472 * jsonData.xw / jsonData.maxxw;
				}
				else {
					this.lbl_progress.text = '' + jsonData.maxxw + '/' + jsonData.maxxw;
					this.img_progress.width = 472;
				}
				if (jsonData.effid !== 0) {
					//当前属性
					let shuxing1 = GameUtil.parseEffectidToObj(['' + jsonData.effid])
					let attribute1 = shuxing1.des;
					let battle1 = shuxing1.battle[this.job];
					this.clip_power1.value = '' + battle1;
					this.vbox_left.removeChildren();
					for (let key of attribute1) {
						this.vbox_left.addChild(new view.compart.SinglePropsItem().setData(key))
					}
					//下级属性
					let id = SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + jsonData.effid)
					let shuxing2 = GameUtil.parseEffectidToObj(['' + id])
					let attribute2 = shuxing2.des;
					let battle2 = shuxing2.battle[this.job];
					this.clip_power2.value = '' + battle2;
					let keys2 = Object.keys(attribute2)
					this.vbox_right.removeChildren();
					for (let key2 of attribute2) {
						this.vbox_right.addChild(new view.compart.SinglePropsItem().setData(key2))
					}
				}
			})
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.Hero_zhuanShengPanel, this);
			super.destroy(isbool);
		}
		public init_xiuwei(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_getXiuWeiPanel, [1], null, this, (jsonData: ProtoCmd.itf_Hero_XiuWeiInfo) => {
				if (jsonData.exp !== undefined) {
					//所需经验
					this.lbl_exp.text = '' + jsonData.exp;
					//所需金币
					this.lbl_gold.text = '' + jsonData.gold;
					//可兑换的修为
					this.lbl_exchange.text = '' + jsonData.xw;
					//道具1
					let _itemUI1 = new view.compart.DaoJuWithNameItem();
					let itemInfo1 = new ProtoCmd.ItemBase();
					itemInfo1.dwBaseID = jsonData.pill;
					_itemUI1.setData(itemInfo1, EnumData.ItemInfoModel.SHOW_IN_MAIL);
					this.box_1.addChild(_itemUI1);
					//道具2
					let _itemUI2 = new view.compart.DaoJuWithNameItem();
					let itemInfo2 = new ProtoCmd.ItemBase();
					itemInfo2.dwBaseID = jsonData.superpill;
					_itemUI2.setData(itemInfo2, EnumData.ItemInfoModel.SHOW_IN_MAIL);
					this.box_2.addChild(_itemUI2)
				}
			})
			lcp.send(pkt);
		}
		/**
		 * 突破转生
		 */
		public init_UpLevel(): void {
			if (this.exp >= 0) {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.Hero_zhuanSheng, [1])
				lcp.send(pkt);
			}
			else {
				TipsManage.showTips('当前经验不足');
			}

		}
		/**
		 * 转生面板发协议
		 */
		public init_zhuangshengPanel(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_zhuanShengPanel, [1])
			lcp.send(pkt);
		}
		/**
	  * 兑换修为
	  */
		public init_UpXiuWei(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.Hero_exchangeXiuWei, [1], null, this, (jsonData) => {
			})
			lcp.send(pkt);
		}
	}
}
