/**Created by the LayaAirIDE*/
module view.scene {
	export class PlayerInSceneItem extends ui.scene.PlayerInSceneItemUI {
		constructor() {
			super();
			this.addEvent()
		}
		public static ARGUE = 'argue';
		public static HP = 'Myhp'
		// public _skeGroup: SkeletonUtil.SkeletonGroup = new SkeletonUtil.SkeletonGroup();
		public item: GameObject.Player;
		public setData(item: GameObject.Player): void {

			this.item = item;
			this.item.ui_item = this;
			// 名字
			if (this.item.objName.length > 4) {
				this.lab_name.fontSize = 16
			}
			else {
				this.lab_name.fontSize = 18
			}
			if (GameApp.MainPlayer.curFuBenID == 400) {
				this.img_Argue.visible = true;

			} else {
				this.img_Argue.visible = false;
			}
			//职业icon
			this.img_job.skin = LangConfig.getPlayerJobIcon();
			this.lab_name.text = this.item.objName;
			// this.img_nameBg.height = this.lbl_name.displayHeight + 25;
			// 公会名字
			this.lbl_guildName.text = '' + this.item.guildInfo.szName;
			// 全身像
			// this.img_playerAva.skin = LangConfig.getPlayerAvatarHalfSkin();
			let ch = GameApp.GameEngine.mainPlayer.feature.nTitleId;

			if (ch > 0) {
				let ch_Skin = SheetConfig.zhuanban_Dress.getInstance(null).RESOURCES(ch + '')
				this.img_chenghao.skin = 'image/juese/chenghao/' + ch_Skin + '.png'
			} else {
				this.img_chenghao.skin = '';
			}
			this.img_playerAva.skin = LangConfig.getPlayerIconSkin();
			// 刷新UI
			this.updateUI();
			this.img_job.skin = LangConfig.getPlayerJobIcon();

		}
		public changeHeartNum(num) {
			console.log('我的血量' +num)
			this.lab_Argue.text = '心理值:' + num;
		}
		public addEvent(): void {
			// GameApp.LListener.on()
			GameApp.LListener.on(view.scene.PlayerInSceneItem.ARGUE, this, function (res) {
				if (res == '1') {
					this.img_Argue.visible = true;
				} else {
					this.img_Argue.visible = false;
				}
			});
			GameApp.LListener.on(view.scene.PlayerInSceneItem.HP, this, function (res) {
				this.changeHeartNum(res);
			});
			GameApp.LListener.on(ProtoCmd.UP_DATE_DRESS, this, function () {
				let ch = GameApp.GameEngine.mainPlayer.feature.nTitleId;

				if (ch > 0) {
					let ch_Skin = SheetConfig.zhuanban_Dress.getInstance(null).RESOURCES(ch + '')
					this.img_chenghao.skin = 'image/juese/chenghao/' + ch_Skin + '.png'
				}

			});

		}
		public changeBuff(data) {
			let buffID = data.getValue('dwMagicID');  //BuffID
			let isAdd = data.getValue('btBuffOrAction');  //0动作(不处理)1无就增加，有就更新2取消3不显示
			let dwTick = data.getValue('dwTick');//剩余时间
			let buffLv = data.getValue('btLevel');//buff等级
			let leftNum = data.getValue('nValue');//剩余量   
			let buffIcon;
			// let itemData=SheetConfig.mydb_drugbuff_tbl.getInstance(null)

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
			if (this.item.ability.nowHP >= this.item.ability.nMaxHP) {
				this.img_hp.width = this.img_hpBg.width;
			} else {
				this.img_hp.width = this.img_hpBg.width * this.item.ability.nowHP / this.item.ability.nMaxHP;
			}

		}
		/**
		 * 更新内功条
		 */
		public updateNeiGong(): void {
			// this.img_mp.width = this.img_mpBg.width * this.item.ability.nowInnerValue / this.item.ability.nInnerValue;
		}
		/**
		 * 
		 * @param type   1:受击  2:眩晕  3：石化
		 */
		public onAttack(type: number) {
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
		 * 播放动画
		 * @param model 
		 */
		public playAni(model = 0, loop: boolean = false, force = false, completeHandler: Laya.Handler = null, playbackRate = 1): void {
			// this._skeGroup.play(model, loop, force, completeHandler, playbackRate);
			// this.img_isfight.skin = 
			// this.img_isfight.visible = true;
			// Laya.Tween.to(this.img_isfight, { scaleX: 1, scaleY: 1 }, 1000, null, Laya.Handler.create(this, () => {
			// 	this.img_isfight.visible = false;
			// 	this.img_isfight.scaleX = this.img_isfight.scaleY = 0.2;

			// }))
		}

		public stopPlayAni(): void {
			// this._skeGroup.stopPlay();
		}

		public updateZuoBiao(): void {
			// this.lbl_hp.text = '' + this.item.ability.nowHP + '/' + this.item.ability.nMaxHP;
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