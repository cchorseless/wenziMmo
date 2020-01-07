/**Created by the LayaAirIDE*/
module view.dialog {
	export class InfoV1Dialog extends ui.dialog.InfoV1DialogUI {
		constructor() {
			super();
		}
		public setData(lbl: Laya.Label, i): InfoV1Dialog {
			this.lbl_name.text = SheetConfig.Introduction_play.getInstance(null).NAME('' + i);
			this.lbl_des.text = SheetConfig.Introduction_play.getInstance(null).CONTENT('' + i);
			let posPoint = lbl.localToGlobal(new Laya.Point(lbl.width, lbl.height))
			let X = posPoint.x;
			let Y = posPoint.y;
			let MAX_WIDTH = Laya.stage.designWidth;
			let Max_height = Laya.stage.designHeight;
			if (X > (MAX_WIDTH / 2)) {
				this.anchorX = 1;
			} else {
				this.anchorX = 0;
			}
			if (Y > (Max_height / 2)) {
				this.anchorY = 1;
			} else {
				this.anchorY = 0;
			}
			if (i <= 6006) {
				this.x = X-40;
				this.y = Y-200;
			} else {
				this.x = X - 40;
				this.y = Y - 60;
			}
			return this;
		}
	}
}