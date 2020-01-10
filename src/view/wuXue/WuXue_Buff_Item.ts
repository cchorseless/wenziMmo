/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_Buff_Item extends ui.wuXue.WuXue_Buff_ItemUI {
		constructor() {
			super();
		}
		public setData(id) {
			let icon = SheetConfig.mydb_magicbuff_tbl.getInstance(null).BUFFICON(id);
			this.img_BuffIcon.skin = 'image/common/buff/buff_icon_' + icon + '.png'
			let name = SheetConfig.mydb_magicbuff_tbl.getInstance(null).NAME(id);
			this.lab_BuffName.text = name;

		}
	}
}