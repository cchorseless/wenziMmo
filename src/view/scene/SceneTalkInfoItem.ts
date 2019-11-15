/**Created by the LayaAirIDE*/
module view.scene {
	export class SceneTalkInfoItem extends ui.scene.SceneTalkInfoItemUI {
		constructor() {
			super();
			this.addEvent()
		}

		public sceneTalkList = [];
		public eventInfo = [];
		/**
		 * 添加场景对话
		 */
		public parseSceneTalk2(sceneTalkList: Array<{ des: string, delay?: number, event?: Array<Array<any>> }> = this.sceneTalkList): void {

			this.visible = true;
			this.box_next.disabled = true;
			this.sceneTalkList = sceneTalkList;
			if (this.sceneTalkList.length > 0) {
				let info = this.sceneTalkList.shift();
				Laya.timer.frameOnce(info.delay || 1, this, () => {
					this.lbl_sceneTalk.text = info.des;
					this.alpha = 1;
					let eventDelay = 1;
					// 最后一个处理
					if (this.sceneTalkList.length == 0) {
						Laya.Tween.to(this, { alpha: 0 }, 1000, null, Laya.Handler.create(this, () => {
							this.visible = false;
							if (info.event) {
								for (let evt of info.event) {
									GameApp.LListener.event(evt[0], evt[1]);
								}
							}
						}))
					}
					else {
						if (info.event) {
							for (let evt of info.event) {
								GameApp.LListener.event(evt[0], evt[1]);
							}
						}
						this.box_next.disabled = false;
					}


				})
			}

		}


		public parseSceneTalk(sceneTalkList: Array<{ des: string, delay?: number, event?: Array<Array<any>> }>): void {
			this.lbl_sceneTalk.text = '';
			this.lbl_sceneTalk.leading = 10;
			for (let info of sceneTalkList) {
				this.lbl_sceneTalk.text += info.des + '\n';
				if (info.event) {
					this.eventInfo = this.eventInfo.concat(info.event)
				}
			}
			this.box_next.disabled = false;
			this.box_next.visible = false;
			this.img_mask.height = 0;
			this.alpha = 0;
			this.visible = true;
			Laya.Tween.to(this, { alpha: 1 }, 2000, null, Laya.Handler.create(this, () => {
				Laya.Tween.to(this.img_mask, { height: this.lbl_sceneTalk.displayHeight }, 10000, null, Laya.Handler.create(this, () => {
					this.box_next.visible = true;
				}))
			}))
		}


		public addEvent() {
			EventManage.onWithEffect(this.box_next, Laya.UIEvent.CLICK, this, () => {
				this.box_next.disabled = true;
				// this.parseSceneTalk();
				Laya.Tween.to(this, { alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
					this.visible = false;
					for (let evt of this.eventInfo) {
						GameApp.LListener.event(evt[0], evt[1]);
					}

				}))

			})
		}
	}
}