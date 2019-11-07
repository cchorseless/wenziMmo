/**Created by the LayaAirIDE*/
module view.dialog {
	export class TipsTxtDialog extends ui.dialog.TipsTxtDialogUI {
		public static allDialog = [];
		constructor() {
			super();
		}

		public setData(str): TipsTxtDialog {
			this.div_des.style.fontSize = 25;
			this.div_des.style.color = ColorUtils.white;
			this.div_des.innerHTML = str;
			return this
		}

		public onOpened(): void {
			if (TipsTxtDialog.allDialog.length > 0) {
				let lastItem: TipsTxtDialog = TipsTxtDialog.allDialog[TipsTxtDialog.allDialog.length - 1];
				if (this.y - lastItem.y < this.height) {
					this.visible = false;
				}
			}
			TipsTxtDialog.allDialog.push(this);
			this.playTween();
		}


		/**
		 * 移动
		 */
		public playTween(): void {
			if (this.visible) {
				let speed = 0.3;// 移动速度
				Laya.Tween.to(this, { y: this.y - this.height }, this.height / speed, null, Laya.Handler.create(this, () => {
					// 删掉自己
					TipsTxtDialog.allDialog.shift();
					let nextItem = TipsTxtDialog.allDialog.shift();
					if (nextItem) {
						nextItem.visible = true;
						nextItem.playTween();
					}
					Laya.Tween.to(this, { y: this.y - 200 }, 200 / speed, null, Laya.Handler.create(this, () => {
						Laya.Tween.to(this, { alpha: 0, y: this.y - 100 }, 100 / speed, null, Laya.Handler.create(this, () => {
							this.close(null, false);
						}))
					}))
				}));
			}
		}
	}
}