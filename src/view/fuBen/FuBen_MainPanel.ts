/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_MainPanel extends ui.fuBen.FuBen_MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.initUI();
			this.addEvent();
		}

		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
	PanelManage.openJuQingModePanel()
			});
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			EventManage.onWithEffect(this.btn_daily, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenDailyPanel();
			});
			EventManage.onWithEffect(this.btn_juQing, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenMainPanel();
			});
			EventManage.onWithEffect(this.btn_liLian, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenLiLianPanel();
			});
			EventManage.onWithEffect(this.btn_xianShi, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFuBenXianShiPanel();
			});
			EventManage.onWithEffect(this.btn_pianZhang, Laya.UIEvent.CLICK, this, () => {
				new view.juQing.ChapterListDialog().setData().popup(true);
			});
			// 切换层数,把自己的层数发过来
			for (let i = 0; i < 5; i++) {
				EventManage.onWithEffect(this['ui_item' + i], Laya.UIEvent.CLICK, this, () => {
					this.updateMainFuBenBossInfo(this['ui_item' + i].ceng);
				});
			}
			// 挑战BOSS
			EventManage.onWithEffect(this.btn_battle, Laya.UIEvent.CLICK, this, this.enterFuBen);
		}



		public initUI(): void {
			this.panel_0.vScrollBarSkin = '';
			this.panel_1.hScrollBarSkin = '';
			this.panel_2.hScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.hbox_1['sortItem'] = (items) => { };
			this.hbox_2['sortItem'] = (items) => { };
			this.updatePianZhangInfo(GameApp.MainPlayer.pianZhangID);
		}

		/**
		 * 更新篇章目录条
		 * @param index 
		 */
		public updatePianZhangInfo(pzID: number): void {
			// 拉取章节信息
			let pkt1 = new ProtoCmd.QuestClientData();
			pkt1.setString(ProtoCmd.JQ_GET_JQ_ZHANGJIE, [pzID], null, this,
				(jsonData: { pzid: number, pzname: string, charpterInfo: any }) => {
					if (jsonData.pzid == pzID) {
						// 篇章名字
						this.lbl_pianZhangName.text = jsonData.pzname;
						let keys = Object.keys(jsonData.charpterInfo);
						this.vbox_0.removeChildren();
						for (let key of keys) {
							let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = jsonData.charpterInfo[key];
							charpterInfo.index = key;
							let charpterTitle_ui = new view.compart.JuQingTitleItem();
							charpterTitle_ui.anchorX = 0;
							charpterTitle_ui.setData(charpterInfo);
							this.vbox_0.addChild(charpterTitle_ui);
							// 更新章节信息
							GameApp.GameEngine.allCharpterInfo[charpterInfo.zjid] = charpterInfo;
						}
						// 更新单个章节的信息
						this.updateMainFuBenInfo(GameApp.MainPlayer.charpterID);
					}
				});
			lcp.send(pkt1);
		}

		/**
		 * 拉取单个章节信息
		 * @param charpterID 
		 */
		public updateMainFuBenInfo(charpterID: number): void {
			this.hbox_1.removeChildren();
			// 关卡名称
			let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = GameApp.GameEngine.allCharpterInfo[charpterID];
			if (charpterInfo) {
				// 章节标题信息
				this.lbl_charpterName.text = '第' + charpterInfo.index + '章 ' + charpterInfo.name;
				// 章节简介
				this.lbl_into.text = '' + charpterInfo.intro;
				// 挂机预览
				let itemsKeys = Object.keys(charpterInfo.items);
				for (let key of itemsKeys) {
					let itemInfo = charpterInfo.items[key];
					switch (itemInfo.index) {
						// 金币
						case EnumData.CoinType.COIN_TYPE_GOLD:
							this.lbl_conXl.text = itemInfo.num + '/H';
							break;
						// 玩家经验
						case EnumData.CoinType.COIN_TYPE_PLAYER_EXP:
							this.lbl_expXl.text = itemInfo.num + '/H';
							break;
						// 英雄经验
						case EnumData.CoinType.COIN_TYPE_HERO_EXP:
							this.lbl_exp2xl.text = itemInfo.num + '/H';
							break;
					}
				}
				// 随机掉落池
				let keys = Object.keys(charpterInfo.drops);
				for (let key of keys) {
					let _itemData = charpterInfo.drops[key];
					let _itemUI = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = _itemData.index;
					itemInfo.dwBinding = _itemData.binding;
					_itemUI.setData(itemInfo,EnumData.ItemInfoModel.SHOW_IN_MAIL);
					this.hbox_1.addChild(_itemUI);
				}
			}
			// 除魔相关信息
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_ChuMoClientOpen, [charpterID], null, this, (jsonData: ProtoCmd.itf_FB_MainFbInfo) => {
				// 挑战次数
				this.lbl_tiaoZhanTimes.text = '挑战次数:' + jsonData.curcnt + '/' + jsonData.totalcnt;
				// 关卡信息
				let keys = Object.keys(jsonData.state);
				for (let key of keys) {
					// 设置怪物头像数据
					(this['ui_item' + (parseInt(key) % 5)] as view.compart.MonsterIconV0Item).setData(charpterID, key, jsonData.state[key]);
				}
				// 设置宝箱状态
				// 9星宝箱
				let img9skin = '';
				switch (jsonData.star['1'].bj) {
					// 不能打开
					case 0:
						img9skin = 'image/common/icon_baoxiang2_close.png';
						break;
					// 可以打开
					case 1:
						img9skin = 'image/common/icon_baoxiang2_light.png';
						break;
					// 已被打开
					case 2:
						img9skin = 'image/common/icon_baoxiang2_open.png';
						break;
				}
				this.img_9prize.skin = img9skin;
				// 15星宝箱
				let img15skin = '';
				switch (jsonData.star['2'].bj) {
					// 不能打开
					case 0:
						img15skin = 'image/common/icon_baoxiang3_close.png';
						break;
					// 可以打开
					case 1:
						img15skin = 'image/common/icon_baoxiang3_light.png';
						break;
					// 已被打开
					case 2:
						img15skin = 'image/common/icon_baoxiang3_open.png';
						break;
				}
				this.img_15prize.skin = img15skin;
				// 显示单个BOSS信息
				this.updateMainFuBenBossInfo(jsonData.ceng)
			})
			lcp.send(pkt);
		}

		public selectedCeng: number;
		/**
		 * 选择单个BOSS信息
		 */
		public updateMainFuBenBossInfo(ceng: number): void {
			if (ceng == null) { return };
			this.selectedCeng = ceng;
			this.hbox_2.removeChildren();
			let pkt = new ProtoCmd.QuestClientData();
			// type(1强化等级，2神盾，3龙魂，4光翼，5武器等级,6穿戴多少件多少等级的装备，8勋章ID)
			pkt.setString(ProtoCmd.FB_ChuMoCengOpen, [ceng], null, this, (jsonData: { type?: number, need?: number, lv?: number, item: any, times: number }) => {
				console.log(jsonData)
				// 随机掉落池
				let keys = Object.keys(jsonData.item);
				for (let key of keys) {
					let _itemData = jsonData.item[key];
					let _itemUI = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = _itemData.index;
					itemInfo.dwBinding = _itemData.binding;
					_itemUI.setData(itemInfo,EnumData.ItemInfoModel.SHOW_IN_MAIL);
					this.hbox_2.addChild(_itemUI);
				};
				if (jsonData.lv) {
					this.lbl_lvneed.text = '' + jsonData.lv;
				};
				switch (jsonData.type) {
					case 0:
						this.lbl_extraDes.visible = false;
						this.lbl_needextra.visible = false;
						break;
					case 1:
						this.lbl_extraDes.text = '装备强化等级'
						this.lbl_needextra.text = '' + jsonData.need;
						break;
					case 2:
						this.lbl_extraDes.text = '神盾等级'
						this.lbl_needextra.text = '' + jsonData.need;
						break;
					case 3:
						this.lbl_extraDes.text = '龙魂等级'
						this.lbl_needextra.text = '' + jsonData.need;
						break;
					case 4:
						this.lbl_extraDes.text = '罡气境界'
						this.lbl_needextra.text = '' + jsonData.need;
						break;
					case 5:
						this.lbl_extraDes.text = '武器等级'
						this.lbl_needextra.text = '' + jsonData.need;
						break;
					case 6:
						this.lbl_extraDes.text = '装备穿戴等级'
						this.lbl_needextra.text = '穿戴' + jsonData.lv + '级' + jsonData.need + '件';
						break;
					case 8:
						this.lbl_extraDes.text = '善缘等级'
						this.lbl_needextra.text = '' + jsonData.need;
						break;
				}
			});
			lcp.send(pkt);
		}

		/**
		 * 进入除魔副本
		 */
		public enterFuBen(): void {
			if (this.selectedCeng == null) { return };
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_ChuMoEnter, [this.selectedCeng])
			lcp.send(pkt);
		}
	}
}