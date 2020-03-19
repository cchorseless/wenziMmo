/**Created by the LayaAirIDE*/
module view.scene {
	export class PlayerInSceneItem extends ui.scene.PlayerInSceneItemUI {
		constructor() {
			super();
			this.addEvent()
		}
		public static ARGUE = 'argue';
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
			// 动画
			this.ani.pos(this.width / 2, this.height / 2);
			this.ani.interval = 120;
			this.addChild(this.ani);
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
			switch (type) {
				case 1:
					// this.mask.alpha = 0.6
					break;

			}
		}





		public updateZuoBiao(): void {
			// this.lbl_hp.text = '' + this.item.ability.nowHP + '/' + this.item.ability.nMaxHP;
		}
		public changeHeartNum(num) {
			this.lab_Argue.text = '心理值:' + num;
		}
		/**
		 * 伤害数字
		 * @param num 
		 * @param type 
		 */
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