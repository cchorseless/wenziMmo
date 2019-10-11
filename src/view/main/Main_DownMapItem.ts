/**Created by the LayaAirIDE*/
module view.main {
	export class Main_DownMapItem extends ui.main.Main_DownMapItemUI {
		constructor() {
			super();
			this.setData();
		}

		public setData(): void {
			this.visible = false;
			this.scaleX = this.scaleY = 0;
			this.panel_0.vScrollBarSkin = this.panel_0.hScrollBarSkin = '';
			this.addEvent();
		}

		public addEvent(): void {

		}

		public showSelf(isShow: boolean): void {
			if (isShow) {
				this.visible = true;
				Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, 300)
			}
			else {
				Laya.Tween.to(this, { scaleX: 0, scaleY: 0 }, 300, null, Laya.Handler.create(this, () => {
					this.visible = false;
				}))
			}
		}

		public initUI(): void {


		}
	}
}