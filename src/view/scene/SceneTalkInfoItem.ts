/**Created by the LayaAirIDE*/
module view.scene {
	export class SceneTalkInfoItem extends ui.scene.SceneTalkInfoItemUI {
		constructor() {
			super();
			this.addEvent()
		}

		public sceneTalkList = [];

		/**
		 * 添加场景对话
		 */
		public parseSceneTalk(sceneTalkList: Array<{ des: string, delay?: number, event?: Array<Array<any>> }> = this.sceneTalkList): void {
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



		public addEvent() {
			EventManage.onWithEffect(this.box_next, Laya.UIEvent.CLICK, this, () => {
				this.parseSceneTalk();
			})
		}
	}
}