/**Created by the LayaAirIDE*/
module view.hero {
	export class Hero_EquipInfoItem extends ui.hero.Hero_EquipInfoItemUI {
		constructor() {
			super();
			this.setData();
		}
		private HEADDRESS;
		private BELT;
		private job;
		public setData(): void {
			this.addEvent();
			this.getEquipBackground();

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

		}
		/**
		 * 初始化装备背景
		 */
		public getEquipBackground(): void {
			for (let i = 0; i < 10; i++) {
				this['ui_item' + i].img_bg.visible = true;
				this['ui_item' + i].img_bg.skin = 'image/common/daoju/itemicon_bg_' + i + '.png';
			}
		}
		public baseInfo(i): void {
			for (let i = 0; i < 10; i++) {
				(this['ui_item' + i] as view.compart.EquipInBodybgItem).clearItem();
			}
			let j = i + 1
			let pkt = new ProtoCmd.QuestClientData();
			this.job = GameApp.GameEngine.HeroInfo[j].JOB;
			switch (this.job) {
				case 1:
					this.HEADDRESS = EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_HEADDRESS;
					this.BELT = EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_BELT;
					//战力
					this.lbl_zhanli.value = '' + LangConfig.getBigNumberDes(GameApp.GameEngine.warriorAbility.nFight);
					break;
				case 2:
					this.HEADDRESS = EnumData.emEquipPosition.EQUIP_HERO_MAGE_HEADDRESS;
					this.BELT = EnumData.emEquipPosition.EQUIP_HERO_MAGE_BELT;
					//战力
					this.lbl_zhanli.value = '' + LangConfig.getBigNumberDes(GameApp.GameEngine.masterAbility.nFight);
					break;
				case 3:
					this.HEADDRESS = EnumData.emEquipPosition.EQUIP_HERO_MONK_HEADDRESS;
					this.BELT = EnumData.emEquipPosition.EQUIP_HERO_MONK_BELT;
					//战力
					this.lbl_zhanli.value = '' + LangConfig.getBigNumberDes(GameApp.GameEngine.taoistAbility.nFight);
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
			//弟子半身像
			let heroSex;
			if (GameApp.MainPlayer.sex == EnumData.SEX_TYPE.SEX_MAN) {
				heroSex = EnumData.SEX_TYPE.SEX_WOMEN;
			}
			if (GameApp.MainPlayer.sex == EnumData.SEX_TYPE.SEX_WOMEN) {
				heroSex = EnumData.SEX_TYPE.SEX_MAN;
			}
			this.img_hero.skin = LangConfig.getPlayerAvatarHalfSkin(heroSex, this.job)
			this.initUI(j);
		}
		public initUI(j): void {
			let pkt = new ProtoCmd.SUBCMD_HERO_ABILITY();
			pkt.setValue('btJob', j);
			lcp.send(pkt);
			let data;
			switch (j) {
				case 1:
					data = GameApp.GameEngine.warriorAbility;
					break;
				case 2:
					data = GameApp.GameEngine.masterAbility;
					break;
				case 3:
					data = GameApp.GameEngine.taoistAbility;
					break;
			}
			// 血-生命值
			this.lbl_Hp.text = '' + data.nowHP + '/' + data.nMaxHP;
			// 气-魔法值
			this.lbl_Mp.text = '' + data.nowMP + '/' + data.nMaxMP;
			// 耐-内功值
			this.lbl_neiGong.text = '' + data.nowInnerValue + '/' + data.nInnerValue;
			// 攻-攻击
			switch (this.job) {
				case EnumData.JOB_TYPE.JOB_WARRIOR:
					this.lbl_atk.text = '' + data.nMinDC + '-' + data.nMaxDC;
					break;
				case EnumData.JOB_TYPE.JOB_MAGE:
					this.lbl_atk.text = '' + data.nMinMC + '-' + data.nMaxMC;
					break;
				case EnumData.JOB_TYPE.JOB_MONK:
					this.lbl_atk.text = '' + data.nMinSC + '-' + data.nMaxSC;
					break;
			}
			// 抗-物理防御
			this.lbl_phyDef.text = '' + data.nMinAC + '-' + data.nMaxAC;
			// 化-魔法防御
			this.lbl_migDef.text = '' + data.nMinMAC + '-' + data.nMaxMAC;
			// 准-准确
			this.lbl_zhunQue.text = '' + data.nHit;
			// 躲-闪避
			this.lbl_shanbi.text = '' + data.nJuck;
			// 巧-暴击
			this.lbl_baoJi.text = '' + data.nCrit;
			// 狠-爆伤
			this.lbl_baoShang.text = '' + data.nAtkCrit;
			// 幸-幸运
			this.lbl_xingYun.text = '' + data.nLucky;
			// 韧-韧性
			this.lbl_renxing.text = '' + data.nCritResi;
		}
	}
}