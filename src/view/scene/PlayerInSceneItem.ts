/**Created by the LayaAirIDE*/
module view.scene {
	export class PlayerInSceneItem extends ui.scene.PlayerInSceneItemUI {
		constructor() {
			super();
		}
		public _skeGroup: SkeletonUtil.SkeletonGroup = new SkeletonUtil.SkeletonGroup();
		public item: GameObject.Player;
		public setData(item: GameObject.Player): void {
			this.item = item;
			this.item.ui_item = this;
			this.lbl_name.text = this.item.objName;
			this._skeGroup.loadRes([this.item.skeBoneRes], () => {
				this.spr_pos.addChild(this._skeGroup);
				this._skeGroup.play(1, true);
				this.addEvent();
			});
			this.updateUI();
		}

		public addEvent(): void {

		}

		/**
		 * 播放动画
		 * @param model 
		 */
		public playAni(model = 0, loop: boolean = false, force = false, completeHandler: Laya.Handler = null, playbackRate = 1): void {
			this._skeGroup.play(model, loop, force, completeHandler, playbackRate);
		}

		public stopPlayAni(): void {
			this._skeGroup.stopPlay();
		}

		public updateUI(): void {
			this.lbl_hp.text = '' + this.item.ability.nowHP + '/' + this.item.ability.nMaxHP;
			this.lbl_zuoBiao.text = '(' + this.item.location.ncurx + ',' + this.item.location.ncury + ')';
		}
	}
}