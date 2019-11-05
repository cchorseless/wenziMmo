/**Created by the LayaAirIDE*/
module view.wuXue {
	export class WuXue_logoBgItem extends ui.wuXue.WuXue_logoBgItemUI {
		constructor() {
			super();
		}

		public addItem(node): void {
			this.img_bg.visible = false;
			this.box_view.addChild(node);
		}

		public removeItem(): void {
			this.img_bg.visible = true;
			this.box_view.removeChildAt(1);
		}
	}
}