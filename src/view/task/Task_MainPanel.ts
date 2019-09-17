/**Created by the LayaAirIDE*/
module view.task {
	export class Task_MainPanel extends ui.task.Task_MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_zhiXian.vScrollBarSkin = '';
			this.vbox_zhiXian['sortItem'] = (items) => { };
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false);
			for (let i = 0; i < 3; i++) {
				this.vbox_zhiXian.addChild(new view.compart.TaskInfoItem().setData(null))
			}

			this.initUI();
			this.addEvent();
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

		public initUI(): void {
			let zhuXianInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.SYSTEM];
			if (!zhuXianInfo) {
				throw new Error('没有拉取到主线任务');
			}
			// 任务信息
			let taskInfo: ProtoCmd.stQuestInfoBase = zhuXianInfo[Object.keys(zhuXianInfo)[0]];
			// // 开始任务NPC
			// this.lbl_startNpc.text = '委托人:' + taskInfo.beginnpcname;
			// // 结束任务NPC
			// this.lbl_finishNpc.text = '交付NPC:' + taskInfo.endnpcname;
			// // 任务章节
			// this.lbl_taskCharpter.text = '任务章节' + taskInfo.questsection;
			// // 任务描述
			// this.div_taskDes.innerHTML =  taskInfo.targetdes;
			// 任务目标
			// this.lbl_taskTarget.text = '任务目标:' + taskInfo.targetdes;
		}
	}
}