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
		//玩家等级总数
		private mySum;
		//判断是第几个弟子
		private index;
		public setData(index): void {
			this.index = index+1;
			this.vbox_left['sortItem'] = (items) => { };
			this.vbox_right['sortItem'] = (items) => { };
			this.addEvent();
			this.activation();
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
			this.mySum = GameApp.MainPlayer.zslevel * 1000 + GameApp.MainPlayer.level;
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
					let job = GameApp.GameEngine.HeroInfo[this.index].JOB;
					//当前属性
					let shuxing1 = GameUtil.parseEffectidToString('' + jsonData.effid)
					let attribute1 = shuxing1.des;
					let battle1 = shuxing1.battle[job];
					this.clip_power1.value = '' + battle1;
					let keys1 = Object.keys(attribute1)
					this.vbox_left.removeChildren();
					for (let key of keys1) {
						this.vbox_left.addChild(new view.juese.Person_LableItem().setData(attribute1[key]))
					}
					//下级属性
					let id = SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + jsonData.effid)
					let shuxing2 = GameUtil.parseEffectidToString('' + id)
					let attribute2 = shuxing2.des;
					let battle2 = shuxing2.battle[job];
					this.clip_power2.value = '' + battle2;
					let keys2 = Object.keys(attribute2)
					this.vbox_right.removeChildren();
					for (let key of keys2) {
						this.vbox_right.addChild(new view.juese.Person_LableItem().setData(attribute2[key]))
					}
					/**
					  * 当前属性
					  */
					// //最大生命
					// let HP1 = '' + SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_HP('' + jsonData.effid);
					// this.lbl_maxHP1.text = '' + HP1;
					// //物理攻击
					// let minPhysicsAttack1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_ATTACK('' + jsonData.effid);
					// let maxPhysicsAttack1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_ATTACK('' + jsonData.effid);
					// this.lbl_physicsAttack1.text = '' + minPhysicsAttack1 + '-' + maxPhysicsAttack1;
					// //物理防御
					// let minPhysicsDefense1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_PHYSICAL('' + jsonData.effid);
					// let maxPhysicsDefense1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_PHYSICAL('' + jsonData.effid);
					// this.lbl_physicsDefense1.text = '' + minPhysicsDefense1 + '-' + maxPhysicsDefense1;
					// //魔法防御
					// let minMagicDefense1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_SPELLS('' + jsonData.effid);
					// let maxMagicDefense1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_SPELLS('' + jsonData.effid);
					// this.lbl_magicDefense1.text = '' + minMagicDefense1 + '-' + maxMagicDefense1;
					// //准确
					// let accuracy1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).ACCURACY('' + jsonData.effid);
					// this.lbl_accuracy1.text = '' + accuracy1;
					// //闪避
					// let dodge1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).DODGE('' + jsonData.effid);
					// this.lbl_dodge1.text = '' + dodge1;
					// //暴击
					// let crit1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).CRIT('' + jsonData.effid);
					// this.lbl_crit1.text = '' + crit1;
					// //韧性
					// let toughness1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).TOUGHNESS('' + jsonData.effid);
					// this.lbl_toughness1.text = '' + toughness1;
					/**
					  * 下级属性
					  */
					//下级效果ID
					
					// //最大生命
					// let HP2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_HP('' + id);
					// this.lbl_maxHP2.text = '' + HP2;
					// //物理攻击
					// let minPhysicsAttack2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_ATTACK('' + id);
					// let maxPhysicsAttack2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_ATTACK('' + id);
					// this.lbl_physicsAttack2.text = '' + minPhysicsAttack2 + '-' + maxPhysicsAttack2;
					// //物理防御
					// let minPhysicsDefense2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_PHYSICAL('' + id);
					// let maxPhysicsDefense2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_PHYSICAL('' + id);
					// this.lbl_physicsDefense2.text = '' + minPhysicsDefense2 + '-' + maxPhysicsDefense2;
					// //魔法防御
					// let minMagicDefense2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_SPELLS('' + id);
					// let maxMagicDefense2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_SPELLS('' + id);
					// this.lbl_magicDefense2.text = '' + minMagicDefense2 + '-' + maxMagicDefense2;
					// //准确
					// let accuracy2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).ACCURACY('' + id);
					// this.lbl_accuracy2.text = '' + accuracy2;
					// //闪避
					// let dodge2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).DODGE('' + id);
					// this.lbl_dodge2.text = '' + dodge2;
					// //暴击
					// let crit2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).CRIT('' + id);
					// this.lbl_crit2.text = '' + crit2;
					// //韧性
					// let toughness2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).TOUGHNESS('' + id);
					// this.lbl_toughness2.text = '' + toughness2;
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
				_itemUI1.setData(itemInfo1);
				this.box_1.addChild(_itemUI1);
				//道具2
				let _itemUI2 = new view.compart.DaoJuWithNameItem();
				let itemInfo2 = new ProtoCmd.ItemBase();
				itemInfo2.dwBaseID = jsonData.superpill;
				_itemUI2.setData(itemInfo2);
				this.box_2.addChild(_itemUI2)
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
