/**Created by the LayaAirIDE*/
module view.compart {
	export class HuiShouItem extends ui.compart.HuiShouItemUI {
		constructor() {
			super();
		}
		public hasInit = false;
		public setData(): void {
			if (this.hasInit) return;
			this.hasInit = true;
			this.initUI();
			this.addEvent();

			
		}

		public initUI(): void {


		}
		public addEvent(): void {

		}
	}
}