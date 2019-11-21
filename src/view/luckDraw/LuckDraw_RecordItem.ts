/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_RecordItem extends ui.luckDraw.LuckDraw_RecordItemUI {
		constructor() {
			super();
		}
		public setData(): void {

		}
		/**
		 * 
		 * @param data 我的抽奖奖励记录
		 */
		public init_myRecord(data): LuckDraw_RecordItem {
			let itemName = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + data.i)
			let cout = '' + data.n;
			this.lbl_record.text ='获得:' + itemName + 'x' + cout;
			return this;
		}
		/**
		 * 
		 * @param allRecord 全服抽奖奖励记录
		 */
		public init_allRecord(allRecord): LuckDraw_RecordItem {
			let item = allRecord.split('=')
			let itemName = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + item[1])
			this.lbl_record.text = item[0] + '获得了' + itemName;
			return this;
		}
		/**
		 * 
		 * @param name 积分记录
		 * @param item 
		 */
		public init_jifenRecord(name, item): LuckDraw_RecordItem {
			let itemName = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + item)
			this.lbl_record.text = name + '兑换了' + itemName;
			return this;
		}
		/**
		 * 在线抽奖记录
		 * @param name 
		 * @param index 
		 * @param num 
		 */
		public init_onLineDraw(name, index, num): LuckDraw_RecordItem {
			let itemName = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + index)
			this.lbl_record.text = name + ' 获得:' + itemName + 'x' + num;
			return this;
		}
		/**
		 * 幸运抽奖全服记录
		 * @param data 
		 */
		public init_LuckDraw(data): LuckDraw_RecordItem {
			let itemName = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + data.i)
			this.lbl_record.text = data.c + ' 获得:' + itemName + 'x' + data.n;
			return this;
		}
	}
}