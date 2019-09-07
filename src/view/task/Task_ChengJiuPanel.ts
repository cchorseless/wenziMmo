/**Created by the LayaAirIDE*/
module view.task {
	export class Task_ChengJiuPanel extends ui.task.Task_ChengJiuPanelUI {
		constructor() {
			super();
		}
		public setData(): void {

			this.panel_0.hScrollBarSkin = '';
			this.tab_0.labels = '传奇生涯,累计登录,角色成长,降妖除魔,强化装备,魂石天赋,罡气护体,龙魂血盾,隐藏成就';
			this.updateUI();
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.updateUI(index);
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
		public updateUI(index = 0): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.TASK_GET_CHENGJIU_INFO, [index], null, this, (jsonData) => {
				console.log(jsonData)
			})
			lcp.send(pkt);
		}

	}
}