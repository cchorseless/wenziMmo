/**Created by the LayaAirIDE*/
module view.scene {
	export class HeroInSceneItem extends ui.scene.HeroInSceneItemUI {
		constructor() {
			super();
		}
		// public _skeGroup: SkeletonUtil.SkeletonGroup = new SkeletonUtil.SkeletonGroup();
		public item: GameObject.Hero;
		public setData(item: GameObject.Hero): void {
			this.item = item;
			this.item.ui_item = this;
			this.img_heroAva.skin = LangConfig.getPlayerSmallAvatarSkin(item.feature.simpleFeature.sex, item.feature.simpleFeature.job)
			// 行会名字

			this.updateUI();
		}

		public addEvent(): void {

		}
		/**
		 * 刷新自己的UI
		 */
		public updateUI() {
			this.updateHp();
			this.updateZuoBiao();
		}
		/**
		 * 更新血条
		 */
		public updateHp(): void {
			this.img_hp.width = this.img_hpBg.width * this.item.ability.nowHP / this.item.ability.nMaxHP;
		}




		/**
		 * 播放动画
		 * @param model 
		 */
		public playAni(model = 0, loop: boolean = false, force = false, completeHandler: Laya.Handler = null, playbackRate = 1): void {
			// this._skeGroup.play(model, loop, force, completeHandler, playbackRate);
		}
		public stopPlayAni(): void {
			// this._skeGroup.stopPlay();
		}
		public updateZuoBiao(): void {
			// this.lbl_hp.text = '' + this.item.ability.nowHP + '/' + this.item.ability.nMaxHP;
			this.lbl_zuoBiao.text = '(' + this.item.location.ncurx + ',' + this.item.location.ncury + ')';
		}
	}
}