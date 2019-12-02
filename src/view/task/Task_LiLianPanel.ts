/**Created by the LayaAirIDE*/
module view.task {
	export class Task_LiLianPanel extends ui.task.Task_LiLianPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.btn_liLianTask.selected = true;
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_top.selectedIndex = index;
			}, null, false);
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.init_prestige();
			this.addEvent();
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
  * 威望
  * 
  */
		public init_prestige(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.TASK_prestigeQuestPanel, null, null, this, (jsonData) => {
				console.log('=====>威望威望', jsonData)
				let keys = Object.keys(jsonData.questtab);
				this.vbox_0.removeChildren();
				for (let key of keys) {
					let data = jsonData.questtab[key];
					this.vbox_0.addChild(new view.compart.TaskInfoItem().setData(data));
				}
			})
			lcp.send(pkt);
		}
	}
}