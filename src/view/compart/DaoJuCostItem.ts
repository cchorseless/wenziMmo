/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJuCostItem extends ui.compart.DaoJuCostItemUI {
		public item: ProtoCmd.ItemBase;
		public model: EnumData.ItemInfoModel = EnumData.ItemInfoModel.SHOW_NONE;
		public addType;
		constructor() {
			super();
		}
		/**
		 * 
		 * @param item   
		 * @param mode   响应事件模式,默认不显示
		 * @param costStatus   当前消耗的状态   是否足够消耗  用于改变lab_cost 的字体颜色 和img_NeedAdd的显示状态
		 * @param costStr  lab_cost 显示  
		 * @param addType  点击img_NeedAdd  对应弹出的面板类型  
		 */
		public setData(item: ProtoCmd.ItemBase, mode: EnumData.ItemInfoModel = EnumData.ItemInfoModel.SHOW_NONE, costStatus: boolean, costStr: string, addType: number) {
			this.addType = addType;
			let dwBaseID = item.dwBaseID + '';
			// 物品ICON
			this.img_item.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(dwBaseID) + '.png';
			// 底图
			this.img_bg.skin = 'image/common/daoju/quality_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(dwBaseID) + '.png';
			if (costStatus) {
				this.lab_cost.font = '#63491a';
				this.img_NeedAdd.visible = false;
			} else {
				this.lab_cost.font = '#7a211f';
				this.img_NeedAdd.visible = true;
			}
			this.lab_cost.text = costStr;
		}

		public addEvent(): void {
			EventManage.onWithEffect(this.btn_add, Laya.UIEvent.CLICK, this, function () {
				switch (this.addType) {
					case 1:
						break;
				}
			})
		}
	}
}