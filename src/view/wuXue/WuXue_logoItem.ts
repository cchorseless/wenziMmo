/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_logoItem extends ui.wuXue.WuXue_logoItemUI {
		constructor() {
			super();
		}

		public setData(configID: string): void {
			let wuXing = SheetConfig.mydb_magic_tbl.getInstance(null).SKILLEXTRAPROP(configID);
			this.lbl_shuXing.text = LangConfig.getWuXingDes(wuXing);
		}



	}
}