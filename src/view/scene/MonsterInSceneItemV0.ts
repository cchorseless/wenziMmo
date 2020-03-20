/**Created by the LayaAirIDE*/
module view.scene {
	export class MonsterInSceneItemV0 extends ui.scene.MonsterInSceneItemV0UI {
		constructor() {
			super();
		}
		public place: number//1战斗界面0移动界面 2:辩论
		public item: GameObject.Monster;
		public static HP = 'hp';
		public setData(item: GameObject.Monster, place): void {
			this.place = place;
			this.centerX = this.centerY = 0;
			// 相互绑定
			this.item = item;
			item.ui_item = this;
			let name: string = this.item.objName.split("_")[0];
			if (GameApp.MainPlayer.curFuBenID ==400) {
				this.img_Argue.visible = true;
			}else{
				this.img_Argue.visible = false;
			}


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
			this.img_wx.skin = PathUtil.getWuXingIconPath(wuxing);
			skePath = SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + configID);
			this.img_icon.skin = 'image/common/npc/npc_icon_' + skePath + '.png'
			GameApp.MainPlayer.fubenMonsterPower += SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_COMBAT(configID)
			this.addEvent();

			this.updateUI();
		}
		public collectHander: Laya.Handler;// 采集物Hander
		public changeHeartNum(num) {
			this.lab_Argue.text = '心理值:' + num;
		}
		public addEvent(): void {
			GameApp.LListener.on(view.scene.MonsterInSceneItemV0.HP, this, function (res) {
				this.changeHeartNum(res);
			});
			EventManage.onWithEffect(this.box_view, Laya.UIEvent.CLICK, this, () => {
				let player = GameApp.MainPlayer;
				let job = player.job;
				if (this.place == 0) {
					//怪物信息弹窗
					new view.npc.Main_TanSuoV0Dialog().setData(this.item, 1).popup();
				} else if (this.place == 1) {
					//攻击
					// player["startHandAtk" + job](this.item);
					player.startHandAtk0(this.item);
				} else if (this.place == 2) {
					// new view.npc.Main_TanSuoV1Dialog().setData(this.item).popup();
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
		public showPower(num, type) {
			this.fc_Num.alpha = 1;
			this.fc_Num.visible = true;
			this.fc_Num.value = num + '';
			// this.fc_Num.skin = 'image/common/number/shuzi_baoji.png';
			if (type == 4) {
				this.fc_Num.skin = 'image/common/number/shuzi_huixin.png';
			} else if (type == 0) {
				this.fc_Num.skin = 'image/common/number/shuzi_putong.png';
			} else {
				this.fc_Num.skin = 'image/common/number/shuzi_baoji.png';
			}
			Laya.Tween.to(this.fc_Num, { alpha: 0.8 }, 500, null, Laya.Handler.create(this, () => {
				this.fc_Num.visible = false;
			}));
		}

	}
}