/**Created by the LayaAirIDE*/
module view.compart {
	export class Person_JingluoItem extends ui.compart.Person_JingluoItemUI {
		constructor() {
			super();
		}
		public hasInit = false;// 初始化自己
		public setData(): void {
			if (this.hasInit) { return };
			this.hasInit = true;
			this.addEvent();
		}
		public addEvent(): void {

		}
	}
}