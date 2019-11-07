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
		public wstab;
		public index;
		public setData(): void {
			this.tab_zhuansheng.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_heDao.selectedIndex = index;
				// this.init_event();
			}, null, false);
			this.init_event();
			this.addEvent();
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
			// 闭关
			this.btn_closeDoor.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openWuXueCloseDoorPanel();
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
			//戾气兑换魂力
			this.btn_exchange.on(Laya.UIEvent.CLICK, this, () => {
				this.init_exchangeSoul();
			})
			this.btn_lvlUp.on(Laya.UIEvent.CLICK, this, () => {
				this.init_soulUp();
			})
			for (let i = 1; i < 9; i++) {
				this['btn_liqi' + i].on(Laya.UIEvent.CLICK, this, () => {
					this.init_soulUpPanel(i);
				})
			}
			this.addLcpEvent();
		}
		/**
		 * 初始化转生和戾气是否激活
		 */
		public init_event(): void {
			if (this.tab_zhuansheng.selectedIndex == 0) {
				this.activation();
			}
			else {
				if (GameApp.MainPlayer.zslevel >= 7) {
					this.viw_liqi.selectedIndex = 1;
					this.init_liqiEvent();
					let index = 1;
					this.init_soulUpPanel(index);
				}
				else {
					this.viw_liqi.selectedIndex = 0;
					this.lbl_liqiIntroduce.text = SheetConfig.Introduction_play.getInstance(null).CONTENT('' + 6013);
				}
			}
		}
		public activation(): void {
			//判断是否激活
			if (GameUtil.getServerData(this.client_func_index)) {
				this.viw_zhuansheng.selectedIndex = 1;
				this.init_xiuWei();
				this.init_zhuangshengPanel();
			}
			else {
				this.viw_zhuansheng.selectedIndex = 0;
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
			//转生面板
			GameApp.LListener.on(ProtoCmd.Hero_zhuanShengPanel, this, (jsonData: ProtoCmd.itf_Hero_ZhuanShengInfo) => {
				console.log('=====>转生面板', jsonData);
				let exp = jsonData.xw - jsonData.maxxw;
				if (exp < 0) {
					this.lbl_progress.text = jsonData.xw + '/' + jsonData.maxxw;
					this.img_progress.width = 472 * jsonData.xw / jsonData.maxxw;
				}
				else {
					this.lbl_progress.text = '' + jsonData.maxxw + '/' + jsonData.maxxw;
					this.img_progress.width = 472;
				}
				if (jsonData.effid != 0) {
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
			/**
	  * 戾气面板回调
	  */
			GameApp.LListener.on(ProtoCmd.WX_warSoulPanel, this, (jsonData) => {
				console.log('=====>戾气面板', jsonData);
				this.wstab = jsonData.wstab;
				//第一个魂力球的经验进度
				let exp = jsonData.wstab[1].curexp - jsonData.wstab[1].maxexp;
				if (exp < 0) {
					this.lbl_liqiprogress.text = jsonData.wstab[1].curexp + '/' + jsonData.wstab[1].maxexp;
					this.img_liqiprogress.width = 550 * jsonData.wstab[1].curexp / jsonData.wstab[1].maxexp;
				}
				else {
					this.lbl_liqiprogress.text = jsonData.wstab[1].curexp + '/' + jsonData.wstab[1].maxexp;
					this.img_liqiprogress.width = 550;
				}
				//当前魂力
				this.lbl_hunli.text = '' + jsonData.curexp;
				//兑换魂力所需经验
				this.lbl_needexp.text = '' + jsonData.exchangetab.exp;
				//兑换魂力所需金币
				this.lbl_needgold.text = '' + jsonData.exchangetab.gold;
				//满足条件可兑换的魂力数量
				this.lbl_addhunli.text = '' + jsonData.exchangetab.soul;
				//根据魂力等级排序
				let keys = Object.keys(jsonData.wstab)
				let lvlArray = [];
				for (let key of keys) {
					lvlArray.push(jsonData.wstab[key]);
					this['btn_liqi' + key].label = 'lv.' + jsonData.wstab[key].lvl;
					//魂力球按钮状态
					if (jsonData.wstab[key].lvl == 999) {
						this['btn_liqi' + key].mouseEnabled = false;
					}
					else {
						this['btn_liqi' + key].mouseEnabled = true;
					}
				}
				function compare(property) {
					return function (a, b) {
						var value1 = a[property];
						var value2 = b[property];
						return value1 - value2;
					}
				}
				//进阶说明
				let array = lvlArray.sort(compare('lvl'))
				if (array[0].lvl >= 0 && array[0].lvl <= 10) {
					this.lbl_introduce.text = '黄阶战魂全部到    级,可进阶为玄阶';
					this.lbl_introduceLvl.text = '10';
					this.lbl_jieshu.text = '黄阶';
					this.lbl_jie.text = '-黄阶';
				}
				if (array[0].lvl > 10 && array[0].lvl <= 20) {
					this.lbl_introduce.text = '玄阶战魂全部到    级,可进阶为地阶';
					this.lbl_introduceLvl.text = '20';
					this.lbl_jieshu.text = '玄阶';
					this.lbl_jie.text = '-玄阶';
				}
				if (array[0].lvl > 20 && array[0].lvl <= 30) {
					this.lbl_introduce.text = '地阶战魂全部到    级,可进阶为天阶';
					this.lbl_introduceLvl.text = '30';
					this.lbl_jieshu.text = '地阶';
					this.lbl_jie.text = '-地阶';
				}
				if (array[0].lvl > 30 && array[0].lvl <= 40) {
					this.lbl_introduce.text = '天阶战魂全部到    级,可进阶为神阶';
					this.lbl_introduceLvl.text = '40';
					this.lbl_jieshu.text = '天阶';
					this.lbl_jie.text = '-天阶';
				}
				if (array[0].lvl > 40 && array[0].lvl <= 50) {
					this.lbl_introduce.text = '神阶战魂全部到    级,可进阶为圣阶';
					this.lbl_introduceLvl.text = '50';
					this.lbl_jieshu.text = '神阶';
					this.lbl_jie.text = '-神阶';
				}
				this.init_shuxing();
			})
			/**
		 * 戾气升级面板回调
		 */
			GameApp.LListener.on(ProtoCmd.WX_updateWarSoulPanel, this, (jsonData: ProtoCmd.itf_WX_LiQiUpPanelInfo) => {
				console.log('=====>升级面板', jsonData);
				this.lbl_hunli.text = '' + jsonData.cursoul;
				for (let i = 1; i < 9; i++) {
					this['btn_liqi' + i].selected = false;
				}
				this['btn_liqi' + jsonData.pos].selected = true;
				let exp = jsonData.curexp - jsonData.maxexp;
				if (exp < 0) {
					this.lbl_liqiprogress.text = jsonData.curexp + '/' + jsonData.maxexp;
					this.img_liqiprogress.width = 550 * jsonData.curexp / jsonData.maxexp;
				}
				else {
					this.lbl_liqiprogress.text = jsonData.curexp + '/' + jsonData.maxexp;
					this.img_liqiprogress.width = 550;
				}
				//增加属性百分比
				if (jsonData.addpro == 0) {
					this.lbl_Percentage.text = '';
				}
				else {
					this.lbl_Percentage.text = (jsonData.addpro * 100).toFixed(2) + '%';
				}
				//更新战魂等级
				this['btn_liqi' + jsonData.pos].label = 'lv.' + jsonData.lvl;
				//更新战魂点击状态
				this['btn_liqi' + jsonData.pos].mouseEnabled = true;
				//消耗的魂力
				this.lbl_use.text = '' + jsonData.needexp;
				function compare(property) {
					return function (a, b) {
						var value1 = a[property];
						var value2 = b[property];
						return value1 - value2;
					}
				}
				if (this.wstab !== undefined) {
					this.wstab[jsonData.pos].addpro = jsonData.addpro;
					this.wstab[jsonData.pos].lvl = jsonData.lvl;
					let index = this.wstab[jsonData.pos].realpos;

					switch (index) {
						case EnumData.emEquipPosition.EQUIP_HEADDRESS:
							this.lbl_pos.text = '帽子';
							break;
						case EnumData.emEquipPosition.EQUIP_NECKLACE:
							this.lbl_pos.text = '项链';
							break;
						case EnumData.emEquipPosition.EQUIP_CLOTHES:
							this.lbl_pos.text = '衣服';
							break;
						case EnumData.emEquipPosition.EQUIP_WEAPONS:
							this.lbl_pos.text = '武器';
							break;
						case EnumData.emEquipPosition.EQUIP_BRACELET_LEFT:
							this.lbl_pos.text = '左手镯';
							break;
						case EnumData.emEquipPosition.EQUIP_RING_LEFT:
							this.lbl_pos.text = '左戒指';
							break;
						case EnumData.emEquipPosition.EQUIP_SHOES:
							this.lbl_pos.text = '鞋';
							break;
						case EnumData.emEquipPosition.EQUIP_BELT:
							this.lbl_pos.text = '腰带';
							break;
					}
					//根据魂力等级排序
					let keys = Object.keys(this.wstab)
					let lvlArray = [];
					for (let key of keys) {
						lvlArray.push(this.wstab[key]);
					}
					//进阶说明
					let array = lvlArray.sort(compare('lvl'))
					if (array[0].lvl >= 0 && array[0].lvl <= 10) {
						this.lbl_introduce.text = '黄阶战魂全部到    级,可进阶为玄阶';
						this.lbl_introduceLvl.text = '10';
						this.lbl_jieshu.text = '黄阶';
						this.lbl_jie.text = '-黄阶';
					}
					if (array[0].lvl > 10 && array[0].lvl <= 20) {
						this.lbl_introduce.text = '玄阶战魂全部到    级,可进阶为地阶';
						this.lbl_introduceLvl.text = '20';
						this.lbl_jieshu.text = '玄阶';
						this.lbl_jie.text = '-玄阶';
					}
					if (array[0].lvl > 20 && array[0].lvl <= 30) {
						this.lbl_introduce.text = '地阶战魂全部到    级,可进阶为天阶';
						this.lbl_introduceLvl.text = '30';
						this.lbl_jieshu.text = '地阶';
						this.lbl_jie.text = '-地阶';
					}
					if (array[0].lvl > 30 && array[0].lvl <= 40) {
						this.lbl_introduce.text = '天阶战魂全部到    级,可进阶为神阶';
						this.lbl_introduceLvl.text = '40';
						this.lbl_jieshu.text = '天阶';
						this.lbl_jie.text = '-天阶';
					}
					if (array[0].lvl > 40 && array[0].lvl <= 50) {
						this.lbl_introduce.text = '神阶战魂全部到    级,可进阶为圣阶';
						this.lbl_introduceLvl.text = '50';
						this.lbl_jieshu.text = '神阶';
						this.lbl_jie.text = '-神阶';
					}
				}

			})
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
		public Dispose(): void {
			GameApp.LListener.offCaller(ProtoCmd.Hero_zhuanShengPanel, this);
			GameApp.LListener.offCaller(ProtoCmd.WX_warSoulPanel, this);
			GameApp.LListener.offCaller(ProtoCmd.WX_updateWarSoulPanel, this);
			PopUpManager.Dispose(this);
		}
		/**
		 * 戾气面板
		 */
		public init_liqiEvent(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.WX_warSoulPanel)
			lcp.send(pkt);
		}
		/**
		 * 兑换魂力
		 */
		public init_exchangeSoul(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.WX_exchangeWarSoulExp)
			lcp.send(pkt);
		}
		/**
		 * 戾气升级面板
		 */
		public init_soulUpPanel(index): void {
			//index的排序对应戾气面板的jsonData.wstab排序
			let pkt = new ProtoCmd.QuestClientData();
			this.index = index;
			pkt.setString(ProtoCmd.WX_updateWarSoulPanel, [index])
			lcp.send(pkt);
		}
		/**
		 * 升级
		 */
		public init_soulUp(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.WX_upgradeWarSoul)
			lcp.send(pkt);
		}
		public init_shuxing(): void {
			// let type;
			// let magicKill = 0;
			// let magicProtect = 0;
			// let wuliProtect = 0;
			// let maxmagicKill = 0;
			// let maxmagicProtect = 0;
			// let maxwuliProtect = 0;
			for (let i = 1; i < 9; i++) {
				//属性增加的百分比
				let addpro = this.wstab[i].addpro;
				if (this.wstab[i].lvl !== 999) {
					let item = GameUtil.findEquipInPlayer(this.wstab[i].realpos);
					if (item !== undefined) {
						let id = item.dwBaseID;
						let effid;
						switch (GameApp.MainPlayer.job) {
							case 1:
								effid = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB1_EFFICTID('' + id);
								break;
							case 2:
								effid = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB2_EFFICTID('' + id);
								break;
							case 3:
								effid = SheetConfig.mydb_item_base_tbl.getInstance(null).JOB3_EFFICTID('' + id);
								break;
						}
						// //魔法攻击z最小值
						// magicKill = magicProtect + SheetConfig.mydb_effect_base_tbl.getInstance(null).NONPAREIL_TYPE_MAXSC('' + effid) * addpro
						// //魔法防御最小值
						// magicProtect = magicProtect + SheetConfig.mydb_effect_base_tbl.getInstance(null).NONPAREIL_TYPE_MAXMAC('' + effid) * addpro
						// //物理防御最小值
						// wuliProtect = wuliProtect + SheetConfig.mydb_effect_base_tbl.getInstance(null).NONPAREIL_TYPE_MAXAC('' + effid) * addpro
						// //魔法攻击最大值
						// maxmagicKill = maxmagicKill + SheetConfig.mydb_effect_base_tbl.getInstance(null).NONPAREIL_TYPE_MAXSC('' + effid) * addpro
						// //魔法防御最大值
						// maxmagicProtect = maxmagicProtect + SheetConfig.mydb_effect_base_tbl.getInstance(null).NONPAREIL_TYPE_MAXMAC('' + effid) * addpro
						// //物理防御最大值
						// maxwuliProtect = maxwuliProtect + SheetConfig.mydb_effect_base_tbl.getInstance(null).NONPAREIL_TYPE_MAXAC('' + effid) * addpro
					}
				}
			}
			// //魔法攻击值
			// this.lbl_mofaKill.text = magicKill.toFixed(0) + '-' + maxmagicKill.toFixed(0);
			// //魔法防御值
			// this.lbl_mofa.text = magicProtect.toFixed(0) + '-' + maxmagicProtect.toFixed(0);
			// //物理防御值
			// this.lbl_wuli.text = wuliProtect.toFixed(0) + '-' + maxwuliProtect.toFixed(0);
		}
	}
}