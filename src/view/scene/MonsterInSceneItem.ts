/**Created by the LayaAirIDE*/
module view.scene {
	export class MonsterInSceneItem extends ui.scene.MonsterInSceneItemUI {
		constructor() {
			super();
		}
		public _skeGroup: SkeletonUtil.SkeletonGroup = new SkeletonUtil.SkeletonGroup();
		public item: GameObject.Monster;
		public setData(item: GameObject.Monster): void {
			this.centerX = this.centerY = 0;
			// 相互绑定
			this.item = item;
			item.ui_item = this;
			this.lbl_name.text = this.item.objName;
			this.lbl_zuoBiao.text = '(' + this.item.location.ncurx + ',' + this.item.location.ncury + ')';
			// 龙骨
			let configID = '' + this.item.feature.dwCretTypeId;
			// 半身像
			let skePath = SheetConfig.mydb_monster_tbl.getInstance(null).SKERES('' + configID);
			// 龙骨资源
			this._skeGroup.loadRes(['sk/monster/' + skePath + '.sk'], () => {
				this.spr_pos.addChild(this._skeGroup);
				this._skeGroup.play(1, true);
				this.addEvent();
			});
			this.updateUI();
		}

		public collectHander: Laya.Handler;// 采集物Hander
		public addEvent(): void {
			EventManage.onWithEffect(this.box_view, Laya.UIEvent.CLICK, this, () => {
				let player = GameApp.MainPlayer;
				let configID = this.item.feature.dwCretTypeId;
				let skePath: EnumData.emMonsterType = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_TYPE('' + configID);
				// 怪物类型
				switch (skePath) {
					// 收集道具
					case EnumData.emMonsterType._MON_TYPE_COLLECT_:
						if (this.collectHander)
						{ this.collectHander.run() }
						else {
							PanelManage.Main.addNpcPregressItem(this.item);
						}
						break;
					default:
						player.startHandAtk(this.item);
						break;
				}

			})
		}


		/**
		 * 播放动画
		 * @param model 
		 */
		public playAni(model = 0, loop: boolean = false, force = false, completeHandler: Laya.Handler = null, playbackRate = 1): void {
			this._skeGroup.play(model, loop, force, completeHandler, playbackRate);
		}

		public stopPlayAni(): void {

		}


		public updateUI(): void {
			this.lbl_hp.text = '' + this.item.ability.nowHP + '/' + this.item.ability.nMaxHP;
		}

	}
}