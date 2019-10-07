/**Created by the LayaAirIDE*/
module view.zhiNan {
	export class ZhiNan_wuXueItem extends ui.zhiNan.ZhiNan_wuXueItemUI {
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