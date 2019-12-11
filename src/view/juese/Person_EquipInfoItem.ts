/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_EquipInfoItem extends ui.juese.Person_EquipInfoItemUI {
		constructor() {
			super();
			this.setData();
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
			//精炼
			EventManage.onWithEffect(this.btn_equip, Laya.UIEvent.CLICK, this, () => {
				let o = new Person_Equip_SoulContentDialog()
				o.setData(1)
				o.popup();

			})
			//强化
			EventManage.onWithEffect(this.btn_intensify, Laya.UIEvent.CLICK, this, () => {
				let o = new Person_IntensifyContentDialog()
				o.setData()
				o.popup();
			})
			//等级
			EventManage.onWithEffect(this.btn_soul, Laya.UIEvent.CLICK, this, () => {
				let o = new Person_Equip_SoulContentDialog()
				o.setData(0)
				o.popup();
			})
			//装备打造
			EventManage.onWithEffect(this.btn_equipBuild, Laya.UIEvent.CLICK, this, () => {
				new view.juese.Person_BuildEquipDialog().popup();
			})
			//武学基础
			EventManage.onWithEffect(this.btn_wuXueBase, Laya.UIEvent.CLICK, this, () => {
				new view.juese.Person_WuXueBaseDialog().popup();
			})
			//战斗属性介绍
			// EventManage.onWithEffect(this.btn_shuxing, Laya.UIEvent.CLICK, this, () => {
			// 	new view.dialog.InfoV1Dialog().popup();
			// })
			this.btn_prestige.on(Laya.UIEvent.CLICK, this, function () {
				let o = new Person_shengwangMainDialog();
				o.popup(true);
			})
		}

		public initUI(): void {
			let func = LangConfig.getBigNumberDes;
			//战力
			this.lbl_zhanli.text = '' + func(GameApp.MainPlayer.ability.nFight);
			//玩家倒影全身像
			this.img_avatarPic.skin = LangConfig.getPlayerAvatarSkinV1()
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
			//出身
			let player = GameApp.MainPlayer;
			this.lbl_job.text = LangConfig.JOB_TYPEDES[EnumData.JOB_TYPE[player.job]];
			//等级
			this.lbl_level.text = player.zslevel + '转' + player.level + '级';
			//角色名
			this.lbl_name.text = player.objName;
			// 声望信息
			this.lbl_shengWang.text = '[' + LangConfig.getFameDes(player.wealth.nowFame) + ']';
			//攻击类型
			this.lbl_killType.text = LangConfig.getWuXueAttackType();
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
				this['ui_item' + i].img_bg.skin = 'image/common/daoju/itemicon_bg_' + (i + 10) + '.png';
			}
		}
	}
}