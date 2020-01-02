/**Created by the LayaAirIDE*/
module view.dialog {
	export class TaskDialog extends ui.dialog.TaskDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.panel_task.vScrollBarSkin = '';
			this.vbox_task['sortItem'] = (items) => { };
			this.addEvent();
			this.init_taskList();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
		/**
		 * 任务列表
		 */
		public init_taskList(): void {
			let taskList = GameApp.GameEngine.taskInfo;
			this.vbox_task.removeChildren();
			for (let taskSingle in taskList) {
				let keys = Object.keys(taskList[taskSingle])
				for (let key of keys) {
					let data = taskList[taskSingle][key];
					//威望任务不加进去
					if (parseInt(taskSingle) < 5) {
						this.vbox_task.addChild(new view.compart.TaskInfoV2Item().init_taskList(data, parseInt(taskSingle)));
					}
				}
			}
		}
	}
}