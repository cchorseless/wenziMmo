/**Created by the LayaAirIDE*/
module view.compart {
	export class SelfPlayerInSceneItem extends ui.compart.SelfPlayerInSceneItemUI {
		constructor() {
			super();
		}
		public _skeGroup: SkeletonUtil.SkeletonGroup = new SkeletonUtil.SkeletonGroup();
		public item: GameObject.Player;
		public setData(item): void {
			this.item = item;
			this.item.ui_item = this;
			this.lbl_name.text = this.item.objName;
			this.lbl_zuoBiao.text = '(' + this.item.location.ncurx + ',' + this.item.location.ncury + ')';
			
			this._skeGroup.loadRes(['sk/juese01/ZJ_RYY_1.sk'], () => {
				this.addChild(this._skeGroup);
				this._skeGroup.pos(this.width / 2, this.height * 0.5);
				this._skeGroup.scale(0.6, 0.6)
				this._skeGroup.play(1, true);
				this.addEvent();
			});
			this.updateUI();
		}

		public addEvent(): void {

		}

		/**
		 * 播放攻击动画
		 * @param model 
		 */
		public playAni(model = 0): void {
			this._skeGroup.play(model, true);
		}

		public updateUI(): void {
			this.lbl_hp.text = '' + this.item.ability.nowHP + '/' + this.item.ability.nMaxHP;
		}
	}
}