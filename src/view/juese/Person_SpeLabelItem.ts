/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_SpeLabelItem extends ui.juese.Person_SpeLabelItemUI {
		constructor() {
			super();
		}
		public id;
		public setData(configID) {
			this.id=configID;
			let imgRes = SheetConfig.Label.getInstance(null).GRADE(configID);
			this.img_bg.skin = 'image/common/tab_rw_0' + imgRes + '.png';
			this.lbl_des.text = SheetConfig.Label.getInstance(null).NAME(configID);
			this.addEvent();
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.PlayerTagDialog().setData(this.id).popup(true);
			})
		}
	}
}