/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJiV1Item extends ui.compart.DaoJiV1ItemUI {
		constructor() {
			super();
		}
		public setData(obj: ProtoCmd.ItemBase) {
			let dwBaseID = '' + obj.dwBaseID;
			// 物品描述
			// this.div_itemDes.style.fontSize = 25;
			// this.div_itemDes.style.wordWrap = true;
			// this.div_itemDes.innerHTML = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES(dwBaseID);
			// this.img_bg.height = this.div_itemDes.y + this.div_itemDes.contextHeight + 5;
			//使用部位
			let pos = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMPOSITION(dwBaseID);
			this.lbl_buwei.text = LangConfig.emEquipPositionDes[EnumData.emEquipPosition[pos]];
			// 使用等级
			let zs_level = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(dwBaseID);
			this.lbl_useLevel.text = (zs_level == 0 ? '' : '' + zs_level + '转') + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMLVNEED(dwBaseID) + '级';
			// 使用职业
			let jobLimit = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB(dwBaseID)
			this.lbl_jobNeed.text = LangConfig.JOB_TYPEDES[EnumData.JOB_TYPE[jobLimit]];
			//售价
			// this.lbl_score.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMSELLPRICE(dwBaseID)
			// 道具ICON信息赋值
			this.ui_item.initUI(obj);

		}
	}
}