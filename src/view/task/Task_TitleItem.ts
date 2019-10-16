/**Created by the LayaAirIDE*/
module view.task {
	export class Task_TitleItem extends ui.task.Task_TitleItemUI {
		constructor() {
			super();
		}
		public taskInfo: ProtoCmd.stQuestInfoBase;
		public npcObj: GameObject.Npc;
		public setData(item: ProtoCmd.stQuestInfoBase, npcObj: GameObject.Npc): void {
			this.taskInfo = item;
			this.npcObj = npcObj;
			this.lbl_taskTitle.text = '' + item.questname;
			switch (this.taskInfo.queststatus) {
				//任务完成
				case EnumData.QUESTSTATUS.QUESTCOMPLETED:

					break;
			}
			this.addEvent();
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.lbl_taskTitle, Laya.Event.CLICK, this, () => {
				// 有剧情对白
				if (this.taskInfo.talkInfo) {

				}


				let pkt = new ProtoCmd.VisitNPCEncoder();
				pkt.setValue('dwtmpid', this.npcObj.tempId)
				pkt.setValue('xDes', this.npcObj.location.ncurx);
				pkt.setValue('yDes', this.npcObj.location.ncury);
				lcp.send(pkt);
			})
		}
	}
}