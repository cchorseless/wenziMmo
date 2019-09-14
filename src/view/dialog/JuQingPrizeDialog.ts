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
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JQ_GET_JQ_openJuQingBaseReward, null, null, this, (jsonData) => {
				let keys = Object.keys(jsonData);
				console.log(jsonData, keys);
				for (let key of keys) {
					let _itemData = jsonData[key];
					console.log(_itemData);
					let itemUI = new view.compart.DaoJuWithNameItem();
					let itemInfo = new ProtoCmd.ItemBase();
					itemInfo.dwBaseID = _itemData.index;
					itemInfo.dwBinding = _itemData.binding;
					itemInfo.dwCount = _itemData.num;
					itemUI.setData(itemInfo);
					this.hbox_1.addChild(itemUI);
				};
			})
			lcp.send(pkt);
		}
	}
}