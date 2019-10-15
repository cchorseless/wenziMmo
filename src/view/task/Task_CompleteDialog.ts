/**Created by the LayaAirIDE*/
module view.task {
	export class Task_CompleteDialog extends ui.task.Task_CompleteDialogUI {
		constructor() {
			super();
		}
		public taskInfo: ProtoCmd.stQuestInfoBase;
		public setData(taskInfo: ProtoCmd.stQuestInfoBase): Task_CompleteDialog {
			this.taskInfo = taskInfo;
			this.panel_0.hScrollBarSkin = '';
			this.hbox_0['sortItem'] = (items) => { };

			this.lbl_taskName.text = taskInfo.questname;
			this.lbl_taskDes.text = taskInfo.des;
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
			this.btn_sure.on(Laya.UIEvent.CLICK, this, () => {
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
				}
				this.close();

				PanelManage.openJuQingModePanel();
			})
		}
	}
}