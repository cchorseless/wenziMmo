/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_GangQiBtnItem extends ui.juese.Person_GangQiBtnItemUI {
		constructor() {
			super();
		}
		public id;
		public setData(i, id): Person_GangQiBtnItem {
			this.id=id;
			//罡气
			let j = i + 1;
			this.lbl_name.text = '' + SheetConfig.mydb_effect_base_tbl.getInstance(null).NAME('' + id);
			this.btn_gangqi.skin = 'image/juese/img_gangQi_0' + j + '.png'
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.JueSe.ui_gangQi.init_update(this.id);
			})
		}
	}
}