/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_shengwangDialog extends ui.juese.Person_shengwangDialogUI {
		public boxState1 = false;
		public boxState2 = false;
		public boxState3 = false;
		public boxState4 = true;
		constructor() {
			super();
			this.panel_item.vScrollBarSkin = '';
			this.addEvent();
			this.getData()
		}
		public addEvent() {
			GameApp.LListener.on(ProtoCmd.TASK_prestigeQuestPanel, this, (data) => {
				this.setData(data)
			})
			this.btn_close.on(Laya.UIEvent.CLICK, this, function () {
				this.close();
			})
			for (let i = 1; i < 5; i++) {
				this["box_" + i].on(Laya.UIEvent.CLICK, this, function () {
					if (this["boxState" + i]) {
						// getRewardByPrestigeScore
						let pkt = new ProtoCmd.QuestClientData().setString(ProtoCmd.getRewardByPrestigeScore, [i])
						lcp.send(pkt);
					} else {
						TipsManage.showTips("威望值未达到");
						return;
					}
				})
			}

		}
		public getData() {
			let pkt34 = new ProtoCmd.QuestClientData().setString(ProtoCmd.TASK_prestigeQuestPanel, null)
			lcp.send(pkt34);
		}
		public setData(data) {
			this.vbox_item['sortItem'] = (items) => { };
			this.vbox_item.removeChildren();
			this.lbl_num.text = data.score;
			for (let i in data.questtab) {
				let o = new juese.Person_shengwang_Info();
				o.setData(data.questtab[i])
				o.y = (parseInt(i) - 1) * (o.height + 15)
				this.vbox_item.addChild(o);
			}
			for (let i in data.statustab) {
				if (data.statustab[i].status == 0) {
					this["box_" + i].skin = "image/common/box" + i + "_close.png"
					this["boxState" + i] = false;
				} else if (data.statustab[i].status == 1) {
					this["box_" + i].skin = "image/common/box" + i + "_close.png"
					this["boxState" + i] = true;
				} else if (data.statustab[i].status == 2) {
					this["box_" + i].skin = "image/common/box" + i + "_open.png"
					this["boxState" + i] = false;
				}
				this["lab_boxNum" + i].text = data.statustab[i].score + "";
			}
			this.img_socre.width = (data.score/800) * this.img_base.width;

		}
		public destroy(e = true) {
			GameApp.LListener.offCaller(ProtoCmd.TASK_prestigeQuestPanel, this)
			super.destroy(e)
		}
	}
}