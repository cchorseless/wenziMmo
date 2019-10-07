/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_JingluoItem extends ui.juese.Person_JingluoItemUI {
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