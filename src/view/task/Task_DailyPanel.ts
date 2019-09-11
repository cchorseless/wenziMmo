/**Created by the LayaAirIDE*/
module view.task {
	export class Task_DailyPanel extends ui.task.Task_DailyPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.panel_1.vScrollBarSkin = '';
			this.vbox_1['sortItem'] = (items) => { };
			this.panel_2.vScrollBarSkin = '';
			this.vbox_2['sortItem'] = (items) => { };
			this.panel_3.vScrollBarSkin = '';
			this.vbox_3['sortItem'] = (items) => { };
			for (let i = 0; i < 15; i++) {
				this.vbox_0.addChild(new view.compart.TaskInfoV0Item)
				this.vbox_1.addChild(new view.compart.TaskInfoV0Item())
				this.vbox_2.addChild(new view.compart.TaskInfoV0Item())
				this.vbox_3.addChild(new view.compart.TaskInfoV0Item())
			}
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false);

			this.addEvent()
		}
		public addEvent(): void {
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PopUpManager.showPanel(PanelManage.JuQingMode);
			});

			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});

			this.btn_achieveTask.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTask_ChengJiuPanel()
			});

			this.btn_dailyTask.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTask_DailyPanel()
			});

			this.btn_liLianTask.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTask_LiLianPanel()
			});
			this.btn_juQingTask.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTask_MainPanel()
			});
		}

		public getPageInfo(index): void {

		}
	}
}