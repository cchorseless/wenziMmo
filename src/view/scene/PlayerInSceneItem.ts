/**Created by the LayaAirIDE*/
module view.scene {
	export class PlayerInSceneItem extends ui.scene.PlayerInSceneItemUI {
		constructor() {
			super();
			this.addEvent()
		}
		// public _skeGroup: SkeletonUtil.SkeletonGroup = new SkeletonUtil.SkeletonGroup();
		public item: GameObject.Player;
		public setData(item: GameObject.Player): void {
			this.item = item;
			this.item.ui_item = this;
			// 名字
			if (this.item.objName.length > 4) {
				this.lbl_name.fontSize = 16
			}
			else {
				this.lbl_name.fontSize = 18
			}
			//职业icon
			this.img_job.skin=LangConfig.getPlayerJobIcon();
			this.lbl_name.text = this.item.objName;
			this.img_nameBg.height = this.lbl_name.displayHeight + 25;
			// 公会名字
			this.lbl_guildName.text = '' + this.item.guildInfo.szName;
			// 全身像
			this.img_playerAva.skin = LangConfig.getPlayerAvatarHalfSkin();
			// 刷新UI
			this.updateUI();

		}

		public addEvent(): void {


		}

		/**
		 * 刷新自己的UI
		 */
		public updateUI() {
			this.updateHp();
			this.updateNeiGong();
			this.updateZuoBiao();
		}

		/**
		 * 更新血条
		 */
		public updateHp(): void {
			this.img_hp.width = this.img_hpBg.width * this.item.ability.nowHP / this.item.ability.nMaxHP;
		}
		/**
		 * 更新内功条
		 */
		public updateNeiGong(): void {
			this.img_mp.width = this.img_mpBg.width * this.item.ability.nowInnerValue / this.item.ability.nInnerValue;
		}


		/**
		 * 播放动画
		 * @param model 
		 */
		public playAni(model = 0, loop: boolean = false, force = false, completeHandler: Laya.Handler = null, playbackRate = 1): void {
			// this._skeGroup.play(model, loop, force, completeHandler, playbackRate);
			this.img_isfight.visible = true;
			Laya.Tween.to(this.img_isfight,{scaleX:1.1,scaleY:1.1},500,null,Laya.Handler.create(this, () => {
				this.img_isfight.scaleX = this.img_isfight.scaleY = 1;
				this.img_isfight.visible = false;
			}))
		}

		public stopPlayAni(): void {
			// this._skeGroup.stopPlay();
		}

		public updateZuoBiao(): void {
			// this.lbl_hp.text = '' + this.item.ability.nowHP + '/' + this.item.ability.nMaxHP;
			// this.lbl_zuoBiao.text = '(' + this.item.location.ncurx + ',' + this.item.location.ncury + ')';
		}
	}
}