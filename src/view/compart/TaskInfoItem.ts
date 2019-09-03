/**Created by the LayaAirIDE*/
module view.compart {
	export class TaskInfoItem extends ui.compart.TaskInfoItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public item: ProtoCmd.stQuestInfoBase;
		public setData(item): void {
			this.item = item;
		}
		public addEvent(): void {
			
		}

	}
}