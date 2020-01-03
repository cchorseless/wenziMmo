/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBen_RewardItem extends ui.fuBen.FuBen_RewardItemUI {
		constructor() {
			super();
		}
		public setData(itemBase, hasGet, mode = EnumData.ItemInfoModel.SHOW_IN_MAIL,type=0) {
			this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + itemBase.dwBaseID).split('_')[0];
			this.lbl_itemName.color = ColorUtils.nameColor[SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY('' + itemBase.dwBaseID)];
			this.ui_item.setData(itemBase, mode);
			if(hasGet){
				this.img_hasGet.visible =true;
			}else{
				this.img_hasGet.visible =false;
			}
		}
	}
}