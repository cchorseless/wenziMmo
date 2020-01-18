/**Created by the LayaAirIDE*/
module view.dialog {
	export class ItemSuitInfoDialog extends ui.dialog.ItemSuitInfoDialogUI {
		constructor() {
			super();
		}
		public setData(data): ItemSuitInfoDialog {
			this.lbl_suitName.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + data.dwBaseID).split('·')[0];
			let id = '' + data.dwBaseID;
			let idArray = id.split('');
			let num = '';
			for (let i in idArray) {
				if (parseInt(i) < (idArray.length - 1)) {
					num = num + idArray[i];
				} else {
					num = num + '1';
				}
			}
			let itemId = parseInt(num);
			this.vbox_posInfo.removeChildren();
			for (let j = 0; j < 8; j++) {
				let box = new Laya.Box();
				let lbl1 = new Laya.Label();
				lbl1.fontSize = 20;
				lbl1.font = 'FZXK';
				lbl1.color = '#000000'
				lbl1.x = 0;
				lbl1.text = '【套装' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMPOSITION('' + itemId) + '】';
				let lbl2 = new Laya.Label();
				lbl2.fontSize = 20;
				lbl2.font = 'FZXK';
				lbl2.color = '#63491a'
				lbl2.x = lbl1.width + 20;
				lbl2.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + itemId);
				lbl1.y = lbl2.y = 0;
				box.addChild(lbl1);
				box.addChild(lbl2);
				this.vbox_posInfo.addChild(box);
				itemId += 1;
			}
			// 套装属性
			let effid1 = SheetConfig.mydb_item_base_tbl.getInstance(null).SUIT_EFFICTID('' + data.dwBaseID);
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