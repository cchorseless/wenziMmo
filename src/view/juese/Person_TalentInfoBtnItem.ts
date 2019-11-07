/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_TalentInfoBtnItem extends ui.juese.Person_TalentInfoBtnItemUI {
		constructor() {
			super();
		}
		public setData(id): Person_TalentInfoBtnItem {
			this.lbl_name.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + id);
			this.btn_talent.skin = 'image/common/daoju/itemicon_' + id + '.png';
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.InfoV0Dialog().popup();
			})
		}
	}
}