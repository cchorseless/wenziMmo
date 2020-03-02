/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_Npc_taskinf_item extends ui.npc.Main_Npc_taskinf_itemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public taskState ;
		public taskType;
		public taskName;
		public taskID;
		public taskInfo;
		public stateColor = [['#38ad32', '#ac6bbe', '#d48d48'], ['可接受', '未完成', '可交付']]
		/**
		 * 
		 * @param state   0:待接受  1：进行中  2：可交付
		 * @param type    4 任务类型，0=主线，1=日常，2=历练  10 =万事通
		 * @param name    任务名字
		 * @param id      任务ID
		 * @param taskinfo      任务
		 */
		public setData(state, type, name,id,taskinfo) {
			this.taskType= type;
			this.taskState = state;
			this.taskName = name;
			this.taskID = id;
			this.taskInfo = taskinfo;
			let str1;
			this.lab_task_State.color = this.stateColor[0][state];
			this.html_detail.style.font = 'STKaiti';
			this.html_detail.style.fontSize = 22;
			switch (type) {
				case 0:
					str1 = '[主线]'
					break;
				case 1:
					str1 = '[日常]'
					break;
				case 2:
					str1 = '[历练]'
					break;
			}

			if (state == 0) {
				this.lab_task_State.text = '!';
				this.html_detail.innerHTML = "<span style='color:#000000;'>" + str1 + "</span>"
					+ "<span style='color:#63491a;'>" + name + "</span>"
					+ "<span style='color:#38ad32;'>(" + this.stateColor[1][state]; + ")</span>"
			} else if (state == 1) {
				this.lab_task_State.text = '?';
				this.html_detail.innerHTML = "<span style='color:#000000;'>" + str1 + "</span>"
					+ "<span style='color:#63491a;'>" + name + "</span>"
					+ "<span style='color:#ac6bbe;'>(" + this.stateColor[1][state]; + ")</span>"
			} else if (state == 2) {
				this.lab_task_State.text = '?';
				this.html_detail.innerHTML = "<span style='color:#000000;'>" + str1 + "</span>"
					+ "<span style='color:#63491a;'>" + name + "</span>"
					+ "<span style='color:#d48d48;'>(" + this.stateColor[1][state]; + ")</span>"
			}
		}
		public addEvent(){
			this.on(Laya.UIEvent.CLICK,this,function(){
				Main_TanSuoV1Dialog.self.ui_task_detail.setData(this.taskID,this.taskName,this.taskState,this.taskType,this.taskInfo)
				Main_TanSuoV1Dialog.self.view_npc.selectedIndex = 7;
			})
		}
	}
}