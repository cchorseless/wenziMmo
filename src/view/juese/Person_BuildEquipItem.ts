/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_BuildEquipItem extends ui.juese.Person_BuildEquipItemUI {
		constructor() {
			super();
		}
		public data;
		public setData(data): Person_BuildEquipItem {
			this.data = data;
			//穿戴位置
			let name;
			switch (data[9]) {
				case EnumData.emEquipPosition.EQUIP_HEADDRESS:
				case EnumData.emEquipPosition.EQUIP_LEGEND_HEADDRESS:
					name = '帽子';
					break;
				case EnumData.emEquipPosition.EQUIP_NECKLACE:
				case EnumData.emEquipPosition.EQUIP_LEGEND_NECKLACE:
					name = '项链';
					break;
				case EnumData.emEquipPosition.EQUIP_CLOTHES:
				case EnumData.emEquipPosition.EQUIP_LEGEND_CLOTHES:
					name = '衣服';
					break;
				case EnumData.emEquipPosition.EQUIP_WEAPONS:
				case EnumData.emEquipPosition.EQUIP_LEGEND_WEAPONS:
					name = '武器';
					break;
				case EnumData.emEquipPosition.EQUIP_BRACELET_LEFT:
				case EnumData.emEquipPosition.EQUIP_BRACELET_RIGHT:
				case EnumData.emEquipPosition.EQUIP_LEGEND_BRACELET_LEFT:
				case EnumData.emEquipPosition.EQUIP_LEGEND_BRACELET_RIGHT:
					name = '手镯';
					break;
				case EnumData.emEquipPosition.EQUIP_RING_LEFT:
				case EnumData.emEquipPosition.EQUIP_RING_RIGHT:
				case EnumData.emEquipPosition.EQUIP_LEGEND_RING_LEFT:
				case EnumData.emEquipPosition.EQUIP_LEGEND_RING_RIGHT:
					name = '戒指';
					break;
				case EnumData.emEquipPosition.EQUIP_SHOES:
				case EnumData.emEquipPosition.EQUIP_LEGEND_SHOES:
					name = '鞋';
					break;
				case EnumData.emEquipPosition.EQUIP_BELT:
				case EnumData.emEquipPosition.EQUIP_LEGEND_BELT:
					name = '腰带';
					break;
			}
			this.lbl_pos.text = name;
			//道具名
			this.lbl_name.text = data[1];
			//使用等级
			if (data[67] == 0) {
				this.lbl_lvl.text = data[3] + '级';
			} else {
				this.lbl_lvl.text = data[67] + '转' + data[3] + '级';
			}
			let itemInfo = new ProtoCmd.ItemBase();
			itemInfo.dwBaseID = parseInt(data[0]);
			this.ui_item.setData(itemInfo)
			return this;
		}
	}
}