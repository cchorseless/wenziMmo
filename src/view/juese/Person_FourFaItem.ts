/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_FourFaItem extends ui.juese.Person_FourFaItemUI {
		constructor() {
			super();

		}
		public func_id = 17;// 功能ID编号
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