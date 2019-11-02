/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXueHeDaoPanel extends ui.wuXue.WuXueHeDaoPanelUI {
		constructor() {
			super();
		}
		//功能编号
		public client_func_index = 21;
		//开启所需等级总数
		private sum;
		//玩家等级总数
		private mySum;
		public setData(): void {
			this.tab_zhuansheng.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_zhuansheng.selectedIndex = index;
			}, null, false);
			this.addEvent();
			this.activation();
			this.init_liqiEvent();
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
				// PanelManage.openWuXueLifeSkillPanel();
			});
			//转生突破
			this.btn_zhuanSheng.on(Laya.UIEvent.CLICK, this, () => {
				new view.hero.HeroZhuanShengDialog().popup(true);
			})
			//返璞归真
			this.btn_xiuwei.on(Laya.UIEvent.CLICK, this, () => {
				this.init_UpXiuWei();
			})
			// if (this.mySum >= this.sum) {
			//开启
			this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
				GameUtil.setServerData(this.client_func_index);
				this.activation();
			})
			// }
			// else {
			// 	this.btn_jihuo.on(Laya.UIEvent.CLICK, this, () => {
			// 		TipsManage.showTips('您当前等级不足，暂时不能开启')
			// 	});
			// }
		}
		public activation(): void {
			//判断是否激活
			if (GameUtil.getServerData(this.client_func_index)) {
				this.viw_heDao.selectedIndex = 1;
				this.addLcpEvent();
				this.init_xiuWei();
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
			GameApp.LListener.on(ProtoCmd.Hero_zhuanShengPanel, this, (jsonData: ProtoCmd.itf_Hero_ZhuanShengInfo) => {
				let exp = jsonData.xw - jsonData.maxxw;
				if (exp<0) {
					this.lbl_progress.text = jsonData.xw + '/' + jsonData.maxxw;
					this.img_progress.width = 472 * jsonData.xw / jsonData.maxxw;
				}
				else {
					this.lbl_progress.text = '' + jsonData.maxxw + '/' + jsonData.maxxw;
					this.img_progress.width = 472;
				}
				if (jsonData.effid !== 0) {
					//当前属性
					let shuxing1 = GameUtil.parseEffectidToString('' + jsonData.effid)
					let attribute1 = shuxing1.des;
					let keys1 = Object.keys(attribute1)
					this.vbox_left.removeChildren();
					for (let key of keys1) {
						this.vbox_left.addChild(new view.juese.Person_LableItem().setData(attribute1[key]))
					}
					//下级属性
					let id = SheetConfig.mydb_effect_base_tbl.getInstance(null).NEXTID('' + jsonData.effid)
					let shuxing2 = GameUtil.parseEffectidToString('' + id)
					let attribute2 = shuxing2.des;
					let keys2 = Object.keys(attribute2)
					this.vbox_right.removeChildren();
					for (let key of keys2) {
						this.vbox_right.addChild(new view.juese.Person_LableItem().setData(attribute2[key]))
					}
				}

			})
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.Hero_zhuanShengPanel, this);
			super.destroy(isbool);
		}

		/**
		 * 获取修为面板
		 */
		public init_xiuWei(): void {
			let bpkt = new ProtoCmd.QuestClientData();
			bpkt.setString(ProtoCmd.Hero_getXiuWeiPanel, [1], null, this, (jsonData: ProtoCmd.itf_Hero_XiuWeiInfo) => {
				if (Object.keys(jsonData).length == 0) { return };
				//所需经验
				this.lbl_exp.text = '' + jsonData.exp;
				//所需金币
				this.lbl_gold.text = '' + jsonData.gold;
				//可兑换的修为
				this.lbl_exchange.text = '' + jsonData.xw;
				//道具1
				let _itemUI1 = new view.compart.DaoJuItem();
				let itemInfo1 = new ProtoCmd.ItemBase();
				itemInfo1.dwBaseID = jsonData.pill;
				_itemUI1.setData(itemInfo1, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.box_1.addChild(_itemUI1);
				//道具2
				let _itemUI2 = new view.compart.DaoJuItem();
				let itemInfo2 = new ProtoCmd.ItemBase();
				itemInfo2.dwBaseID = jsonData.superpill;
				_itemUI2.setData(itemInfo2, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this.box_2.addChild(_itemUI2)
			})
			lcp.send(bpkt);
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
		/**
		 * 戾气
		 */
		public init_liqiEvent(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.WX_warSoulPanel, null, null, this, (jsonData) => {
				console.log('=====>戾气戾气', jsonData)
				//第一个魂力球的经验进度
				this.lbl_liqiprogress.text=jsonData.wstab[1].curexp+'/'+jsonData.wstab[1].maxexp;
					let exp =jsonData.wstab[1].curexp - jsonData.wstab[1].maxexp;
				if (exp<0) {
					this.lbl_liqiprogress.text = jsonData.wstab[1].curexp + '/' +jsonData.wstab[1].maxexp;
					this.img_liqiprogress.width = 550 * jsonData.wstab[1].curexp / jsonData.wstab[1].maxexp;
				}
				else {
					this.lbl_liqiprogress.text = '' + jsonData.wstab[1].maxexp + '/' + jsonData.wstab[1].maxexp;
					this.img_liqiprogress.width = 550;
				}
				//当前魂力
				this.lbl_hunli.text=''+jsonData.curexp;
				//兑换魂力所需经验
				this.lbl_needexp.text=''+jsonData.exchangetab.exp;
				//兑换魂力所需金币
				this.lbl_needgold.text=''+jsonData.exchangetab.gold;
				//满足条件可兑换的魂力数量
				this.lbl_addhunli.text=''+jsonData.exchangetab.soul;

			})
			lcp.send(pkt);
		}
	}
}