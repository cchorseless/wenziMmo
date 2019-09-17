
module view.juQing {
	export class JuQingInfoPanel extends ui.juQing.JuQingInfoPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_left.vScrollBarSkin = '';
			this.vbox_left['sortItem'] = (items) => { };
			this.panel_0.vScrollBarSkin = '';
			this.panel_1.vScrollBarSkin = '';
			this.hbox_0['sortItem'] = (items) => { };
			this.hbox_1['sortItem'] = (items) => { };

			this.initUI();
			this.addEvent();
		}


		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.showPanel(PanelManage.JuQingMode);
			});
			EventManage.onWithEffect(this.btn_modeChange, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
			EventManage.onWithEffect(this.btn_pianZhang, Laya.UIEvent.CLICK, this, () => {
				new view.dialog.ChapterListDialog().setData().popup(true);
			});
			EventManage.onWithEffect(this.btn_rank, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openRankMainPanel();
			});
			EventManage.onWithEffect(this.btn_yinDao, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openYinDaoPanel();
			});
			EventManage.onWithEffect(this.btn_zhiNan, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openZhiNanPanel();
			});

		}


		public initUI(): void {
			// 更新篇章信息
			this.updatePianZhang(GameApp.MainPlayer.pianZhangID);
			// 更新章节信息
			this.updateCharpterInfo(GameApp.MainPlayer.charpterID);
		}

		/**
		 * 更新右侧界面
		 * @param zjID 
		 */
		public updateCharpterInfo(zjID: number): void {
			if (GameApp.GameEngine.allCharpterInfo[zjID] == null) { return };
			let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = GameApp.GameEngine.allCharpterInfo[zjID];
			if (charpterInfo) {
				// 效率
				let itemsKeys = Object.keys(charpterInfo.items);
				for (let key of itemsKeys) {
					let itemInfo = charpterInfo.items[key];
					switch (itemInfo.index) {
						// 金币
						case EnumData.CoinType.COIN_TYPE_GOLD:
							this.lbl_coinXl.text = '金币:' + itemInfo.num + '/H';
							break;
						// 玩家经验
						case EnumData.CoinType.COIN_TYPE_PLAYER_EXP:
							this.lbl_playExpXl.text = '阅历:' + itemInfo.num + '/H';
							break;
						// 英雄经验
						case EnumData.CoinType.COIN_TYPE_HERO_EXP:
							this.lbl_heroExpXl.text = '默契:' + itemInfo.num + '/H';
							break;
					}
				}
				// 章节简介
				this.lbl_zhangJieInfo.text = '' + charpterInfo.intro;
				// 随机掉落池
				let keys = Object.keys(charpterInfo.drops);
				for (let key of keys) {
					let _itemData = charpterInfo.drops[key];
					let _itemUI = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = _itemData.index;
					itemInfo.dwBinding = _itemData.binding;
					_itemUI.setData(itemInfo);
					this.hbox_0.addChild(_itemUI);
				}

				// 事件信息
				let keys1 = Object.keys(charpterInfo.events);
				for (let key1 of keys1) {
					let _eventInfo = charpterInfo.events[key1];

				}

				// 事件奖励




			}


		}
		/**
		 * 更新篇章ID
		 * @param pzID 
		 */
		public updatePianZhang(pzID: number): void {
			// 拉取章节信息
			let pkt1 = new ProtoCmd.QuestClientData();
			pkt1.setString(ProtoCmd.JQ_GET_JQ_ZHANGJIE, [pzID], null, this,
				(jsonData: { pzid: number, pzname: string, charpterInfo: any }) => {
					if (jsonData.pzid == pzID) {
						this.lbl_pianZhangName.text = '' + jsonData.pzname;
						let keys = Object.keys(jsonData.charpterInfo);
						for (let key of keys) {
							let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = jsonData.charpterInfo[key];
							charpterInfo.index = key;
							let charpterTitle_ui = new view.compart.JuQingTitleItem();
							charpterTitle_ui.setData(charpterInfo);
							this.vbox_left.addChild(charpterTitle_ui);
							// 更新章节信息
							GameApp.GameEngine.allCharpterInfo[charpterInfo.zjid] = charpterInfo;
						}
					}
				});
			lcp.send(pkt1);
		}
	}
}