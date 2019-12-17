/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_GangQiBtnItem extends ui.juese.Person_GangQiBtnItemUI {
		constructor() {
			super();
		}
		public type;
		public id;
		public index;
		public setData(i, id, type): Person_GangQiBtnItem {
			this.btn_select.visible = false;
			this.type = type;
			this.id = id;
			//罡气
			let j = i + 1;
			this.index = j;
			// this.lbl_name.text = '' + SheetConfig.mydb_effect_base_tbl.getInstance(null).NAME('' + id);
			this.btn_gangqi.skin = 'image/common/img_gangQi_0' + j + '.png'
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				if (this.type == 0) {
					PanelManage.JueSe.ui_gangQi.init_update(this.id);
				} else {
					PanelManage.DiZi.ui_gangqi.init_update(this.id);
				}
			})
		}
	}
}