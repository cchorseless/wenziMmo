/**Created by the LayaAirIDE*/
module view.compart {
	export class Person_InfoItem extends ui.compart.Person_InfoItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.addEvent();
		}
		public addEvent(): void {
			this.img_zhuangBan.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openClothePanel();

			})
		}
	}
}