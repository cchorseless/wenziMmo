/**Created by the LayaAirIDE*/
module view.scene {
	export class MonsterInSceneItemV1 extends ui.scene.MonsterInSceneItemV1UI {
		constructor() {
			super();
		}
		public place: number//1战斗界面0移动界面
		public item: GameObject.Monster;
		public setData(item: GameObject.Monster, place): void {
			this.place = place;
			// 相互绑定
			this.item = item;
			item.ui_item = this;
			let name: string = this.item.objName
			if (name.length > 4) {
				this.lbl_name.fontSize = 15
			} else {
				this.lbl_name.fontSize = 20
			}
			this.lab_hp_ceng.text = 'X1';
			this.lab_hp.text = this.item.ability.nowHP + '/' + this.item.ability.nMaxHP;
			this.lbl_name.text = name;
			// 龙骨
			let configID = '' + this.item.feature.dwCretTypeId;
			let skePath
			// this.addMonster(monsterObj);
			skePath = SheetConfig.mydb_monster_tbl.getInstance(null).STYLE_DRAWING('' + configID);
			let wuxing = SheetConfig.mydb_monster_tbl.getInstance(null).WUXINGPROPS(configID)
			this.img_wuxing.skin = "image/common/skill/icon_wx_" + wuxing + ".png"
			this.img_icon.skin = 'image/common/npc/npc_icon_' + skePath + '.png'
			GameApp.MainPlayer.fubenMonsterPower = SheetConfig.mydb_monster_tbl.getInstance(null).MONSTER_COMBAT(configID)
			this.changeBelong('');
			this.addEvent();
			this.updateUI();
			this.upDateBuff()
			this.updateHp()
		}
		public upDateBuff() {
			let feat = this.item.feature

		}

		public changeBelong(name = '') {
			this.lab_belong.text = name;
		}
		public collectHander: Laya.Handler;// 采集物Hander
		public addEvent(): void {
			GameApp.LListener.on(ProtoCmd.BossBelong, this, function (name) {
				this.changeBelong(name)
			});

			this.box_view.on(Laya.UIEvent.CLICK, this, () => {
				let player = GameApp.MainPlayer;
				let job = player.job;
				player.tryAttack(this.item, 999);
				// if (this.place == 0) {
				// 	//怪物信息弹窗
				// 	new view.npc.Main_TanSuoV0Dialog().setData(this.item, 1).popup();
				// } else {
				// 	//攻击
				// 	// player["startHandAtk" + job](this.item);
				// }
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
					break;
			}
		}
		/**
		 * 更新血条
		 */
		public updateHp(): void {
			// GameApp.LListener.event(ProtoCmd.UPDATE_BOSSHP, { now: this.item.ability.nowHP, max: this.item.ability.nMaxHP })
			// this.img_hp_cur.width = Math.ceil((this.item.ability.nowHP / this.item.ability.nMaxHP) * 360)
			// this.lab_hp.text = this.item.ability.nowHP + '/' + this.item.ability.nMaxHP;
			let max = 10000;
			let ceng = Math.ceil(this.item.ability.nowHP / 10000);
			let curHP = this.item.ability.nowHP % 10000;
			if (curHP == 0) {
				curHP = 10000;
			}
			this.lab_hp_ceng.text = "x" + ceng;

			this.img_hp_cur.width = Math.ceil((curHP / max) * 360);
			this.lab_hp.text = curHP + '/' + max;

		}
		public upDateDeBuff() {
			this.hbox_debuff.x = this.hbox_buff.x + this.hbox_buff.numChildren * 30 + 10;

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

		/**
		 * 播放攻击动画
		 * @param dwTargeterUI 
		 * @param nMagicId 
		 * @param dwActionTick 
		 */
		public playFlyAni(dwTargeterUI, nMagicId, dwActionTick){
			
			console.log()
		}
	}
}