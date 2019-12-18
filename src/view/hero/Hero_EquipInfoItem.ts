/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_EquipInfoItem extends ui.hero.Hero_EquipInfoItemUI {
		constructor() {
			super();
			this.getEquipBackground();
			this.addEvent();
			this.setData();
		}
		private HEADDRESS;
		private BELT;
		private job = 1;
		public heroInfo = [GameApp.MainPlayer.hero1, GameApp.MainPlayer.hero2, GameApp.MainPlayer.hero3];
		public hasint;
		public setData(): void {
			if (this.hasint) { return };
			this.hasint = true;
			this.init_changeHero();
			this.updateFight();
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_equip, Laya.UIEvent.CLICK, this, () => {
				let o = new view.juese.Person_Equip_SoulContentDialog()
				o.setData(0)
				o.popup();

			})
			EventManage.onWithEffect(this.btn_intensify, Laya.UIEvent.CLICK, this, () => {
				let o = new view.juese.Person_IntensifyContentDialog()
				o.setData()
				o.popup();
			})
			EventManage.onWithEffect(this.btn_soul, Laya.UIEvent.CLICK, this, () => {
				let o = new view.juese.Person_Equip_SoulContentDialog()
				o.setData(1)
				o.popup();
			})
			this.btn_shuxing.on(Laya.UIEvent.CLICK, this, () => {
				new view.hero.Hero_EquipAttributeDialog().setData(this.job).popup();
			})
			//上一个弟子
			EventManage.onWithEffect(this.btn_previous, Laya.UIEvent.CLICK, this, () => {
				if (this.job > 1) {
					this.job = this.job - 1;
					this.init_changeHero(this.job);
				}
			})
			//下一个弟子
			EventManage.onWithEffect(this.btn_next, Laya.UIEvent.CLICK, this, () => {
				if (this.job < 3) {
					this.job = this.job + 1;
					this.init_changeHero(this.job);
				}
			})
			//切换出战状态
			this.img_chuzhan.on(Laya.UIEvent.CLICK, this, () => {
				let i = this.job - 1;
				//当前弟子已解锁且不为出战弟子时切换出战状态
				// if (this.heroInfo[i].isOnBattle ) {
				this.init_ChangeHeroState();
				// }
			})
			//激活弟子
			this.btn_jiesuo.on(Laya.UIEvent.CLICK, this, () => {
				if (this.job == EnumData.JOB_TYPE.JOB_WARRIOR) {
					//激活弟子1
					this.init_JiHuo(ProtoCmd.Hero_firstGenHero);
				}
				else {
					//激活弟子2|3
					this.init_JiHuo(ProtoCmd.Hero_HeroJiHuo2and3);
				}
			})
			//战斗属性介绍
			// EventManage.onWithEffect(this.btn_shuxing, Laya.UIEvent.CLICK, this, () => {
			// 	new view.dialog.InfoV1Dialog().popup();
			// })
			this.addLcpEvent();
		}
		//激活弟子
		public init_JiHuo(proto): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(proto, [this.job])
			lcp.send(pkt);
		}
		public addLcpEvent() {
			// GameApp.LListener.on(LcpEvent.UPDATE_UI_HERO_ABILITY, this, (job) => {
			// 	this.updateProps(job);
			// });
			GameApp.LListener.on(LcpEvent.UPDATE_UI_HERO_POWER, this, (job) => {
				this.updateFight(job);
			});
			// 更新弟子状态
			GameApp.LListener.on(ProtoCmd.Hero_HeroBaseInfo, this, (jsonData: { [v: string]: ProtoCmd.itf_Hero_BaseInfo }) => {
				for (let i = 1; i < 4; i++) {
					switch (jsonData[i].JOB) {
						case EnumData.JOB_TYPE.JOB_WARRIOR:
							GameApp.MainPlayer.hero1.lockState = jsonData[i].STATE;
							break;
						case EnumData.JOB_TYPE.JOB_MAGE:
							GameApp.MainPlayer.hero2.lockState = jsonData[i].STATE;
							break;
						case EnumData.JOB_TYPE.JOB_MONK:
							GameApp.MainPlayer.hero3.lockState = jsonData[i].STATE;
							break;
					}
				}
				// 刷新弟子状态
				this.init_changeHero(this.job);
				PanelManage.DiZi.init_dizi();
			})
		}

		public destroy(isbool) {
			GameApp.LListener.offCaller(LcpEvent.UPDATE_UI_HERO_POWER, this);
			GameApp.LListener.offCaller(ProtoCmd.Hero_HeroBaseInfo, this);
			super.destroy(isbool);
		}
		/**
		 * 初始化装备背景
		 */
		public getEquipBackground(): void {
			for (let i = 0; i < 10; i++) {
				this['ui_item' + i].img_bg.visible = true;
				this['ui_item' + i].img_bg.skin = 'image/common/daoju/itemicon_bg_' + (i + 10) + '.png';
			}
		}
		//切换弟子
		public init_changeHero(job = 1): void {
			this.job = job;
			// 判断是否解锁
			switch (GameApp.MainPlayer.heroObj(this.job).lockState) {
				//0不可接受1可解锁2已解锁
				case 0:
					this.viw_dizi.selectedIndex = 0;
					this.btn_jiesuo.disabled = true;
					break;
				case 1:
					this.viw_dizi.selectedIndex = 0;
					this.btn_jiesuo.disabled = false;
					break;
				case 2:
					this.viw_dizi.selectedIndex = 1;
					this.init_heroState();
					break;
			};
			//职业
			this.lbl_chushen.text = this.lbl_job.text = LangConfig.JOB_TYPEDES[EnumData.JOB_TYPE[this.job]]
			//弟子半身像
			this.img_hero.skin = LangConfig.getPlayerAvatarSkinV1(GameApp.MainPlayer.heroSex, this.job)
			switch (this.job) {
				case 1:
					this.HEADDRESS = EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_HEADDRESS;
					this.BELT = EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_BELT;
					//等级
					this.lbl_level.text = '' + GameObject.Hero.zslevel + '转' + GameApp.MainPlayer.hero1.level + '级';
					//攻击类型
					this.lbl_gongji.text = this.lbl_killtype.text = '外功';
					this.btn_next.visible = true;
					this.btn_previous.visible = false;
					//解锁等级
					this.lbl_condition.text = '39级';
					break;
				case 2:
					this.HEADDRESS = EnumData.emEquipPosition.EQUIP_HERO_MAGE_HEADDRESS;
					this.BELT = EnumData.emEquipPosition.EQUIP_HERO_MAGE_BELT;
					//等级
					this.lbl_level.text = '' + GameObject.Hero.zslevel + '转' + GameApp.MainPlayer.hero2.level + '级';
					//攻击类型
					this.lbl_gongji.text = this.lbl_killtype.text = '内功';
					this.btn_next.visible = true;
					this.btn_previous.visible = true;
					//解锁等级
					this.lbl_condition.text = '62级';
					break;
				case 3:
					this.HEADDRESS = EnumData.emEquipPosition.EQUIP_HERO_MONK_HEADDRESS;
					this.BELT = EnumData.emEquipPosition.EQUIP_HERO_MONK_BELT;
					//等级
					this.lbl_level.text = '' + GameObject.Hero.zslevel + '转' + GameApp.MainPlayer.hero3.level + '级';
					//攻击类型
					this.lbl_gongji.text = this.lbl_killtype.text = '内功';
					this.btn_next.visible = false;
					this.btn_previous.visible = true;
					//解锁等级
					this.lbl_condition.text = '72级';
					break;
			}
			if (this.viw_dizi.selectedIndex == 1) {
				//合击技能
				let skillInfo = GameApp.MainPlayer.skillInfo;
				let index = '500' + this.job;
				let heji_icon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(skillInfo[index].configID)
				this.btn_wuxue.skin = "image/common/skill/skill_icon_" + heji_icon + ".png";
				this.lbl_wuxue.text = SheetConfig.mydb_magic_tbl.getInstance(null).NAME(skillInfo[index].configID)
				// 装备
				for (let i = 0; i < 10; i++) {
					(this['ui_item' + i] as view.compart.EquipInBodybgItem).clearItem();
				}
				let allKey = Object.keys(GameApp.GameEngine.equipDB);
				for (let key of allKey) {
					let _itemBase: ProtoCmd.ItemBase = GameApp.GameEngine.equipDB[key];
					let btLocation = _itemBase.location.getValue('btLocation');
					let btIndex = _itemBase.location.getValue('btIndex');
					// 筛选合适的装备
					if (btLocation == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP && btIndex <= this.BELT && btIndex >= this.HEADDRESS) {
						let itemUI = new view.compart.DaoJuItem();
						itemUI.setData(_itemBase, EnumData.ItemInfoModel.SHOW_IN_PLAYER);
						(this['ui_item' + (btIndex - this.HEADDRESS)] as view.compart.EquipInBodybgItem).addItem(itemUI);
					}
				}
			}
		}
		/**
		 * 切换英雄出战状态
		 */
		public init_ChangeHeroState(): void {
			let pkt = new ProtoCmd.QuestClientData();
			let num = this.job - 1;
			pkt.setString(ProtoCmd.Hero_ChangeHero, [num]);
			lcp.send(pkt);
		}
		public init_heroState(): void {
			//弟子出战状态
			if (GameApp.MainPlayer.curHero == undefined) {
				this.img_chuzhan.gray = true;
				this.lbl_chuzhan.text='休战中';
			}
			else {
				if (GameApp.MainPlayer.heroObj(this.job).isOnBattle) {
					this.img_chuzhan.gray = false;
					this.lbl_chuzhan.text='出战中';
				} else {
					this.img_chuzhan.gray = true;
					this.lbl_chuzhan.text='休战中';
				}
			}
		}
		/**
		 * 更新战力
		 */
		public updateFight(job = 1) {
			//战力
			if (job != this.job) return;
			this.lbl_zhanli.text = '' + LangConfig.getBigNumberDes(GameApp.MainPlayer.heroObj(this.job).ability.nFight);
		}
	}
}