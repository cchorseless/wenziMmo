/**Created by the LayaAirIDE*/
module view.fuli {
	export class FuLi_MainPanel extends ui.fuli.FuLi_MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.tab_fuli.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_fuli.selectedIndex = index;
				this.init_view();
			}, null, false);
			this.addEvent();
			this.init_view();
		}
		public addEvent(): void {
			this.btn_return.on(Laya.
			
			
			UIEvent.CLICK, this, () => {
				PopUpManager.checkPanel(this);
			})
		}
		public init_view(): void {
			if (this.tab_fuli.selectedIndex == 0) {
				this.img_left.visible = this.img_right.visible = false;
			} else {
				this.img_left.visible = this.img_right.visible = true;
			}
		}
	}
}