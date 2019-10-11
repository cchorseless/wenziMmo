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
			// 更新小地图中自己的位置
			if (isShow) {
				this.visible = true;
				Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, 300);
				this.updateUI();
			}
			else {
				Laya.Tween.to(this, { scaleX: 0, scaleY: 0 }, 300, null, Laya.Handler.create(this, () => {
					this.visible = false;
				}))
			}
		}
		public findRoomButton(roomID): Laya.Button {
			return this.panel_0.getChildAt(0)['btn_' + roomID]
		}

		public updateUI() {
			let map: any = this.panel_0.getChildAt(0);
			let img_selfOn: Laya.Image = map.img_selfOn;
			let targgetBtn: Laya.Button = map['btn_' + GameApp.MainPlayer.roomId];
			if (img_selfOn && targgetBtn) {
				img_selfOn.anchorX = img_selfOn.anchorY = 0.5;
				img_selfOn.width = targgetBtn.width;
				img_selfOn.height = targgetBtn.height;
				img_selfOn.pos(targgetBtn.x, targgetBtn.y)
			}
		}

	}
}