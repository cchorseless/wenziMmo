/**Created by the LayaAirIDE*/
module view.dialog {
	export class ItemInfoV0Dialog extends ui.dialog.ItemInfoV0DialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public itemObj: ItemBase;
		public setData(obj: ItemBase, mode = 0): ItemInfoV0Dialog {
			this.itemObj = obj;
			this.viw_model.selectedIndex = mode;
			let dwBaseID = '' + obj.dwBaseID;
			// 物品名称
			this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(dwBaseID);
			// 物品描述
			this.div_itemDes.innerHTML = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES(dwBaseID);
			// 使用等级
			let zs_level = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(dwBaseID);
			this.lbl_useLevel.text = '使用等级：' + (zs_level == 0 ? '' : '' + zs_level + '转') + SheetConfig.mydb_item_base_tbl.getInstance(null).LVNEED(dwBaseID) + '级';
			// 使用职业
			this.lbl_jobNeed.text = '职业要求:' + ['通用', '战士', '法师', '道士'][SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB(dwBaseID)];
			// 道具ICON信息赋值
			this.ui_item.initUI(obj);
			return this;
		}
		public addEvent(): void {
			// 关闭
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			});
			// 丢弃\销毁物品
			this.btn_destroy.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.SureOrCanelDialog().setData('确定要删除该物品吗？', EnumData.SureCanelModel.DELET_ITEM, this.itemObj.i64ItemID).popup(true);
			});
			// 使用
			this.btn_use.on(Laya.UIEvent.CLICK, this, () => {

			})

		}
	}
}