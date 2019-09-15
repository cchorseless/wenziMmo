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
					console.log(jsonData);
				});
				lcp.send(pkt);
			})
		}
		public initUI(): void {
			// 奖励信息
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JQ_GET_JQ_openJuQingBaseReward, null, null, this, (jsonData) => {
				let keys = Object.keys(jsonData);
				for (let key of keys) {
					let _itemData = jsonData[key];
					let _itemUI = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = _itemData.index;
					itemInfo.dwBinding = _itemData.binding;
					itemInfo.dwCount = _itemData.num;
					console.log(_itemUI)
					// _itemUI.setData(itemInfo);
					// todo
					this.hbox_1.addChild(_itemUI);
				};
			})
			lcp.send(pkt);
			// 掉落信息
			let charpterInfo: ProtoCmd.itf_JUQING_CHARPTERINFO = GameApp.GameEngine.allCharpterInfo[GameApp.MainPlayer.charpterID];
			if (charpterInfo) {
				// 章节名称
				this.lbl_charpterName.text = '' + charpterInfo.name;
				this.lbl_charpterNo.text = '第' + charpterInfo.index + '章';
				// 金币
				this.lbl_coinXl.text = '金币：' + charpterInfo.items[EnumData.CoinType.COIN_TYPE_GOLD] + '/H';
				// 玩家经验
				// this.lbl_playerExp.text = '经验：' + charpterInfo.items[]
				// 英雄经验
				// 随机掉落池
				let keys = Object.keys(charpterInfo.drops);
				for (let key of keys) {
					let _itemData = charpterInfo.drops[key];
					let _itemUI = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = _itemData.index;
					itemInfo.dwBinding = _itemData.binding;
					itemInfo.dwCount = _itemData.num;
					// _itemUI.setData(itemInfo);
					// todo
					this.hbox_0.addChild(_itemUI);
				}
				console.log(charpterInfo);
			}
		}
	}
}