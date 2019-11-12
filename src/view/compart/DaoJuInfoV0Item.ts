/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJuInfoV0Item extends ui.compart.DaoJuInfoV0ItemUI {
		constructor() {
			super();
		}

		public setData(obj: ProtoCmd.ItemBase) {
			let dwBaseID = '' + obj.dwBaseID;
			// 物品名称
			// this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(dwBaseID).split('_')[0];
			// this.lbl_itemName.color = ColorUtils.nameColor[SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(dwBaseID)];
			// 物品描述
			this.div_itemDes.style.fontSize = 25;
			this.div_itemDes.innerHTML = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES(dwBaseID);
			// 使用等级
			let zs_level = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(dwBaseID);
			this.lbl_useLevel.text = (zs_level == 0 ? '' : '' + zs_level + '转') + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED(dwBaseID) + '级';
			// 使用职业
			let jobLimit = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB(dwBaseID)
			this.lbl_jobNeed.text =  LangConfig.JOB_TYPEDES[EnumData.JOB_TYPE[jobLimit]];
			// 使用性别
			let sexLimit = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMSEX(dwBaseID)
			this.lbl_sexNeed.text =  LangConfig.SEX_TYPEDes[EnumData.SEX_TYPE[sexLimit]];
			// 道具ICON信息赋值
			this.ui_item.initUI(obj);
			
		}
	}
}