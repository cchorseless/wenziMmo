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
		/**
		 * 获取道具数量
		 */
		public getItemCount(): number {
			let count = 0;
			for (let child of this.box_all._childs) {
				if (child.checkIsFull()) {
					count += 1;
				}
			}
			return count;
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