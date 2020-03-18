/**Created by the LayaAirIDE*/
module view.dialog {
	export class TaskDialog extends ui.dialog.TaskDialogUI {
		constructor() {
			super();
			this.group = 'TaskDialog';
		}
		public setData(): TaskDialog {
			this.panel_task.vScrollBarSkin = '';
			this.vbox_task['sortItem'] = (items) => { };
			this.addEvent();
			this.showContent(0)
			return this;
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			this.tab_task.on(Laya.UIEvent.CLICK, this, function () {
				this.vs_show.selectedIndex = this.tab_task.selectedIndex;
				this.img_title.skin = 'image/task/font_' + this.tab_task.selectedIndex + '.png'
				this.showContent(this.tab_task.selectedIndex);
			})
			// this.tab_task.selectHandler = Laya.Handler.create(this, (index) => {

			// })
		}
		public showContent(id) {
			// this.img_title.skin = 'image/task/font_'+id+'.png'
			switch (id) {
				case 0:
					this.init_taskList();
					break;
				case 1:
					this.ui_action.setData();
					break;
				case 2:
					this.ui_chengjiu.setData();
					break;
			}

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