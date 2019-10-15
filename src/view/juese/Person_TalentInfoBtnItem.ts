/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_TalentInfoBtnItem extends ui.juese.Person_TalentInfoBtnItemUI {
		constructor() {
			super();
		}
		public setData(id): Person_TalentInfoBtnItem {
			this.lbl_name.text = ''+SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + id);
			this.addEvent(id);
			return this;
		}
		public addEvent(id): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				
			})
		}
	}
}