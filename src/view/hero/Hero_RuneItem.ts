/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_RuneItem extends ui.hero.Hero_RuneItemUI {
		constructor() {
			super();
		}
		public setData(data): Hero_RuneItem {
			this.lbl_name.text=data;
			return this;
		}
	}
}