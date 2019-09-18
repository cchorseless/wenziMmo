/**Created by the LayaAirIDE*/
module view.dialog {
	export class JuQingPrizeDialog extends ui.dialog.JuQingPrizeDialogUI {
		constructor() {
			super();
		}
		public setData(): JuQingPrizeDialog {
			this.panel_0.hScrollBarSkin = '';
			this.panel_1.hScrollBarSkin = '';
			this.hbox_0['sortItem'] = (items) => { };
			this.hbox_1['sortItem'] = (items) => { };
			this.lbl_pzName.text = '' + GameApp.MainPlayer.pianZhangName;
			this.initUI();
			this.addEvent();
			return this
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close()
			});
			// 领取奖励
			this.btn_lingQu.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.JQ_GET_JQ_getJuQingBaseReward, null, null, this, (jsonData) => {
					this.close();
				});
				lcp.send(pkt);
			})
		}
		public initUI(): void {
			// 奖励信息
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JQ_GET_JQ_openJuQingBaseReward, null, null, this, (jsonData) => {
				console.log(jsonData);
				let keys = Object.keys(jsonData);
				for (let key of keys) {
					let _itemData = jsonData[key];
					let _itemUI = new view.compart.DaoJuWithNameItem();
					_itemUI.initUI(_itemData);
					// TODO
					console.log(_itemUI);
					this.hbox_1.addChild(_itemUI);
				};
				// 无奖励提示
				this.lbl_NoPrizeTips.visible = (this.hbox_1.numChildren == 0);
			})
			lcp.send(pkt);
			// 掉落信息
			let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = GameApp.GameEngine.allCharpterInfo[GameApp.MainPlayer.charpterID];
			if (charpterInfo) {
				// 章节名称
				this.lbl_charpterName.text = '' + charpterInfo.name;
				this.lbl_charpterNo.text = '第' + charpterInfo.index + '章';
				// 金币 效率
				let itemsKeys = Object.keys(charpterInfo.items);
				for (let key of itemsKeys) {
					let itemInfo = charpterInfo.items[key];
					switch (itemInfo.index) {
						// 金币
						case EnumData.CoinType.COIN_TYPE_GOLD:
							this.lbl_coinXl.text =  itemInfo.num + '/H';
							break;
						// 玩家经验
						case EnumData.CoinType.COIN_TYPE_PLAYER_EXP:
							this.lbl_playerExp.text =  itemInfo.num + '/H';
							break;
						// 英雄经验
						case EnumData.CoinType.COIN_TYPE_HERO_EXP:
							this.lbl_heroExp.text =  itemInfo.num + '/H';
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
					_itemUI.setData(itemInfo);
					this.hbox_0.addChild(_itemUI);
				}

			}
		}
	}
}