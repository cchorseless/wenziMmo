/**Created by the LayaAirIDE*/
module view.task {
	export class Task_ChengJiuPanel extends ui.task.Task_ChengJiuPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_top.hScrollBarSkin = '';
			this.tab_top.selectHandler = Laya.Handler.create(this, (index) => {
				this.updateUI(index);
			}, null, false);
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.panel_1.vScrollBarSkin = '';
			this.vbox_1['sortItem'] = (items) => { };
			this.panel_2.vScrollBarSkin = '';
			this.vbox_2['sortItem'] = (items) => { };
			this.panel_3.vScrollBarSkin = '';
			this.vbox_3['sortItem'] = (items) => { };
			this.panel_4.vScrollBarSkin = '';
			this.vbox_4['sortItem'] = (items) => { };
			this.panel_5.vScrollBarSkin = '';
			this.vbox_5['sortItem'] = (items) => { };
			this.panel_6.vScrollBarSkin = '';
			this.vbox_6['sortItem'] = (items) => { };
			this.panel_7.vScrollBarSkin = '';
			this.vbox_7['sortItem'] = (items) => { };
			this.panel_8.vScrollBarSkin = '';
			this.vbox_8['sortItem'] = (items) => { };

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
		public updateUI(index = 0): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.TASK_GET_CHENGJIU_INFO, [index], null, this, (jsonData) => {
				console.log(jsonData)
			})
			lcp.send(pkt);
		}

	}
}