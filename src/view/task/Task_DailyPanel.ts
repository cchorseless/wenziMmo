/**Created by the LayaAirIDE*/
module view.task {
	export class Task_DailyPanel extends ui.task.Task_DailyPanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.btn_dailyTask.selected = true;
			this.panel_1.vScrollBarSkin = '';
			this.vbox_1['sortItem'] = (items) => { };
			this.addEvent();
			this.init_daily();
		}
		public addEvent(): void {
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel()
			});

			this.btn_changeMode.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
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
		/**
		 * 每日
		 * 
		 */
		public init_daily(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.TASK_DailyTaskClientOpen, null, null, this, (jsonData: { any }) => {
				let keys = Object.keys(jsonData);
				for (let key of keys) {
					let data = jsonData[key];
					this.vbox_1.addChild(new view.compart.TaskInfoV0Item().daily(data));
				}
			})
			lcp.send(pkt);
		}
	}
}