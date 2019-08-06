/**Created by the LayaAirIDE*/
module view.compart {
	export class Person_EquipInfoItem extends ui.compart.Person_EquipInfoItemUI {
		constructor() {
			super();
			this.setData();
		}

		public setData(): void {
			this.initUI();
			this.addEvent();
		}
		public addEvent(): void {

		}

		public initUI(): void {
			let allKey = Object.keys(GameApp.GameEngine.equipDB);
			for (let key of allKey) {
				let _itemBase: ItemBase = GameApp.GameEngine.equipDB[key];
				let btLocation = _itemBase.location.getValue('btLocation');
				let btIndex = _itemBase.location.getValue('btIndex');
				console.log('====>', btLocation, btIndex);
				// 筛选合适的装备
				if (btLocation == EnumData.PACKAGE_TYPE.ITEMCELLTYPE_EQUIP && btIndex <= EnumData.emEquipPosition.EQUIP_BELT && btIndex >= EnumData.emEquipPosition.EQUIP_HEADDRESS) {
					let itemUI = new view.compart.DaoJuItem();
					itemUI.setData(_itemBase, EnumData.ItemInfoModel.SHOW_IN_PLAYER);
					(this['ui_item' + btIndex] as view.compart.DaoJuBgItem).addItem(itemUI);
				}
			}
		}
	}
}