/**Created by the LayaAirIDE*/
module view.juQingMode {
	export class JuQingEventDialog extends ui.juQingMode.JuQingEventDialogUI {
		
		constructor() {
			super();
		}
		public taskInfo: ProtoCmd.stQuestInfoBase;
		public setData(taskInfo: ProtoCmd.stQuestInfoBase): JuQingEventDialog {
			this.panel_0.hScrollBarSkin = '';
			this.hbox_0['sortItem'] = (items) => { };
			this.taskInfo = taskInfo;
			// 任务名称
			this.lbl_eventName.text = '' + taskInfo.questname;
			// 任务说明
			this.lbl_eventDes.text = '' + taskInfo.des;
			// 任务目标
			this.div_targetDes.style.font = "STKaiti"
			this.div_targetDes.style.fontSize = 24;
			this.div_targetDes.innerHTML = '' + taskInfo.target;
			// 任务NPC
			this.lbl_npc.text = '' + taskInfo.endnpcname;
			this.box_npc.visible = Boolean(taskInfo.endnpcname);
			if (Boolean(taskInfo.endnpcname)) {
				this.box_target.y = 399
			} else {
				this.box_target.y = 375
			}
			// 任务进度
			this.div_jinDu.style.font = "STKaiti"
			this.div_jinDu.style.fontSize = 24;
			
			switch (taskInfo.queststatus) {
				// 完成
				case EnumData.QUESTSTATUS.QUESTCOMPLETED:
				case EnumData.QUESTSTATUS.QUESTMALLCOMPLETED:
					this.div_jinDu.innerHTML = '任务已完成';
					this.btn_qianWang.label = '领取奖励';
					this.btn_close.visible= false;
					break;
				// 进行中
				case EnumData.QUESTSTATUS.QUESTDOING:
					this.div_jinDu.innerHTML = '' + taskInfo.taskJinDu;
					this.btn_close.visible= true;
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
			this.addEvent();
			return this;
		}

		public addEvent(): void {
			// 剧情进度
			EventManage.onWithEffect(this.btn_close, Laya.UIEvent.CLICK, this, this.close);
			// 前往任务
			EventManage.onWithEffect(this.btn_qianWang, Laya.UIEvent.CLICK, this, () => {
				// 任务进度
				switch (this.taskInfo.queststatus) {
					// 完成
					case EnumData.QUESTSTATUS.QUESTCOMPLETED:
					case EnumData.QUESTSTATUS.QUESTMALLCOMPLETED:
						let pkt = new ProtoCmd.SelectTalkOptionEncoder();
						pkt.questType = this.taskInfo.questtype;
						pkt.showone = true;
						pkt.funcname = 'questfinish~' + this.taskInfo.taskid;
						lcp.send(pkt)
						break;
					// 进行中
					case EnumData.QUESTSTATUS.QUESTDOING:
						for (let _ele of this.div_targetDes._childs) {
							if (_ele.href) {
								this.div_targetDes.event(Laya.Event.LINK, _ele.href)
							}
						}
						break;
				}
				this.close();
			});
			// 点击任务前往
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