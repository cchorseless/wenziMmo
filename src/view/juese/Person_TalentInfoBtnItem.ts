/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_TalentInfoBtnItem extends ui.juese.Person_TalentInfoBtnItemUI {
		constructor() {
			super();
		}
		public setData(id): Person_TalentInfoBtnItem {
			
			// this.lbl_name.text = '' + SheetConfig.mydb_effect_base_tbl.getInstance(null).NAME('' + id);
			this.addEvent(id);
			console.log('===>xiajijijij',id)
			return this;
		}
		public addEvent(id): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.JueSe.ui_talent.init_xiajeshuxing(id);
			})
		}
	}
}