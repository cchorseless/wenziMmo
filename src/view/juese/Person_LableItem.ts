/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_LableItem extends ui.juese.Person_LableItemUI {
		constructor() {
			super();
		}
		public setData(data): Person_LableItem {
			this.lbl_shuxing.text=''+data;
			return this;
		}
	}
}