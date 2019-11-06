/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_EquipInfoItem extends ui.juese.Person_EquipInfoItemUI {
		constructor() {
			super();
		}
		public hasInit = false;// 初始化自己
		public setData(): void {
			if (this.hasInit) { return };
			this.hasInit = true;
			this.initUI();
			this.addEvent();
			this.getEquipMasterInfo();
			this.getEquipBackground();
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_equip, Laya.UIEvent.CLICK, this, () => {
				let o = new Person_Equip_SoulContentDialog()
				o.setData(0)
				o.popup();

			})
			EventManage.onWithEffect(this.btn_intensify, Laya.UIEvent.CLICK, this, () => {
				let o = new Person_IntensifyContentDialog()
				o.setData()
				o.popup();
			})
			EventManage.onWithEffect(this.btn_soul, Laya.UIEvent.CLICK, this, () => {
				let o = new Person_Equip_SoulContentDialog()
				o.setData(1)
				o.popup();
			})

		}

		public initUI(): void {
			let sex = GameApp.MainPlayer.sex;
			let sexName;
			if (sex == EnumData.SEX_TYPE.SEX_MAN) {
				sexName = 'nan';
			}
			if (sex == EnumData.SEX_TYPE.SEX_WOMEN) {
				sexName = 'nv';
			}
			this.img_avatarPic.skin='image/common/'+sexName+'0'+GameApp.MainPlayer.job+'_half.png'
			let allKey = Object.keys(GameApp.GameEngine.equipDB);
			for (let key of allKey) {
				let _itemBase: ProtoCmd.ItemBase = GameApp.GameEngine.equipDB[key];
				let btLocation = _itemBase.location.getValue('btLocation');
				let btIndex = _itemBase.location.getValue('btIndex');
				// 筛选合适的装备
				if (btLocation == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP && btIndex <= EnumData.emEquipPosition.EQUIP_BELT && btIndex >= EnumData.emEquipPosition.EQUIP_HEADDRESS) {
					let itemUI = new view.compart.DaoJuItem();
					itemUI.setData(_itemBase, EnumData.ItemInfoModel.SHOW_IN_PLAYER);
					(this['ui_item' + btIndex] as view.compart.EquipInBodybgItem).addItem(itemUI);
				}
			}
			let player = GameApp.MainPlayer;
			let ability = player.ability;
			// 血-生命值
			this.lbl_Hp.text = '' + ability.nowHP + '/' + ability.nMaxHP;
			// 气-魔法值
			this.lbl_Mp.text = '' + ability.nowMP + '/' + ability.nMaxMP;
			// 耐-内功值
			this.lbl_neiGong.text = '' + ability.nowInnerValue + '/' + ability.nInnerValue;
			// 攻-攻击
			switch (player.job) {
				case EnumData.JOB_TYPE.JOB_WARRIOR:
					this.lbl_atk.text = '' + ability.nMinDC + '-' + ability.nMaxDC;
					break;
				case EnumData.JOB_TYPE.JOB_MAGE:
					this.lbl_atk.text = '' + ability.nMinMC + '-' + ability.nMaxMC;
					break;
				case EnumData.JOB_TYPE.JOB_MONK:
					this.lbl_atk.text = '' + ability.nMinSC + '-' + ability.nMaxSC;
					break;
			}
			// 抗-物理防御
			this.lbl_phyDef.text = '' + ability.nMinAC + '-' + ability.nMaxAC;
			// 化-魔法防御
			this.lbl_migDef.text = '' + ability.nMinMAC + '-' + ability.nMaxMAC;
			// 准-准确
			this.lbl_zhunQue.text = '' + ability.nHit;
			// 躲-闪避
			this.lbl_shanbi.text = '' + ability.nJuck;
			// 巧-暴击
			this.lbl_baoJi.text = '' + ability.nCrit;
			// 狠-爆伤
			this.lbl_baoShang.text = '' + ability.nAtkCrit;
			// 幸-幸运
			this.lbl_xingYun.text = '' + ability.nLucky;
			// 韧-韧性
			this.lbl_renxing.text = '' + ability.nCritResi;
			// 侠义值-PK值
			this.lbl_pk.text = '' + player.feature.getValue('wNowKilling');
		}

		/**
		 * 拉取强化大师
		 */
		public getEquipMasterInfo(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.JS_SoulNecklacePanel, [0], null, this, (jsonData) => {
				console.log(jsonData)
			})
			lcp.send(pkt);
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
	}
}