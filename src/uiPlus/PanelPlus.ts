/**
* name 
*/
module uiPlus {
	export class PanelPlus extends Laya.Panel {
		constructor() {
			super();
		}
		public repeatX: number = null;
		public repeatY: number = null;
		public spaceX: number = 0;
		public spaceY: number = 0;
		public initSelf(repeatX, repeatY, spaceX, spaceY): PanelPlus {
			this.repeatX = repeatX;
			this.repeatY = repeatY;
			this.spaceX = spaceX;
			this.spaceY = spaceY;
			this.vScrollBarSkin = '';
			this.hScrollBarSkin = '';
			return this
		}

		public pt = new Laya.Point(0, 0);
		public addChild(spr: Laya.Sprite) {
			// 横向
			if (this.repeatX) {
				let mod = parseInt('' + this.numChildren / this.repeatX);
				let lef = this.numChildren % this.repeatX;
				
			}
			this.pt.setTo(this.pt.x + spr.width + this.spaceX, this.pt.x + spr.height + this.spaceX, )
			return super.addChild(spr)
		}
	}
}