/**Created by the LayaAirIDE*/
module view.compart {
	export class EquipMixInfoItem extends ui.compart.EquipMixInfoItemUI {
		public itemID;
		constructor() {
			super();
			this.addEvent();
		}
		public setData(data, index) {
			this.itemID = index;
			let id = data[3];
			let name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(id.toString());
			let skin = SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(id.toString());
			// this.img_icon.skin = skin + "";
			this.lab_name.text = name;

		}
		private addEvent() {
			EventManage.onWithEffect(this.btn_icon, Laya.UIEvent.CLICK, this, () => {
				view.dialog.EquipMixUp.self.onChooseItem(this.itemID)
			})
		}



	}
}