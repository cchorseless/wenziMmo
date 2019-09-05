/**Created by the LayaAirIDE*/
module view.compart {
	export class SelfPlayerInSceneItem extends ui.compart.SelfPlayerInSceneItemUI {
		constructor() {
			super();
		}
		public _skeGroup: SkeletonUtil.SkeletonGroup = new SkeletonUtil.SkeletonGroup();
		public setData(model): void {
			let scale = 0.6;
			let res ;
			switch (model) {
				// 主角
				case 0:
					scale = 0.6;
					res = 'sk/juese01/ZJ_RYY_1.sk';
					break;
				// 弟子
				case 1:
					scale = 0.5;
					res = 'sk/juese02/ZJ_LHC_1.sk';
					break;
			};
			this._skeGroup.loadRes([res], () => {
				this.addChild(this._skeGroup);
				this._skeGroup.pos(this.width / 2, this.height * 0.5);
				this._skeGroup.scale(scale, scale)
				this._skeGroup.play(1, true);
				this.addEvent();
			});
		}

		public addEvent(): void {

		}
	}
}