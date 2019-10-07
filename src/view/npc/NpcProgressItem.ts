/**Created by the LayaAirIDE*/
module view.npc {
	export class NpcProgressItem extends ui.npc.NpcProgressItemUI {
		constructor() {
			super();
		}
		public closeHandler: Laya.Handler;
		public setData(title: string, time: number): NpcProgressItem {
			this.lbl_title.text = title;
			this.img_jinDu.width = 100;
			Laya.Tween.to(this.img_jinDu, { width: 500 }, time, Laya.Ease.sineInOut, Laya.Handler.create(
				this, () => {
					this.removeSelf();
					if (this.closeHandler) {
						this.closeHandler.run();
					}
				}
			))
			return this;
		}


		public addEvent(): void {

		}
	}
}