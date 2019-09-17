/**Created by the LayaAirIDE*/
module view.compart {
	export class FuBenLiLianV0Item extends ui.compart.FuBenLiLianV0ItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.img_liLianMore.scaleY = 0;
			this.height = this.img_liLian.height;
			this.addEvent();
		}
		public addEvent(): void {
			this.img_liLian.on(Laya.UIEvent.CLICK, this, () => {
				this.btn_selected.selected = !this.btn_selected.selected;
				this.showMore(this.btn_selected.selected);
			})
		}

		public showMore(v: boolean): void {
			if (v) {
				Laya.Tween.to(this.img_liLianMore, { scaleY: 1 }, 500);
				Laya.Tween.to(this, { height: this.img_liLian.height + this.img_liLianMore.height }, 500);
			}
			else {
				Laya.Tween.to(this.img_liLianMore, { scaleY: 0 }, 500);
				Laya.Tween.to(this, { height: this.img_liLian.height }, 500)
			}
		}
	}
}