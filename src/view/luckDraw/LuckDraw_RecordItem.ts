/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_RecordItem extends ui.luckDraw.LuckDraw_RecordItemUI {
		constructor() {
			super();
		}
		public setData(data): LuckDraw_RecordItem {
			this.lbl_record.text='';
			let itemName = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + data.i)
			let cout = '' + data.n;
			this.lbl_record.text =  GameApp.MainPlayer.objName + '获得了' + cout + '个' + itemName;
			return this;
		}
	}
}