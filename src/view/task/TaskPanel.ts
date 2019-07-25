/**Created by the LayaAirIDE*/
module view.task {
	export class TaskPanel extends ui.task.TaskPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_left.vScrollBarSkin = '';
			this.panel_right.vScrollBarSkin = '';
			this.vbox_right['sortItem'] = (items) => { };

			for (let i = 0; i < 10; i++) {
				this.vbox_right.addChild(new view.compart.TaskInfoItem());
			}

		}
	}
}