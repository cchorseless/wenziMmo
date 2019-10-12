/**Created by the LayaAirIDE*/
module view.task {
	export class Task_CompleteDialog extends ui.task.Task_CompleteDialogUI {
		constructor() {
			super();
			this.addEvent();
		}

		public addEvent(): void {
			this.btn_sure.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
				PanelManage.openJuQingModePanel();
			})
		}
	}
}