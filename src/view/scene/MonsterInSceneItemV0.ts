/**Created by the LayaAirIDE*/
module view.scene {
	export class MonsterInSceneItemV0 extends ui.scene.MonsterInSceneItemV0UI {
		constructor() {
			super();
		}
		public place: number//0战斗界面1移动界面
		public item: GameObject.Monster;
		public setData(item: GameObject.Monster, place: number = 0): void {
			this.place = place;
			this.centerX = this.centerY = 0;
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
			// this.lab_LV.text = 'LV.' + this.item.level;
			// this.addMonster(monsterObj);
			// this.img_bg.skin = 'image/main/frame_boss_03.png'
			let wuxing = SheetConfig.mydb_monster_tbl.getInstance(null).WUXINGPROPS(configID)
			this.img_wx.skin = "image/common/skill/icon_wx_" + wuxing + ".png"
			skePath = SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + configID);
			this.img_icon.skin = 'image/common/npc/npc_icon_' + skePath + '.png'
			this.addEvent();

			this.updateUI();
		}
		public collectHander: Laya.Handler;// 采集物Hander
		public addEvent(): void {
			EventManage.onWithEffect(this.box_view, Laya.UIEvent.CLICK, this, () => {
				let player = GameApp.MainPlayer;
				let job = player.job;
				if (this.place == 1) {
					//怪物信息弹窗
					new view.npc.Main_TanSuoV0Dialog().setData(this.item, 1).popup();
				} else {
					//攻击
					// player["startHandAtk" + job](this.item);
					player.startHandAtk0(this.item);
				}
			})
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
		public updateUI(): void {
			this.img_hp_cur.width = Math.ceil((this.item.ability.nowHP / this.item.ability.nMaxHP) * this.img_hp_bg.width)
		}
		/**
		 * 更新血条
		 */
		public updateHp(): void {
			this.img_hp_cur.width = Math.ceil((this.item.ability.nowHP / this.item.ability.nMaxHP) * this.img_hp_bg.width)
		}

	}
}