/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXueHeDaoPanel extends ui.wuXue.WuXueHeDaoPanelUI {
		constructor() {
			super();
		}
		//当前经验-最大经验
		public exp;
		//功能编号
		public client_func_index = 21;
		//开启所需等级总数
		private sum;
		//玩家等级总数
		private mySum;
		public setData(): void {
			this.addEvent();
			this.activation();
		}
		public addEvent(): void {
			// 模式切换
			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});
			// 返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			// 外功
			this.btn_waiGong.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueWaiGongPanel()
			});
			// 内功
			this.btn_neiGong.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueNeiGongPanel()
			});
			// 生活技能
			this.btn_lifeSkill.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueLifeSkillPanel();
			});
			//转生突破
			this.btn_zhuanSheng.on(Laya.UIEvent.CLICK, this, () => {
				new view.hero.HeroZhuanShengDialog().popup(true);
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
				this.viw_heDao.selectedIndex = 1;
				this.addLcpEvent();
				this.init_zhuangshengPanel();
			}
			else {
				this.viw_heDao.selectedIndex = 0;
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
		public addLcpEvent(): void {
			let pkt = new ProtoCmd.QuestClientData();
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
					/**
					  * 当前属性
					  */
					//最大生命
					let HP1 = '' + SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_HP('' + jsonData.effid);
					this.lbl_maxHP1.text = '' + HP1;
					//物理攻击
					let minPhysicsAttack1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_ATTACK('' + jsonData.effid);
					let maxPhysicsAttack1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_ATTACK('' + jsonData.effid);
					this.lbl_physicsAttack1.text = '' + minPhysicsAttack1 + '-' + maxPhysicsAttack1;
					//物理防御
					let minPhysicsDefense1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_PHYSICAL('' + jsonData.effid);
					let maxPhysicsDefense1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_PHYSICAL('' + jsonData.effid);
					this.lbl_physicsDefense1.text = '' + minPhysicsDefense1 + '-' + maxPhysicsDefense1;
					//魔法防御
					let minMagicDefense1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_SPELLS('' + jsonData.effid);
					let maxMagicDefense1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_SPELLS('' + jsonData.effid);
					this.lbl_magicDefense1.text = '' + minMagicDefense1 + '-' + maxMagicDefense1;
					//准确
					let accuracy1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).ACCURACY('' + jsonData.effid);
					this.lbl_accuracy1.text = '' + accuracy1;
					//闪避
					let dodge1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).DODGE('' + jsonData.effid);
					this.lbl_dodge1.text = '' + dodge1;
					//暴击
					let crit1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).CRIT('' + jsonData.effid);
					this.lbl_crit1.text = '' + crit1;
					//韧性
					let toughness1 = SheetConfig.mydb_effect_base_tbl.getInstance(null).TOUGHNESS('' + jsonData.effid);
					this.lbl_toughness1.text = '' + toughness1;
					/**
					  * 下级属性
					  */
					//下级效果ID
					let id = SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + jsonData.effid)
					//最大生命
					let HP2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_HP('' + id);
					this.lbl_maxHP2.text = '' + HP2;
					//物理攻击
					let minPhysicsAttack2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_ATTACK('' + id);
					let maxPhysicsAttack2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_ATTACK('' + id);
					this.lbl_physicsAttack2.text = '' + minPhysicsAttack2 + '-' + maxPhysicsAttack2;
					//物理防御
					let minPhysicsDefense2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_PHYSICAL('' + id);
					let maxPhysicsDefense2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_PHYSICAL('' + id);
					this.lbl_physicsDefense2.text = '' + minPhysicsDefense2 + '-' + maxPhysicsDefense2;
					//魔法防御
					let minMagicDefense2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MIN_SPELLS('' + id);
					let maxMagicDefense2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).MAX_SPELLS('' + id);
					this.lbl_magicDefense2.text = '' + minMagicDefense2 + '-' + maxMagicDefense2;
					//准确
					let accuracy2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).ACCURACY('' + id);
					this.lbl_accuracy2.text = '' + accuracy2;
					//闪避
					let dodge2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).DODGE('' + id);
					this.lbl_dodge2.text = '' + dodge2;
					//暴击
					let crit2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).CRIT('' + id);
					this.lbl_crit2.text = '' + crit2;
					//韧性
					let toughness2 = SheetConfig.mydb_effect_base_tbl.getInstance(null).TOUGHNESS('' + id);
					this.lbl_toughness2.text = '' + toughness2;
				}

			})
			let bpkt = new ProtoCmd.QuestClientData();
			bpkt.setString(ProtoCmd.Hero_getXiuWeiPanel, [1], null, this, (jsonData: ProtoCmd.itf_Hero_XiuWeiInfo) => {
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
			lcp.send(bpkt);
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.Hero_zhuanShengPanel, this);
			super.destroy(isbool);
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