/**Created by the LayaAirIDE*/
module view.compart {
	export class ZhiNan_wuXueItem extends ui.compart.ZhiNan_wuXueItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_top.selectedIndex = index;
			}, null, false);
		}
	}
}