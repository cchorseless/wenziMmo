/**Created by the LayaAirIDE*/
module view.promotion {
	export class Promotion_Special_VSinfo_Itembox extends ui.promotion.Promotion_Special_VSinfo_ItemboxUI {
		constructor() {
			super();
		}
		public setData(data) {
			let o = new view.compart.DaoJuItem();
			let itemBase = new ProtoCmd.ItemBase()
			itemBase.dwBaseID = parseInt(data.index);
			itemBase.dwCount =data.num;
			itemBase.dwBinding = data.bind;
			o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
			this.box_item.addChild(o);
			let name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(itemBase.dwBaseID.toString());
			this.lab_name.text = name;
		}
	}
}