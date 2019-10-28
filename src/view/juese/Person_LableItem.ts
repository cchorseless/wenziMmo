/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_LableItem extends ui.juese.Person_LableItemUI {
		constructor() {
			super();
		}
		public setData(data): Person_LableItem {
			if (data == undefined) {
				this.lbl_shuxing.text = '';
			}
			else {
				this.lbl_shuxing.text = '' + data;
			}
			return this;
		}
	}
}