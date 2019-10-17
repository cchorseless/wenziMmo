/**Created by the LayaAirIDE*/
module view.juese {
	export class ClothePanel extends ui.juese.Person_ClothePanelUI {
		constructor() {
			super();
			this.setData();

		}
		public setData(): void {
			// this.btn_clotheReturn.on(Laya.UIEvent.CLICK, this, () => {
			// 	PopUpManager.checkPanel(this, true, 4);
			// });
			// this.cek_clotheClose.clickHandler = Laya.Handler.create(this, () => {
			// 	if (this.cek_clotheClose.selected) {
			// 		Laya.Tween.to(this.box_clotheOpen, { scaleY: 0 }, 500, Laya.Ease.bounceOut);
			// 	}
			// 	else {
			// 		Laya.Tween.to(this.box_clotheOpen, { scaleY: 1 }, 500, Laya.Ease.bounceOut);
			// 	}
			// }, null, false);

		}

	}
}