/**Created by the LayaAirIDE*/
module view.compart {
	export class SinglePropsItem extends ui.compart.SinglePropsItemUI {
		constructor() {
			super();
		}
		public setData(data): SinglePropsItem {
			this.div_des.style.fontSize = 22
			this.div_des.innerHTML = data;
			return this;
		}
	}
}