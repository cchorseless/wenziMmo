/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_EquipInfoItem extends ui.hero.Hero_EquipInfoItemUI {
		constructor() {
			super();
			this.getEquipBackground();
			this.addEvent();
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
			//战斗属性介绍
			EventManage.onWithEffect(this.btn_shuxing, Laya.UIEvent.CLICK, this, () => {
				new view.dialog.InfoV1Dialog().popup();
			})
			this.addLcpEvent();
		}

		public addLcpEvent() {
			GameApp.LListener.on(LcpEvent.UPDATE_UI_HERO_ABILITY, this, (job) => {
				this.updateProps(job);
			});
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
		public setData(job): void {
			this.job = job;
			console.log(this.job)
			// 判断是否解锁
			if (GameApp.MainPlayer.heroObj(this.job).lockState != 2) { return };
			// 拉取弟子属性信息
			let pkt = new ProtoCmd.SUBCMD_HERO_ABILITY();
			pkt.setValue('btJob', this.job);
			lcp.send(pkt);
			//弟子半身像
			this.img_hero.skin = LangConfig.getPlayerAvatarHalfSkin(GameApp.MainPlayer.heroSex, this.job)
			// 装备
			for (let i = 0; i < 10; i++) {
				(this['ui_item' + i] as view.compart.EquipInBodybgItem).clearItem();
			}
			switch (this.job) {
				case 1:
					this.HEADDRESS = EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_HEADDRESS;
					this.BELT = EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_BELT;
					break;
				case 2:
					this.HEADDRESS = EnumData.emEquipPosition.EQUIP_HERO_MAGE_HEADDRESS;
					this.BELT = EnumData.emEquipPosition.EQUIP_HERO_MAGE_BELT;
					break;
				case 3:
					this.HEADDRESS = EnumData.emEquipPosition.EQUIP_HERO_MONK_HEADDRESS;
					this.BELT = EnumData.emEquipPosition.EQUIP_HERO_MONK_BELT;
					break;
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
		/**
		 * 更新战斗属性
		 */
		public updateProps(job): void {
			if (job != this.job) return;
			console.log('更新了战力+' + job)
			let data = GameApp.MainPlayer.heroObj(this.job).ability;
			// 血-生命值
			let func = LangConfig.getBigNumberDes;
			this.lbl_Hp.text = '' + func(data.nowHP) + '/' + func(data.nMaxHP);
			// 攻-攻击
			switch (this.job) {
				case EnumData.JOB_TYPE.JOB_WARRIOR:
					this.lbl_atk.text = '' + func(data.nMinDC) + '-' + func(data.nMaxDC);
					break;
				case EnumData.JOB_TYPE.JOB_MAGE:
					this.lbl_atk.text = '' + func(data.nMinMC) + '-' + func(data.nMaxMC);
					break;
				case EnumData.JOB_TYPE.JOB_MONK:
					this.lbl_atk.text = '' + func(data.nMinSC) + '-' + func(data.nMaxSC);
					break;
			}
			// 抗-物理防御
			this.lbl_phyDef.text = '' + func(data.nMinAC) + '-' + func(data.nMaxAC);
			// 化-魔法防御
			this.lbl_migDef.text = '' + func(data.nMinMAC) + '-' + func(data.nMaxMAC);
			// 准-准确
			this.lbl_zhunQue.text = '' + func(data.nHit);
			// 躲-闪避
			this.lbl_shanbi.text = '' + func(data.nJuck);
			// 巧-暴击
			this.lbl_baoJi.text = '' + func(data.nCrit);
			// 狠-爆伤
			this.lbl_baoShang.text = '' + func(data.nAtkCrit);
			// 幸-幸运
			this.lbl_xingYun.text = '' + func(data.nLucky);
			// 韧-韧性
			this.lbl_renxing.text = '' + func(data.nCritResi);
		}

		/**
		 * 更新战力
		 */
		public updateFight(job) {
			//战力
			if (job != this.job) return;
			this.lbl_zhanli.value = '' + LangConfig.getBigNumberDes(GameApp.MainPlayer.heroObj(this.job).ability.nFight);
		}
	}
}