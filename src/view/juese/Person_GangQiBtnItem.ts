/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_GangQiBtnItem extends ui.juese.Person_GangQiBtnItemUI {
		constructor() {
			super();
		}
		public setData(j): Person_GangQiBtnItem {
			//罡气
			this.lbl_name.text = '' + j;
			this.addEvent(j);
			return this;
		}
		public addEvent(j): void {
			this.on(Laya.UIEvent.CLICK, this, () => {

			})
		}
	}
}