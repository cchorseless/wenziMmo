/**Created by the LayaAirIDE*/
module view.npc {
	export class Main_npc_TaskDetail_item extends ui.npc.Main_npc_TaskDetail_itemUI {
		public curState;
		public curID;
		public curType;
		public taskInfo;
		constructor() {
			super();
			this.panel_0.hScrollBarSkin = '';
			this.hbox_0['sortItem'] = (items) => { };
		}
		public setData(taskid, name, state, type, taskInfo) {
			this.curState = state;
			this.curID = taskid;
			this.curType = type;
			this.taskInfo = taskInfo;
			let str1;
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
			// 任务奖励
			let obj = GameApp.DomUtil.parseXML(taskInfo.jiangli);
			let nodeList = obj.getElementsByTagName('j')[0].getElementsByTagName('i');
			for (let i = 0; i < nodeList.length; i++) {
				let _itemInfo = new ProtoCmd.ItemBase();
				_itemInfo.dwBaseID = parseInt('' + nodeList[i].getAttribute('id'));
				_itemInfo.dwCount = parseInt('' + nodeList[i].getAttribute('co'));
				let itemUI = new view.compart.DaoJuWithNameItem();
				itemUI.setData(_itemInfo);
				this.hbox_0.addChild(itemUI);
			}
			this.lab_taskType.text = str1;  //任务类型
			this.lab_task_Name.text = name;  //任务名字
			this.div_jinDu.style.font = "STKaiti"
			this.div_jinDu.style.fontSize = 24;
			this.div_targetDes.style.font = "STKaiti"
			this.div_targetDes.style.fontSize = 24;
			this.div_targetDes.innerHTML = '' + taskInfo.target;
			if (state == -1) {
				this.div_jinDu.innerHTML = '' + taskInfo.taskJinDu;
			}
			switch (taskInfo.queststatus) {
				// 完成
				case EnumData.QUESTSTATUS.QUESTNO:
					this.div_jinDu.innerHTML = taskInfo.taskJinDu;
					this.btn_get.label = '接受任务';
					break;
				case EnumData.QUESTSTATUS.QUESTCOMPLETED:
				case EnumData.QUESTSTATUS.QUESTMALLCOMPLETED:
					this.div_jinDu.innerHTML = '任务已完成';
					this.btn_get.label = '交付任务';
					break;
				// 进行中
				case EnumData.QUESTSTATUS.QUESTDOING:
					this.div_jinDu.innerHTML = '' + taskInfo.taskJinDu;
					this.btn_get.gray = true;
					this.btn_get.label = '交付任务';
					break;
			}

		}
		public addEvent() {
			this.btn_back.on(Laya.UIEvent.CLICK, this, function () {
				Main_TanSuoV1Dialog.self.view_npc.selectedIndex = 0;
			})
			this.btn_get.on(Laya.UIEvent.CLICK, this, function () {
				switch (this.taskInfo.queststatus) {
					case EnumData.QUESTSTATUS.QUESTNO:
						let pkt1 = new ProtoCmd.SelectTalkOptionEncoder();
						pkt1.questType = this.taskInfo.questtype;
						pkt1.showone = true;
						pkt1.funcname = 'questfinish~' + this.taskInfo.taskid;
						lcp.send(pkt1);
						Main_TanSuoV1Dialog.self.view_npc.selectedIndex = 0;
						break;
					// 完成
					case EnumData.QUESTSTATUS.QUESTCOMPLETED:
					case EnumData.QUESTSTATUS.QUESTMALLCOMPLETED:
						let pkt = new ProtoCmd.SelectTalkOptionEncoder();
						pkt.questType = this.taskInfo.questtype;
						pkt.showone = true;
						pkt.funcname = 'questfinish~' + this.taskInfo.taskid;
						lcp.send(pkt);
						Main_TanSuoV1Dialog.self.view_npc.selectedIndex = 0;
						break;
					// 进行中
					case EnumData.QUESTSTATUS.QUESTDOING:
						for (let _ele of this.div_targetDes._childs) {
							if (_ele.href) {
								this.div_targetDes.event(Laya.Event.LINK, _ele.href)
							}
						}
						Main_TanSuoV1Dialog.self.view_npc.selectedIndex = 0;
						break;
				}
			})
			this.div_targetDes.on(Laya.Event.LINK, this, this.goToFinishTask)
		}
		
		/**
		 * 前去完成任务
		 * @param data 
		 */
		public goToFinishTask(data: string): void {
			let finishHandle;// 引导完成
			// 任务完成方式
			switch (this.taskInfo.targetType) {
				// 客户端触发完成
				case EnumData.TaskSubType.CLIENTFILISH:
					finishHandle = Laya.Handler.create(this, () => {
						let pkt = new ProtoCmd.stClientFinishTask();
						pkt.setValue('dwQuestId', this.taskInfo.taskid);
						lcp.send(pkt);
					})
					break;
				// 

			}

			GameUtil.parseTaskInfo(data, finishHandle)
		}
	}
}