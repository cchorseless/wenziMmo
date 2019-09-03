/**Created by the LayaAirIDE*/
module view.task {
	export class Task_MainPanel extends ui.task.Task_MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
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
		}

		public initUI(): void {
			let zhuXianInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.SYSTEM];
			if (!zhuXianInfo) {
				console.log()
				return
			}
			// 任务信息
			let taskInfo: ProtoCmd.stQuestInfoBase = zhuXianInfo[Object.keys(zhuXianInfo)[0]];
			// 开始任务NPC
			this.lbl_startNpc.text = '' + taskInfo.beginnpcname;
			// 结束任务NPC
			this.lbl_finishNpc.text = '' + taskInfo.endnpcname;
			// 任务章节
			this.lbl_taskCharpter.text = '' + taskInfo.questsection;
			// 任务描述
			this.lbl_taskDes.text=''+taskInfo.des;
			// 任务目标
			this.lbl_taskTarget.text=''+taskInfo.targetdes;



		}
	}
}