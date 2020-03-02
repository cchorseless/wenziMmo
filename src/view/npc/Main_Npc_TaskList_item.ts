/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_Npc_TaskList_item extends ui.npc.Main_Npc_TaskList_itemUI {
		public npcID;
		public parentUI;
		constructor() {
			super();
			this.panel_task.vScrollBarSkin = '';
			this.vbox_task['sortItem'] = (items) => { };
			this.addEvent()
		}
		public addEvent() {
			this.btn_back.on(Laya.UIEvent.CLICK,this,function(){
				this.parentUI.view_npc.selectedIndex = 0;
			})
		}
		public setData(npcid, uiParent) {
			this.npcID = npcid;
			this.parentUI = uiParent;
			this.showTask();
		}
		public showTask() {
			// GameApp.GameEngine.taskInfo[EnumData.TaskType.SYSTEM];
			for (let i in GameApp.GameEngine.taskInfo) {
				let taskBase = GameApp.GameEngine.taskInfo[i];

				for (let key in taskBase) {
					let task = taskBase[key];
					let state = task.queststatus;
					if (state == 0 || state == 1) {
						if (this.npcID == task.endnpcid) {
							let o = new Main_Npc_taskinf_item();
							o.setData(1, i, task.questname, key,task)
							this.vbox_task.addChild(o);
						}
					} else if (state == -1) {
						if (this.npcID == task.beginnpcid) {
							let o = new Main_Npc_taskinf_item();
							o.setData(1, i, task.questname, key,task)
							this.vbox_task.addChild(o);
						}
					} else if (state == 2) {
						if (this.npcID == task.endnpcid) {
							let o = new Main_Npc_taskinf_item();
							o.setData(1, i, task.questname, key,task)
							this.vbox_task.addChild(o);
						}
					}
				}




			}
		}
	}
}