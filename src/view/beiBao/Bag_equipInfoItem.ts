/**Created by the LayaAirIDE*/
module view.beiBao {
	export class Bag_equipInfoItem extends ui.beiBao.Bag_equipInfoItemUI {
		public curCreater = 0;;
		constructor() {
			super();
			this.setData();
			this.addEvent();
		}
		public battle;
		public setData(): void {
			// 初始化装备
			for (let i = 0; i < 10; i++) {
				this['ui_item' + i].setData(i);
			}
			this.updateUI();

		}

		public addEvent(): void {
			// 装备等级大师
			this.btn_lvBuff.on(Laya.UIEvent.CLICK, this, () => {
				let o = new view.juese.Person_Equip_SoulContentDialog()
				o.setData(0)
				o.popup();
			});
			this.addLcpEvent();
		}
		public addLcpEvent(): void {
			GameApp.LListener.on(LcpEvent.UPDATE_UI_PLAYER_POWER, this, () => {
				this.updateUI();
			})
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(LcpEvent.UPDATE_UI_PLAYER_POWER, this);
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
					// itemUI.scaleX = itemUI.scaleY = 1.1;
					
					itemUI.setData(_itemBase, EnumData.ItemInfoModel.SHOW_IN_PLAYER);
					(this['ui_item' + (btIndex - small_index)] as view.compart.EquipInBodybgItem).addItem(itemUI);
				}
			}
		}

	}
}