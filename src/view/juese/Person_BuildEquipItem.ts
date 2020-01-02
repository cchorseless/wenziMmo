/**Created by the LayaAirIDE*/
module view.juese {
	export class Person_BuildEquipItem extends ui.juese.Person_BuildEquipItemUI {
		constructor() {
			super();
		}
		public data;
		public setData(item): Person_BuildEquipItem {
			this.data = item;
			//穿戴位置
			let name;
			switch (item.pos) {
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
			this.lbl_name.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(item.id);
			//使用等级
			if (item.zsLevel == 0) {
				this.lbl_lvl.text = item.lvl + '级';
			} else {
				this.lbl_lvl.text = item.zsLevel + '转' + item.lvl + '级';
			}
			let itemInfo = new ProtoCmd.ItemBase();
			itemInfo.dwBaseID = item.id;
			this.ui_item.setData(itemInfo);
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.on(Laya.UIEvent.CLICK, this, () => {
				GameApp.LListener.event(ProtoCmd.JS_updateBuildEquip,(this.data))
			})
		}
		public destroy(isbool): void {
			GameApp.LListener.offCaller(ProtoCmd.JS_updateBuildEquip, this);
			super.destroy(isbool);
		}
	}
}