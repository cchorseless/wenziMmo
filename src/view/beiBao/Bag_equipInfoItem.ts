/**Created by the LayaAirIDE*/
module view.beiBao {
	export class Bag_equipInfoItem extends ui.beiBao.Bag_equipInfoItemUI {
		public curCreater = 0;;
		constructor() {
			super();
			this.setData();
		}
		public battle;
		public setData(): void {
			// this.tab_0.selectHandler = Laya.Handler.create(this, this.updateUI, null, false);
			for (let i = 0; i < 10; i++) {
				this['ui_item' + i].img_bg.visible = true;
				this['ui_item' + i].img_bg.skin = 'image/common/daoju/itemicon_bg_' + (i + 10) + '.png';
			}
			let heroSex = GameApp.MainPlayer.heroSex;
			this.ui_tab0.img_icon.skin = LangConfig.getPlayerIconSkinV1();
			this.ui_tab1.img_icon.skin = LangConfig.getPlayerIconSkinV1(heroSex, EnumData.JOB_TYPE.JOB_WARRIOR);
			this.ui_tab2.img_icon.skin = LangConfig.getPlayerIconSkinV1(heroSex, EnumData.JOB_TYPE.JOB_MAGE);
			this.ui_tab3.img_icon.skin = LangConfig.getPlayerIconSkinV1(heroSex, EnumData.JOB_TYPE.JOB_MONK);
			// this.ui_tab0.img_icon.visible= false;
			this.ui_tab0.img_circle.visible = true;
			this.ui_tab1.img_circle.visible = false;
			this.ui_tab2.img_circle.visible = false;
			this.ui_tab3.img_circle.visible = false;
			this.ui_tab0.lab_name.text = "玩家";
			this.ui_tab1.lab_name.text = "大弟子";
			this.ui_tab2.lab_name.text = "二弟子";
			this.ui_tab3.lab_name.text = "三弟子";
			this.setPlayerHalfSkin(0)
			for (let i = 1; i < 4; i++) {
				if (GameApp.GameEngine.mainPlayer["hero" + i].lockState != 2) {
					this["ui_tab" + i].disabled = true;
				}
				else {
					this["ui_tab" + i].disabled = false;
				}
			}



			this.updateUI();
			this.addEvent();
		}

		public addEvent(): void {
			this.addLcpEvent();
			for (let i = 0; i < 4; i++) {
				this["ui_tab" + i].on(Laya.UIEvent.CLICK, this, () => {
					this.curCreater = i;
					this.reSetState(i)
					this.updateUI();
					this.setPlayerHalfSkin(i)

				})
			}
		}
		public setPlayerHalfSkin(id) {
			let heroSex = GameApp.MainPlayer.heroSex;
			switch (id) {
				case 0:
					this.img_playerPic.skin = LangConfig.getPlayerAvatarSkinV1();
					break;
				case 1:
					this.img_playerPic.skin = LangConfig.getPlayerAvatarSkinV1(heroSex, EnumData.JOB_TYPE.JOB_WARRIOR);
					break;
				case 2:
					this.img_playerPic.skin = LangConfig.getPlayerAvatarSkinV1(heroSex, EnumData.JOB_TYPE.JOB_MAGE);
					break;
				case 3:
					this.img_playerPic.skin = LangConfig.getPlayerAvatarSkinV1(heroSex, EnumData.JOB_TYPE.JOB_MONK);
					break;
			}
		}
		public reSetState(id) {
			for (let i = 0; i < 4; i++) {
				this["ui_tab" + i].img_circle.visible = false
				if (i == id) {
					this["ui_tab" + i].img_circle.visible = true
				}
			}
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(ProtoCmd.playerBttle, this, (dwType, battle) => {
				if (dwType == 0) {
					this.battle = battle;
				}
			})
			GameApp.LListener.on(LcpEvent.UPDATE_UI_PLAYER_POWER, this, () => {
				let after=GameApp.GameEngine.mainPlayer.ability.nFight;
				if (this.curCreater == 0) {
					GameUtil.battleChange(0, null, this.lbl_zhanLi, this.battle,after);
				}
			})
		}
		public destroy(isbool) {
			GameApp.LListener.offCaller(LcpEvent.UPDATE_UI_PLAYER_POWER, this);
			GameApp.LListener.offCaller(ProtoCmd.playerBttle, this);
			super.destroy(isbool);
		}
		public updateUI(): void {
			for (let i = 0; i < 10; i++) {
				(this['ui_item' + i] as view.compart.EquipInBodybgItem).clearItem();
			}
			let power: string = "";
			switch (this.curCreater) {
				case 0:
					power = GameApp.GameEngine.mainPlayer.ability.nFight.toString();
					break;
				case 1:
					power = GameApp.GameEngine.mainPlayer.hero1.ability.nFight.toString();
					break;
				case 2:
					power = GameApp.GameEngine.mainPlayer.hero2.ability.nFight.toString();
					break;
				case 3:
					power = GameApp.GameEngine.mainPlayer.hero3.ability.nFight.toString();
					break;
			}
			// this.curCreater
			this.lbl_zhanLi.text = '' + power;
			let small_index;
			let big_index;
			switch (GameApp.GameEngine.mainPlayer.playerORHero) {
				// 玩家自己
				case 0:
					big_index = EnumData.emEquipPosition.EQUIP_BELT;
					small_index = EnumData.emEquipPosition.EQUIP_HEADDRESS;
					break;

				// 大弟子
				case 1:
					big_index = EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_BELT;
					small_index = EnumData.emEquipPosition.EQUIP_HERO_WARRIOR_HEADDRESS;
					break;

				// 二弟子
				case 2:
					big_index = EnumData.emEquipPosition.EQUIP_HERO_MAGE_BELT;
					small_index = EnumData.emEquipPosition.EQUIP_HERO_MAGE_HEADDRESS;
					break;

				// 三弟子
				case 3:
					big_index = EnumData.emEquipPosition.EQUIP_HERO_MONK_BELT;
					small_index = EnumData.emEquipPosition.EQUIP_HERO_MONK_HEADDRESS;
					break;

			}
			let allKey = Object.keys(GameApp.GameEngine.equipDB);
			for (let key of allKey) {
				let _itemBase: ProtoCmd.ItemBase = GameApp.GameEngine.equipDB[key];
				let btLocation = _itemBase.location.getValue('btLocation');
				let btIndex = _itemBase.location.getValue('btIndex');
				// 筛选合适的装备
				if (btLocation == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP && btIndex <= big_index && btIndex >= small_index) {
					let itemUI = new view.compart.DaoJuItem();
					itemUI.setData(_itemBase, EnumData.ItemInfoModel.SHOW_IN_PLAYER);
					(this['ui_item' + (btIndex - small_index)] as view.compart.EquipInBodybgItem).addItem(itemUI);
				}
			}
		}

	}
}