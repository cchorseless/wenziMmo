/**Created by the LayaAirIDE*/
module view.dialog {
	export class BaoXiangPrizeDialog extends ui.dialog.BaoXiangPrizeDialogUI {
		constructor() {
			super();
		}
		public setData(item): BaoXiangPrizeDialog {
			this.panel_baoxiang.hScrollBarSkin = '';
			this.hbox_baoxiang['sortItem'] = (items) => { };
			this.hbox_baoxiang.removeChildren();
			for (let i = 1; item[i]; i++) {
				let _itemUI = new view.compart.DaoJuWithNameItem();
				let itemInfo = new ProtoCmd.ItemBase();
				itemInfo.dwBaseID = item[i].index;
				itemInfo.dwCount = item[i].num;
				_itemUI.setData(itemInfo);
				this.hbox_baoxiang.addChild(_itemUI)
			}
			this.addEvent();
			return this;
		}
	
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
	}
}