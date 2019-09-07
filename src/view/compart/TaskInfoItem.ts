/**Created by the LayaAirIDE*/
module view.compart {
	export class TaskInfoItem extends ui.compart.TaskInfoItemUI {
		constructor() {
			super();
			this.addEvent();
		}
		public item: ProtoCmd.stQuestInfoBase;
		public setData(item): TaskInfoItem {
			this.item = item;
			this.img_taskInfoMore.scaleY = 0;
			this.height = this.img_taskInfo.height;
			return this
		}
		public addEvent(): void {
			this.img_taskInfo.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_selected.selected = !this.btn_selected.selected;
				this.showMore(this.btn_selected.selected);
			})
		}

		public showMore(v: boolean): void {
			if (v) {
				Laya.Tween.to(this.img_taskInfoMore, { scaleY: 1 }, 500);
				Laya.Tween.to(this, { height: this.img_taskInfo.height + this.img_taskInfoMore.height }, 500);
			}
			else {
				Laya.Tween.to(this.img_taskInfoMore, { scaleY: 0 }, 500);
				Laya.Tween.to(this, { height: this.img_taskInfo.height }, 500)
			}
		}

	}
}