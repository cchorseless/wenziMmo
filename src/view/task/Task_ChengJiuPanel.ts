/**Created by the LayaAirIDE*/
module view.task {
	export class Task_ChengJiuPanel extends ui.task.Task_ChengJiuPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.btn_achieveTask.selected=true;
			this.panel_top.hScrollBarSkin = '';
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_chengjiu.selectedIndex = index;
				this.init_chengjiu(index);
			}, null, false);
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			let i = 0;
			this.init_chengjiu(i);
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
			PanelManage.openJuQingModePanel()
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
		/**
        * 成就
        * 
        */
		public init_chengjiu(i): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.TASK_achievementPanel, [i + 1], null, this, (jsonData) => {
				let keys = Object.keys(jsonData);
				i = i + 1;//成就类型
				this.vbox_0.removeChildren();
				for (let key of keys) {
					//key是成就ID
					this.vbox_0.addChild(new view.compart.TaskInfoV1Item().setData(jsonData, key,i));
				}
			})
			lcp.send(pkt);
		}

	}
}