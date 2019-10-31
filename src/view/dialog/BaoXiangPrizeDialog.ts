/**Created by the LayaAirIDE*/
module view.dialog {
	export class BaoXiangPrizeDialog extends ui.dialog.BaoXiangPrizeDialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public setData(item): BaoXiangPrizeDialog {
			this.panel_baoxiang.hScrollBarSkin = '';
			this.hbox_baoxiang['sortItem'] = (items) => { };
			this.hbox_baoxiang.removeChildren();
			//宝箱奖励
			for (let i = 1; item[i]; i++) {
				let _itemUI = new view.compart.DaoJuWithNameItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = item[i].index;
				itemInfo.dwCount = item[i].num;
				_itemUI.setData(itemInfo);
				this.hbox_baoxiang.addChild(_itemUI)
			}
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
		public init_luckDrawView(data): BaoXiangPrizeDialog {
			this.panel_baoxiang.hScrollBarSkin = '';
			this.hbox_baoxiang['sortItem'] = (items) => { };
			this.hbox_baoxiang.removeChildren();
			//宝箱奖励
			let keys = Object.keys(data);
			for (let key of keys) {
				let itemData = data[key]
				let _itemUI = new view.compart.DaoJuWithNameItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = itemData.item.index;
				itemInfo.dwCount = itemData.item.num;
				itemInfo.dwBinding = itemData.item.binding;
				_itemUI.setData(itemInfo);
				_itemUI.lbl_exp.visible = true;
				//获得奖励条件
				_itemUI.lbl_exp.x = 6;
				_itemUI.lbl_exp.text = '累计抽' + itemData.cnt + '次可获得'
				this.hbox_baoxiang.addChild(_itemUI)
			}
			return this;
		}
	}
}