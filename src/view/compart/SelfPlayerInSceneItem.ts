/**Created by the LayaAirIDE*/
module view.compart {
	export class SelfPlayerInSceneItem extends ui.compart.SelfPlayerInSceneItemUI {
		constructor() {
			super();
			this.setData();
		}
		public _skeGroup: SkeletonUtil.SkeletonGroup = new SkeletonUtil.SkeletonGroup();
		public setData(): void {
			this._skeGroup.loadRes(['sk/juese01/ZJ_RYY_1.sk'], () => {
				this.addChild(this._skeGroup);
				this._skeGroup.pos(this.width / 2, this.height * 0.5);
				this._skeGroup.scale(0.6, 0.6)
				this._skeGroup.play(1, true);
			});
		}

		public addEvent(): void {

		}
	}
}