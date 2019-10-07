/**Created by the LayaAirIDE*/
module view.compart {
	export class TipsJianTouItem extends ui.compart.TipsJianTouItemUI {
		constructor() {
			super();
		}

		public showSelf(btn: Laya.Button, mode = 0): void {
			// 旋转方向
			this.img_jianTou.rotation = mode * 90;
			// 位置
			let pt = new Laya.Point(btn.width / 2, btn.height / 2);
			let stagePoint = btn.localToGlobal(pt);
			switch (mode) {
				// 横向在右
				case 0:
					console.log("横向向右")
					this.pos(stagePoint.x + 100, stagePoint.y);
					// EffectUtils.playShakeX(this.box_view, 20, 150, 5, () => {
					// 	this.removeSelf();
					// });
					break;
				// 竖向在下
				case 1:
					console.log('竖直在下')
					this.pos(stagePoint.x, stagePoint.y + 100);
					// EffectUtils.playShakeY(this.box_view, 20, 150, 5, () => {
					// 	this.removeSelf();
					// });
					break;
				// 横向在左
				case 2:
					console.log('横向在左')
					this.pos(stagePoint.x - 100, stagePoint.y);
					// EffectUtils.playShakeX(this.box_view, 20, 150, 5, () => {
					// 	this.removeSelf();
					// });
					break;
				// 竖向在上
				case 3:
					console.log('竖直在上');
					this.pos(stagePoint.x, stagePoint.y - 100);
					// EffectUtils.playShakeY(this.box_view, 20, 150, 5, () => {
					// 	this.removeSelf();
					// });
					break;
			}
			// EffectUtils.playBlinkEffect(this, 200, 5, () => { this.removeSelf() });
			EffectUtils.playScaleEffect(btn, 150, 4);
			// 按钮添加监听
			btn.once(Laya.UIEvent.CLICK, this, () => { this.removeSelf() })
			// 添加到舞台
			Laya.stage.addChild(this);
		}
	}
}