/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJuGroupItem extends ui.compart.DaoJuGroupItemUI {
		constructor() {
			super();
		}

		public checkIsFull(): boolean {
			for (let child of this.box_all._childs) {
				if (!child.checkIsFull()) {
					return false
				}
			}
			return true
		}

		public addItem(item): void {
			for (let child of this.box_all._childs) {
				if (!(child as view.compart.DaoJuBgItem).checkIsFull()) {
					child.addItem(item);
					break
				}
			}
		}
	}
}