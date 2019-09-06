/**Created by the LayaAirIDE*/
module view.compart {
	export class MonsterInSceneItem extends ui.compart.MonsterInSceneItemUI {
		constructor() {
			super();
		}
		public _skeGroup: SkeletonUtil.SkeletonGroup = new SkeletonUtil.SkeletonGroup();
		public item: GameObject.Monster;
		public setData(item: GameObject.Monster): void {
			// 相互绑定
			this.item = item;
			item.ui_item = this;
			this.lbl_name.text = this.item.objName;
			this.lbl_zuoBiao.text = '(' + this.item.location.ncurx + ',' + this.item.location.ncury + ')';
			this.img_bottom.scale(0.8, 0.8);
			this._skeGroup.loadRes(['sk/dingmian/BOSS_DM.sk'], () => {
				this.addChild(this._skeGroup);
				this._skeGroup.pos(this.width / 2, this.height * 0.6);
				this._skeGroup.scale(0.4, 0.4)
				this._skeGroup.play(1, true);
				this.addEvent();
			});
			this.updateUI();
		}

		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				let player = GameApp.MainPlayer;
				player.tryAttack(this.item);
			})
		}


		/**
		 * 播放动画
		 * @param model 
		 */
		public playAni(model = 0, loop: boolean = false, force = false, completeHandler: Laya.Handler = null, playbackRate = 1): void {
			this._skeGroup.play(model, loop);
		}

		public updateUI(): void {
			this.lbl_hp.text = '' + this.item.ability.nowHP + '/' + this.item.ability.nMaxHP;
		}

	}
}