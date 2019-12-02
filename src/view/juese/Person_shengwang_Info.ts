/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_shengwang_Info extends ui.juese.Person_shengwang_InfoUI {
		public taskID;
		public taskState;
		constructor() {
			super();
			this.addEvent();
		}
		public addEvent() {
			this.btn_get.on(Laya.UIEvent.CLICK, this, function () {
				switch (this.taskState) {
					case -1:
						let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.recvivePrestigeQuest, [this.taskID])
						lcp.send(pkt);
						break;
					case 0: case 1:
						let pkt1 = new ProtoCmd.QuestClientData().setString(ProtoCmd.finishPrestigeQuestByRmb, [this.taskID])
						lcp.send(pkt1);
						break
					case 2:
						let pkt2 = new ProtoCmd.QuestClientData().setString(ProtoCmd.finishPrestigeQuest, [this.taskID])
						lcp.send(pkt2);
						break
				}

			})
			this.btn_go.on(Laya.UIEvent.CLICK, this, function () {
				return;
			})
		}
		public setData(data) {
			this.lab_name.text = data.questdbname;
			this.lab_aim.text = data.questdbtargetdesc;
			let numArr = this.getId(data.szquestrewards)
			// this.html_aim.innerHTML = data.questdbtargetdesc;
			this.lab_exp.text = numArr[0] + "经验";
			this.lab_weiwang.text = numArr[1] + "威望";
			this.lab_title_weiwang.text = data.score + "威望积分";
			this.taskID = data.questid;
			this.lab_yuanbao.text = data.needrmb + '';
			this.taskState = data.status;
			this.showBtnState();
		}
		public showBtnState() {
			switch (this.taskState) {
				case -1:
					this.box_showState.visible = false;
					this.btn_get.label = "接受任务"
					break;
				case 0: case 1:
					this.box_showState.visible = true;
					this.btn_get.label = "立即完成"
					break
				case 2:
					this.box_showState.visible = false;
					this.btn_get.label = "领取奖励"
					break
				case 3:
					this.box_showState.visible = false;
					this.btn_get.label = "已完成"
					this.btn_get.disabled = true;
					break
			}
		}
		public getId(str): void {
			let numArr = str.match(/co=\'\d+\'/g)
			let num = numArr.map(item => {
				return parseInt(item.split("='")[1])
			})
			return num;

		}
	}
}