/**Created by the LayaAirIDE*/
module view.compart {
	export class Person_InfoItem extends ui.compart.Person_InfoItemUI {
		constructor() {
			super();
			this.setData();
			this.addEvent();
		}
		public setData(): void {

			
		}
		public addEvent(): void {
			this.img_zhuangBan.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openClothePanel();
			})
			 this.box_birthEnter.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.PersonBirthDialog().popup(true);
			})
			 this.box_nameEnter.on(Laya.UIEvent.CLICK, this, () => {
					new view.dialog.PersonNameDialog().popup(true);
			})
		}
	}
}