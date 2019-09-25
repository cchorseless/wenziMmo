/**Created by the LayaAirIDE*/
module view.dialog {
	export class JuQingEventDialog extends ui.dialog.JuQingEventDialogUI {
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
			this.div_targetDes.style.fontSize = 20;
			this.div_targetDes.innerHTML = '' + taskInfo.targetdes;
			this.div_targetDes.on(Laya.Event.LINK, this, this.goToFinishTask)
			// 任务NPC
			this.lbl_npc.text = '' + taskInfo.endnpcname;
			this.box_npc.visible = Boolean(taskInfo.endnpcname);
			// 任务进度
			switch (taskInfo.queststatus) {
				// 完成
				case EnumData.QUESTSTATUS.QUESTCOMPLETED:
				case EnumData.QUESTSTATUS.QUESTMALLCOMPLETED:
					this.lbl_jinDu.text = '任务已完成';
					this.btn_qianWang.label = '领取奖励';
					break;
				// 进行中
				case EnumData.QUESTSTATUS.QUESTDOING:
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
						pkt.funcname = 'questfinish`' + this.taskInfo.taskid;
						lcp.send(pkt)
						break;
					// 进行中
					case EnumData.QUESTSTATUS.QUESTDOING:
						this.close();
						for (let _ele of this.div_targetDes._childs) {
							if (_ele.href) {
								this.div_targetDes.event(Laya.Event.LINK, _ele.href)
							}
						}
						break;
				}
			});
		}

		/**
		 * 前去完成任务
		 * @param data 
		 */
		public goToFinishTask(data: string): void {
			console.log(data);
			console.log(data.split('|'));
			let hander = data.split('|');
			// for()
			// if(hander.length==1)
		}
	}
}