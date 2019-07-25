/**Created by the LayaAirIDE*/
module view.compart {
	export class TaskInfoItem extends ui.compart.TaskInfoItemUI {
		constructor() {
			super();
			this.addEvent();
		}

		public setData(): void {

		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.TaskLayerDialog().show(true);

			})

		}

	}
}