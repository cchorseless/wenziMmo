/**Created by the LayaAirIDE*/
module view.compart {
	export class SinglePropsItem extends ui.compart.SinglePropsItemUI {
		constructor() {
			super();
		}
		public setData(data) {
			this.lbl_des.text = data;
		}
	}
}