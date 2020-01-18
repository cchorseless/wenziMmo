/**Created by the LayaAirIDE*/
module view.scene {
	export class SceneTalkInfoItem extends ui.scene.SceneTalkInfoItemUI {
		constructor() {
			super();

			this.setData()
		}

		public sceneTalkList = [];
		public eventInfo = [];
		// /**
		//  * 添加场景对话
		//  */
		// public parseSceneTalk2(sceneTalkList: Array<{ des: string, delay?: number, event?: Array<Array<any>> }> = this.sceneTalkList): void {

		// 	this.visible = true;
		// 	this.box_next.disabled = true;
		// 	this.sceneTalkList = sceneTalkList;
		// 	if (this.sceneTalkList.length > 0) {
		// 		let info = this.sceneTalkList.shift();
		// 		Laya.timer.frameOnce(info.delay || 1, this, () => {
		// 			this.lbl_sceneTalk.text = info.des;
		// 			this.alpha = 1;
		// 			let eventDelay = 1;
		// 			// 最后一个处理
		// 			if (this.sceneTalkList.length == 0) {
		// 				Laya.Tween.to(this, { alpha: 0 }, 1000, null, Laya.Handler.create(this, () => {
		// 					this.visible = false;
		// 					if (info.event) {
		// 						for (let evt of info.event) {
		// 							GameApp.LListener.event(evt[0], evt[1]);
		// 						}
		// 					}
		// 				}))
		// 			}
		// 			else {
		// 				if (info.event) {
		// 					for (let evt of info.event) {
		// 						GameApp.LListener.event(evt[0], evt[1]);
		// 					}
		// 				}
		// 				this.box_next.disabled = false;
		// 			}
		// 		})
		// 	}

		// }

		public setData() {
			this.panel_sceneTalk.vScrollBarSkin = '';
			this.vbox_sceneTalk['sortItem'] = (items) => { };
			this.vbox_sceneTalk.space = 5;
			this.addEvent()
		}

		public parseSceneTalk(sceneTalkList: Array<{ des: string, delay?: number, event?: Array<Array<any>> }>): void {
			for (let info of sceneTalkList) {
				if (info.event) {
					this.eventInfo = this.eventInfo.concat(info.event)
				}
			}
			this.sceneTalkList = sceneTalkList;
			Laya.timer.frameLoop(60, this, this.addTalkInfo)
		}

		public addTalkInfo() {
			let firstInfo = this.sceneTalkList.shift();
			if (firstInfo) {
				let label1 = new Laya.Label;
				label1.autoSize = true;
				label1.width = 590;
				label1.color = '#63491a';
				label1.font = 'FZXK';
				label1.fontSize = 22;
				label1.wordWrap = true;
				label1.leading = 5;
				label1.text = firstInfo.des;
				this.vbox_sceneTalk.addChild(label1);
				Laya.timer.frameOnce(1, this, () => {
					this.panel_sceneTalk.scrollTo(0, this.vbox_sceneTalk.height);
				})
			}
			else {
				for (let evt of this.eventInfo) {
					GameApp.LListener.event(evt[0], evt[1]);
				}
				// 清理计时器
				Laya.timer.clear(this, this.addTalkInfo);
			}
		}



		public addEvent() {
			EventManage.onWithEffect(this.box_next, Laya.UIEvent.CLICK, this, () => {
				// 收缩
				if (this.height > 300) {
					Laya.Tween.to(this, { height: 210 }, 200, null, Laya.Handler.create(this, () => {
						this.box_next.rotation = 0;
					}))
				}
				// 展开
				else {
					Laya.Tween.to(this, { height: 680 }, 200, null, Laya.Handler.create(this, () => {
						this.box_next.rotation = 180;
					}))
				}


			})
		}
	}
}