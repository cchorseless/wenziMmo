/**Created by the LayaAirIDE*/
module view.fuli {
	export class FuLi_lableItem extends ui.fuli.FuLi_lableItemUI {
		constructor() {
			super();
		}
		public setData(data): void {
			if (data.name) {
				let name = data.name.split(']')
				if (name[1] !== undefined) {
					this.lbl_lable.text = name[1] + '(可找回' + data.cnt + '次)';
				}
				else {
					this.lbl_lable.text = name[0] + '(可找回' + data.cnt + '次)';
				}
			}


		}
	}
}