/**Created by the LayaAirIDE*/
module view.compart {
	export class SinglePropsItem extends ui.compart.SinglePropsItemUI {
		constructor() {
			super();
		}
		public setData(des): SinglePropsItem {
				let data = des.split('+');
				this.div_des.style.fontSize = 22;
				if (data[1]) {
					this.div_des.innerHTML = data[0] + ':' + data[1];
				} else {
					this.div_des.innerHTML = data[0];
				}
			return this;
		}
	}
}