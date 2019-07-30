/**Created by the LayaAirIDE*/
module view.compart {
	export class OtherPlayerInSceneItem extends ui.compart.OtherPlayerInSceneItemUI {
		constructor() {
			super();
			this.setData();
		}
		public _skeGroup: SkeletonUtil.SkeletonGroup = new SkeletonUtil.SkeletonGroup();
		public setData(): void {
			this._skeGroup.loadRes(['sk/juese02/ZJ_LHC_1.sk'], () => {
				this.addChild(this._skeGroup);
				this._skeGroup.pos(this.width / 2, this.height * 0.6);
				this._skeGroup.scale(0.5, 0.5)
				this._skeGroup.play(0, true);
			});
		}

		public addEvent(): void {

		}
	}
}