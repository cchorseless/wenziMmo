/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJuBgItem extends ui.compart.DaoJuBgItemUI {
		constructor() {
			super();
		}
		public checkIsFull(): boolean {
			return this.numChildren === 2;
		}

		public addItem(item) {
			if (this.checkIsFull()) {
				this.removeChildAt(1);
			}
			this.addChild(item);
			item.centerX = item.centerY = 0;
		}
	}
}