/**Created by the LayaAirIDE*/
module view.scene {
	export class MonsterInSceneItemV1 extends ui.scene.MonsterInSceneItemV1UI {
		constructor() {
			super();
		}
		public item: GameObject.Monster;
		public setData(item: GameObject.Monster): void {
			// this.centerX = this.centerY = 0;s
			// 相互绑定
			this.item = item;
			item.ui_item = this;
			let name: string = this.item.objName

			if (name.length > 4) {
				this.lbl_name.fontSize = 15
			} else {
				this.lbl_name.fontSize = 20
			}
			this.lbl_name.text = name;
			// 龙骨
			let configID = '' + this.item.feature.dwCretTypeId;
			let skePath
			// this.addMonster(monsterObj);
			skePath = SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + configID);
			let wuxing = SheetConfig.mydb_monster_tbl.getInstance(null).WUXINGPROPS(configID)
			this.img_wuxing.skin = "image/common/skill/icon_wx_" + wuxing + ".png"
			this.img_icon.skin = 'image/common/npc/npc_half_' + skePath + '.png'

			this.addEvent();

			this.updateUI();
		}
		public collectHander: Laya.Handler;// 采集物Hander
		public addEvent(): void {
			this.box_view.on(Laya.UIEvent.CLICK, this, () => {
				let player = GameApp.MainPlayer;
				let job = player.job;
				// player["startHandAtk" + job](this.item);
				player.startHandAtk0(this.item);
			})
		}
		public updateUI(): void {
			// this.img_hp_cur.width = Math.ceil((this.item.ability.nowHP / this.item.ability.nMaxHP) * this.img_hp_bg.width)
		}
		/**
		 * 
		 * @param type   1:受击  2:眩晕  3：石化
		 */
		public playAni(type: number) {
			let self = this;
			switch (type) {
				case 1:
					// this.mask.alpha = 0.6
					self.img_mask.visible = true;
					let ani = Laya.Tween.to(self.img_mask, { alpha: 0 }, 500, null, Laya.Handler.create(self, () => {
						self.img_mask.visible = false;
						self.img_mask.alpha = 0.6
						Laya.Tween.clear(ani);
					}));
					break;
			}
		}
		/**
		 * 更新血条
		 */
		public updateHp(): void {
			// GameApp.LListener.event(ProtoCmd.UPDATE_BOSSHP, { now: this.item.ability.nowHP, max: this.item.ability.nMaxHP })
			// this.img_hp_cur.width = Math.ceil((this.item.ability.nowHP / this.item.ability.nMaxHP) * this.img_hp_bg.width)
		}
		public upDateBuff() {
			let o;
			this.hbox_buff.addChild(o);
		}
		public upDateDeBuff() {
			this.hbox_debuff.x = this.hbox_buff.x + this.hbox_buff.numChildren * 30 + 10

		}
	}
}