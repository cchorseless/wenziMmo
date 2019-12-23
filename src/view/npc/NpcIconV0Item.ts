/**Created by the LayaAirIDE*/
module view.npc {
	export class NpcIconV0Item extends ui.npc.NpcIconV0ItemUI {
		constructor() {
			super();
		}
		public item;
		public init_monster(bossdata: GameObject.Creature): NpcIconV0Item {
			this.box_daoju.visible = false;
			this.box_monster.visible = true;
			//怪物等级
			this.lbl_lvl.text = 'LV.' + bossdata.level;
			let bossid = bossdata.feature.dwCretTypeId;
			//怪物头像
			this.img_player.skin = 'image/common/npc/npc_icon_' + SheetConfig.mydb_monster_tbl.getInstance(null).HEAD_IMAGE('' + bossid) + '.png';
			//怪物名称
			this.lbl_name.text = bossdata.objName;
			return this;
		}
		public init_item(itemData: ProtoCmd.ItemBase): NpcIconV0Item {
			this.item = itemData;
			this.box_daoju.visible = true;
			this.box_monster.visible = false;
			let itemInfo = new ProtoCmd.ItemBase();
			itemInfo.clone(itemData.data);
			this.ui_item.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL);
			//物品名称
			this.lbl_itemName.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + itemData.dwBaseID);
			if (itemData.i64OwnerId.id != GameApp.MainPlayer.onlyId&&itemData.dwExpireTime!=0) {
				this.box_protect.visible = true;
				Laya.timer.loop(40, this, this.init_time);
			} else {
				this.box_protect.visible = false;
			}
			return this;
		}
		/**
		 * 物品到期时间倒计时
		 */
		public init_time(): void {
			let itemData = GameApp.MainPlayer.allItem;
			for (let _item in itemData) {
				if (itemData[_item].i64ItemID == this.item.i64ItemID) {
					this.lbl_time.text=''+itemData[_item].dwExpireTime;
				}
			}
		}
	}
}