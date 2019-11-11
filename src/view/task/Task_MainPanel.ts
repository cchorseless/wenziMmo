/**Created by the LayaAirIDE*/
module view.task {
	export class Task_MainPanel extends ui.task.Task_MainPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.btn_juQingTask.selected = true;
			this.panel_zhiXian.vScrollBarSkin = '';
			this.vbox_zhiXian['sortItem'] = (items) => { };
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false);
			for (let i = 0; i < 3; i++) {
				this.vbox_zhiXian.addChild(new view.compart.TaskInfoItem())
			}

			this.initUI();
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

		public initUI(): void {
			let zhuXianInfo = GameApp.GameEngine.taskInfo[EnumData.TaskType.SYSTEM];
			if (!zhuXianInfo) {
				this.box_null.visible = true;
				throw new Error('没有拉取到主线任务');
			}
			else {
				this.box_null.visible = false;
				// 任务信息
				let taskInfo: ProtoCmd.stQuestInfoBase = zhuXianInfo[Object.keys(zhuXianInfo)[0]];
				// 任务章节
				this.lbl_taskCharpter.text = '任务章节' + taskInfo.questname;
				//任务进度
				this.div_progress.innerHTML = '' + taskInfo.taskJinDu;
				
				var str = taskInfo.jiangli;
				var numArr = str.match(/\d+/g)
				
			}
			// 开始任务NPC
			// this.lbl_startNpc.text = '委托人:' + taskInfo.beginnpcname;
			// 结束任务NPC
			// this.lbl_finishNpc.text = '交付NPC:' + taskInfo.endnpcname;
			// 任务描述
			// this.div_taskDes.innerHTML =  taskInfo.targetdes;
			// 任务目标
			// this.lbl_taskTarget.text = '任务目标:' + taskInfo.targetdes;
			//任务说明
			this.div_des.style.fontSize = 22;
			this.div_des.style.color = '#63491a';
			// this.div_des.innerHTML = '任务目标:' + taskInfo.targetdes;

		}
	}
}