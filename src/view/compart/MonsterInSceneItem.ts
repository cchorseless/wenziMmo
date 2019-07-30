/**Created by the LayaAirIDE*/
module view.compart {
	export class MonsterInSceneItem extends ui.compart.MonsterInSceneItemUI {
		public tempId;
		constructor() {
			super();
			this.setData();
		}
		public _skeGroup: SkeletonUtil.SkeletonGroup = new SkeletonUtil.SkeletonGroup();
		public setData(): void {
			this.img_bottom.scale(0.8, 0.8);
			this._skeGroup.loadRes(['sk/dingmian/BOSS_DM.sk'], () => {
				this.addChild(this._skeGroup);
				this._skeGroup.pos(this.width / 2, this.height * 0.6);
				this._skeGroup.scale(0.4, 0.4)
				this._skeGroup.play(0, true);
			});
		}

		public addEvent(): void {

		}
	}
}