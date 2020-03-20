/**Created by the LayaAirIDE*/
module view.npc {
	export class NpcTalkInfoItem extends ui.npc.NpcTalkInfoItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public talkList = [];
		public curTalkInfo: { npcid: any, des: string, delay?: number, stop?: boolean, event?: Array<any> };
		/**
		 * 解析对白
		 * @param talkList 
		 */
		public parseTalkList(talkList: Array<any> = this.talkList): void {
			this.talkList = talkList;
			this.curTalkInfo = this.talkList.shift();
			if (this.curTalkInfo) {
				this.lbl_npcSay.text = '';
				let npcID = '' + this.curTalkInfo.npcid;
				this.lbl_jumpTalk.text = '跳过对白';
				// 有延时
				Laya.timer.frameOnce(this.curTalkInfo.delay || 1, this, () => {
					// 显示自己
					if (npcID == '1') {
						this.box_selfAvatar.visible = true;
						this.box_npcAvatar.visible = false;
					}
					else {
						// 半身像
						this.img_npcHalf.skin = PathUtil.getNpcHalfPath(SheetConfig.mydb_npcgen_tbl.getInstance(null).ICON_NUMBER(npcID));
						// 名字
						this.lbl_npcName.text = '' + SheetConfig.mydb_npcgen_tbl.getInstance(null).NAME(npcID);
						this.box_selfAvatar.visible = false;
						this.box_npcAvatar.visible = true;
					}
					// 添加字
					Laya.timer.frameLoop(5, this, this.updateTalkLabel);
					this.visible = true;
				})
			}
			else {
				this.visible = false;
			}
		}

		/**
  		 * 添加剧情对白
  		 */
		public updateTalkLabel(): void {
			if (this.curTalkInfo == null) {
				Laya.timer.clear(this, this.updateTalkLabel);
				return
			}
			// 对白结束
			if (this.curTalkInfo.des == '') {
				this.lbl_jumpTalk.text = '点击继续';
				Laya.timer.clear(this, this.updateTalkLabel);
				return
			}
			this.lbl_npcSay.text += this.curTalkInfo.des.substr(0, 1);
			this.curTalkInfo.des = this.curTalkInfo.des.substr(1);
		}


		public addEvent() {
			// 跳过对白
			this.on(Laya.UIEvent.CLICK, this, () => {
				// 有对白跳过对白
				if (this.curTalkInfo.des) {
					this.lbl_npcSay.text += this.curTalkInfo.des.substr(1);
					this.curTalkInfo.des = '';
				}
				// 没有对白
				else {
					// 暂停
					if (this.curTalkInfo.stop) {
						this.visible = false;
					}
					// 有事件抛出事件
					if (this.curTalkInfo.event) {
						// 事件
						let eventInfo = this.curTalkInfo.event;
						for (let evet of eventInfo) {
							GameApp.LListener.event(evet[0], evet[1])
						}
						this.curTalkInfo.event = null;
					}
					else {
						this.parseTalkList();
					}
				}
			});
		}
	}
}