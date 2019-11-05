/**Created by the LayaAirIDE*/
module view.menu {
	export class Menu_FirstCharge_VSinfo_item extends ui.menu.Menu_FirstCharge_VSinfo_itemUI {
		constructor() {
			super();
		}
		public setData(data) {
			this.lab_content.text = data.str;
			let o = new view.compart.DaoJuItem();
			let itemBase = new ProtoCmd.ItemBase()
			itemBase.dwBaseID = parseInt(data.index);
			itemBase.dwCount = data.num;
			itemBase.dwBinding = data.bind;
			o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
			this.box_item.addChild(o);
			let name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(itemBase.dwBaseID.toString());
			this.lab_name.text = name;
		}
	}
}