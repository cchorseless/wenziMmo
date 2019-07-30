/**Created by the LayaAirIDE*/
module view.compart {
	export class JuQingTitleItem extends ui.compart.JuQingTitleItemUI {
		constructor() {
			super();
		}

		public setData(data): JuQingTitleItem {
			this.lbl_charpterCount.text = '' + data;
			return this;
		}
	}
}