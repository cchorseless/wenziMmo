/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_EquipInfoItem extends ui.hero.Hero_EquipInfoItemUI {
		constructor() {
			super();
			this.getEquipBackground();
			this.addEvent();
			this.init_changeHero();
		}
		private HEADDRESS;
		private BELT;
		private job;
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
				//当前弟子已解锁且不为出战弟子时切换出战状态
				if (GameApp.MainPlayer.heroObj(this.job).isOnBattle == false && GameApp.MainPlayer.heroObj(this.job).lockState == 2) {
					this.init_ChangeHero();
				}
			})
			//战斗属性介绍
			// EventManage.onWithEffect(this.btn_shuxing, Laya.UIEvent.CLICK, this, () => {
			// 	new view.dialog.InfoV1Dialog().popup();
			// })
			this.addLcpEvent();
		}

		public addLcpEvent() {
			// GameApp.LListener.on(LcpEvent.UPDATE_UI_HERO_ABILITY, this, (job) => {
			// 	this.updateProps(job);
			// });
			GameApp.LListener.on(LcpEvent.UPDATE_UI_HERO_POWER, this, (job) => {
				this.updateFight(job);
			});

		}

		public destroy(isbool) {
			GameApp.LListener.offCaller(LcpEvent.UPDATE_UI_HERO_ABILITY, this);
			GameApp.LListener.offCaller(LcpEvent.UPDATE_UI_HERO_POWER, this);
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
			// 拉取弟子属性信息
			// let pkt = new ProtoCmd.SUBCMD_HERO_ABILITY();
			// pkt.setValue('btJob', this.job);
			// lcp.send(pkt);
			this.init_heroState();
			//职业
			this.lbl_job.text = LangConfig.JOB_TYPEDES[EnumData.JOB_TYPE[this.job]]
			//弟子半身像
			this.img_hero.skin = LangConfig.getPlayerAvatarSkinV1(GameApp.MainPlayer.heroSex, this.job)
			//合击技能
			let skillInfo = GameApp.MainPlayer.skillInfo;
			let index = '500' + this.job;
			let heji_icon = SheetConfig.mydb_magic_tbl.getInstance(null).ICONPATH(skillInfo[index].configID)
			this.btn_wuxue.skin = "image/common/skill/skill_icon_" + heji_icon + ".png";
			this.lbl_wuxue.text=SheetConfig.mydb_magic_tbl.getInstance(null).NAME(skillInfo[index].configID)
			// 装备
			for (let i = 0; i < 10; i++) {
				(this['ui_item' + i] as view.compart.EquipInBodybgItem).clearItem();
			}
			switch (this.job) {
				case 1:
					this.HEADDRESS = EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_HEADDRESS;
					this.BELT = EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_BELT;
					//等级
					this.lbl_level.text = '' + GameApp.MainPlayer.hero1.level + '级';
					//攻击类型
					this.lbl_killtype.text = '外功';
					this.btn_next.visible = true;
					this.btn_previous.visible = false;
					break;
				case 2:
					this.HEADDRESS = EnumData.emEquipPosition.EQUIP_HERO_MAGE_HEADDRESS;
					this.BELT = EnumData.emEquipPosition.EQUIP_HERO_MAGE_BELT;
					//等级
					this.lbl_level.text = '' + GameApp.MainPlayer.hero2.level + '级';
					//攻击类型
					this.lbl_killtype.text = '内功';
					this.btn_next.visible = true;
					this.btn_previous.visible = true;
					break;
				case 3:
					this.HEADDRESS = EnumData.emEquipPosition.EQUIP_HERO_MONK_HEADDRESS;
					this.BELT = EnumData.emEquipPosition.EQUIP_HERO_MONK_BELT;
					//等级
					this.lbl_level.text = '' + GameApp.MainPlayer.hero3.level + '级';
					//攻击类型
					this.lbl_killtype.text = '内功';
					this.btn_next.visible = false;
					this.btn_previous.visible = true;
					break;
			}
			// 判断是否解锁
			if (GameApp.MainPlayer.heroObj(this.job).lockState != 2) { return };
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
		/**
		 * 切换英雄出战状态
		 */
		public init_ChangeHero(): void {
			let pkt = new ProtoCmd.QuestClientData();
			let num = this.job - 1;
			pkt.setString(ProtoCmd.Hero_ChangeHero, [num]);
			lcp.send(pkt);
		}
		public init_heroState(): void {
			//弟子出战状态
			if (GameApp.MainPlayer.curHero == undefined) {
				this.img_chuzhan.gray = true;
			}
			else {
				if (GameApp.MainPlayer.heroObj(this.job).isOnBattle) {
					this.img_chuzhan.gray = false;
				} else {
					this.img_chuzhan.gray = true;
				}
			}
		}
		/**
		 * 更新战斗属性
		 */
		// public updateProps(job): void {
		// 	if (job != this.job) return;
		// 	console.log('更新了战力+' + job)
		// 	let data = GameApp.MainPlayer.heroObj(this.job).ability;
		// 	// 血-生命值
		// 	let func = LangConfig.getBigNumberDes;
		// 	this.lbl_Hp.text = '' + func(data.nowHP) + '/' + func(data.nMaxHP);
		// 	// 攻-攻击
		// 	switch (this.job) {
		// 		case EnumData.JOB_TYPE.JOB_WARRIOR:
		// 			this.lbl_atk.text = '' + func(data.nMinDC) + '-' + func(data.nMaxDC);
		// 			break;
		// 		case EnumData.JOB_TYPE.JOB_MAGE:
		// 			this.lbl_atk.text = '' + func(data.nMinMC) + '-' + func(data.nMaxMC);
		// 			break;
		// 		case EnumData.JOB_TYPE.JOB_MONK:
		// 			this.lbl_atk.text = '' + func(data.nMinSC) + '-' + func(data.nMaxSC);
		// 			break;
		// 	}
		// 	// 抗-物理防御
		// 	this.lbl_phyDef.text = '' + func(data.nMinAC) + '-' + func(data.nMaxAC);
		// 	// 化-魔法防御
		// 	this.lbl_migDef.text = '' + func(data.nMinMAC) + '-' + func(data.nMaxMAC);
		// 	// 准-准确
		// 	this.lbl_zhunQue.text = '' + func(data.nHit);
		// 	// 躲-闪避
		// 	this.lbl_shanbi.text = '' + func(data.nJuck);
		// 	// 巧-暴击
		// 	this.lbl_baoJi.text = '' + func(data.nCrit);
		// 	// 狠-爆伤
		// 	this.lbl_baoShang.text = '' + func(data.nAtkCrit);
		// 	// 幸-幸运
		// 	this.lbl_xingYun.text = '' + func(data.nLucky);
		// 	// 韧-韧性
		// 	this.lbl_renxing.text = '' + func(data.nCritResi);
		// }

		/**
		 * 更新战力
		 */
		public updateFight(job) {
			//战力
			if (job != this.job) return;
			this.lbl_zhanli.text = '' + LangConfig.getBigNumberDes(GameApp.MainPlayer.heroObj(this.job).ability.nFight);
		}
	}
}