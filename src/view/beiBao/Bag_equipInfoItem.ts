/**Created by the LayaAirIDE*/
module view.beiBao {
	export class Bag_equipInfoItem extends ui.beiBao.Bag_equipInfoItemUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.tab_0.selectHandler = Laya.Handler.create(this, this.updateUI, null, false);
			this.updateUI();
		}
		public updateUI(): void {
			for (let i = 0; i < 10; i++) {
				(this['ui_item' + i] as view.compart.EquipInBodybgItem).clearItem();
			}
			let small_index;
			let big_index;
			switch (this.tab_0.selectedIndex) {
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