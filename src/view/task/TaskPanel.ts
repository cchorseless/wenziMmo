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
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
						PopUpManager.showPanel(PanelManage.JuQingMode);
			})
			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});
		}
	}
}