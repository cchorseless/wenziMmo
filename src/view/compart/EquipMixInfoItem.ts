/**Created by the LayaAirIDE*/
module view.compart{
	export class EquipMixInfoItem extends ui.compart.EquipMixInfoItemUI{
		public itemID;
		constructor(){
			super();
		}
		public setData(data,index){
			// this.btn_icon.skin = "image/common/daoju/quality_4.png"//"image/common/daoju/quality_5.png"选中
			let id = data[3];
			let name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(id.toString());
			let skin = SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(id.toString());
			// this.img_icon.skin = skin + "";
			this.lab_name.text = name;
			
		}
	}
}