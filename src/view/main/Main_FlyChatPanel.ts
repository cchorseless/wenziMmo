/**Created by the LayaAirIDE*/
module view.main {
	export class Main_FlyChatPanel extends ui.main.Main_FlyChatPanelUI {
		constructor() {
			super();
			this.addEvent();
		}
		public addEvent() {

		}
		public showFlyChatMsg(type, msgStr, name) {
			let temp = GameApp.MainPlayer.chatStatus;
			for (let i in temp) {
				if (!temp[i].status && parseInt(i) == type) {
					return;
				} else if (temp[i].status && parseInt(i) == type) {
					let hasChild = 0;
					let arr = [
						[0, this.hbox_0.numChildren],
						[1, this.hbox_1.numChildren],
						[2, this.hbox_2.numChildren],
						[3, this.hbox_3.numChildren],
						[4, this.hbox_4.numChildren]
					]
					arr.sort(function (a, b) {
						return (a[1] * 10 + a[0]) - (b[1] * 10 + b[0]);
					})
					let p = arr[0][0]
					let o = new Main_flyChatInfo();
					o.setData(type, msgStr, name)
					this['hbox_' + p].addChild(o);
					this['hbox_' + p].width += o.width;
					let num = arr[0][1];
					if (num == 0) {
						this['hbox_' + p].x = 640;
						this['hbox_' + p].width = 0;
					}
					let posX = 0;
					for (let i = 0; i < num; i++) {
						posX += this['hbox_' + p].getChildAt(i).width + 20
					}
					o.x = posX;
					this.moveHbox(p, o)
				}
			}

		}
		public moveHbox(id, obj) {
			// this['hbox_' + id].x = 640;
			let base = this['hbox_' + id]
			Laya.Tween.to(base, { x: this['hbox_' + id].width * (-1) }, 3000, null, Laya.Handler.create(this, function () {
				base.removeChild(obj)
				base.width -= obj.width;
			}))
		}
	}
}