/**Created by the LayaAirIDE*/
module view.dialog {
	export class ItemInfoV1Dialog extends ui.dialog.ItemInfoV1DialogUI {
		constructor() {
			super();
			this.addEvent();
		}


		public setData(obj: ItemBase): ItemInfoV1Dialog {
			let dwBaseID = '' + obj.dwBaseID;
			this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(dwBaseID);
			this.lbl_itemDes.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES(dwBaseID);
			this.ui_item.lbl_count.text = '' + obj.dwCount;
			this.ui_item.img_item.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID('' + obj.dwBaseID) + '.png';
			this.ui_item.img_bg.skin = 'image/common/daoju/quality_' + obj.btQuality + '.png';
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close()
			})
		}
	}
}