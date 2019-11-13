/**Created by the LayaAirIDE*/
module view.scene {
	export class PlayerAndHeroInSceneV0Item extends ui.scene.PlayerAndHeroInSceneV0ItemUI {
		constructor() {
			super();
		}

		public masterItem: GameObject.OtherPlayer;
		public setMaster(obj: GameObject.OtherPlayer): void {
			this.masterItem = obj;
			obj.ui_item = this;
			this.img_heroAva.visible = false;
			this.img_playerAva.visible = false;
			this.img_playerAvaBig.visible = true;
			if (this.masterItem.objName.length > 4) {
				this.lbl_name.fontSize = 16
			}
			else {
				this.lbl_name.fontSize = 18
			}
			this.lbl_name.text = this.masterItem.objName;
			this.img_nameBg.height = this.lbl_name.displayHeight + 25;
			// 公会
			let guidlID = this.masterItem.feature.dwClanId;
			if (guidlID) {
				let guildName = GameApp.GameEngine.allGuildInfo[guidlID];
				// 没有查到本地数据就缓存
				if (guildName) {
					this.lbl_guildName.text = '' + guildName;
				}
				else {
					let pkt = new ProtoCmd.stClientGetSingleGuildInfo();
					pkt.setValue('guildId', this.masterItem.feature.dwClanId);
					lcp.send(pkt, this, (data) => {
						let cbpkt = new ProtoCmd.stClientGetSingleGuildInfoRet(data);
						GameApp.GameEngine.allGuildInfo[cbpkt.getValue('guildId')] = cbpkt.getValue('guildName');
						this.lbl_guildName.text = '' + cbpkt.getValue('guildName');
						cbpkt.clear(); cbpkt = null;
					})
				}

			}
			else {
				this.lbl_guildName.text = '';
			}
			// skin
			this.img_avaBig.skin = this.img_playerava.skin = LangConfig.getPlayerIconSkinV1(this.masterItem.sex, this.masterItem.job);
			this.updateUI();
		}

		public setHero(obj: GameObject.Hero) {
			console.log('---------添加了弟子---------');
			this.masterItem.curHero = obj;
			this.img_heroAva.visible = true;
			this.img_playerAva.visible = true;
			this.img_playerAvaBig.visible = false;
			// 弟子
			this.img_heroava.skin = LangConfig.getPlayerIconSkinV1(obj.feature.simpleFeature.sex, obj.feature.simpleFeature.job);
		}

		public addEvent() {


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
			this.img_hp.width = this.img_hpBg.width * this.masterItem.ability.nowHP / this.masterItem.ability.nMaxHP;
		}
		/**
		 * 更新内功条
		 */
		public updateNeiGong(): void {
			this.img_mp.width = this.img_mpBg.width * this.masterItem.ability.nowInnerValue / this.masterItem.ability.nInnerValue;
		}

		public updateZuoBiao(): void {
			// this.lbl_hp.text = '' + this.item.ability.nowHP + '/' + this.item.ability.nMaxHP;
			// this.lbl_zuoBiao.text = '(' + this.item.location.ncurx + ',' + this.item.location.ncury + ')';
		}

	}
}