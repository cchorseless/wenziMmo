/**Created by the LayaAirIDE*/
module view.activity {
	// view.activity.Active_EveryDayRecharge_Item
	export class Active_EveryDayRecharge_Item extends ui.activity.Active_EveryDayRecharge_ItemUI {
		public buttonBJ = 0;
		constructor() {
			super();
		}
		public setData(data, bj) {
			this.buttonBJ = bj;
			if (bj == 0) {
				this.btn_get.label = "前往充值";
			} else if (bj == 1) {
				this.btn_get.label = "领取";
			} else if (bj == 2) {
				this.btn_get.gray = true;
				this.btn_get.label = "已领取"
			}
			for (let i = 1; i < 5; i++) {
				let o = new view.compart.DaoJuItem();
				let itemBase = new ProtoCmd.ItemBase();
				itemBase.dwBaseID = data[i].index;
				itemBase.dwBinding = data[i].binding;
				itemBase.dwCount = data[i].num;
				o.setData(itemBase, EnumData.ItemInfoModel.SHOW_IN_MAIL);
				this["box_" + i].addChild(o);
				let name = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(data[i].index);
				this["lab_name" + i].text = name;
			}
		}
	}
}