/**Created by the LayaAirIDE*/
module view.npc {
	export class NPC_itemBase extends ui.npc.NPC_itemBaseUI {
		public type;
		public itemID;
		public index;
		constructor() {
			super();
			this.addEvent()
		}
		public initView() {
			this.img_bg.skin = '';
			this.img_icon.skin = '';
			this.lab_num.text = '';

		}
		/**
		 * 
		 * @param itemID   itemid
		 * @param num      数量、几率
		 * @param type     类型： 0 偷窃 几率  1：下毒 数量 2：治疗 数量 3：送礼 数量
		 * @param type     UI标号  id
		 */
		public setData(itemID, num, type, id) {
			this.index = id;
			this.itemID = itemID;


			// 物品ICON
			this.img_icon.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(itemID) + '.png';
			// 底图
			this.img_bg.skin = 'image/common/daoju/quality_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(itemID) + '.png';

			this.type = type;
			switch (type) {
				case 0:
					this.lab_num.text = num + '%';
					break;
				case 1:
					this.lab_num.text = num + '';
					break;
				case 2:
					this.lab_num.text = num + '';
					break;
				case 3:
					this.lab_num.text = num + '';
					break;
			}
			this.setLight(false)
		}
		public setLight(boo: boolean) {
			this.img_light.visible = boo;
		}
		public addEvent() {
			// this.on(Laya.UIEvent.CLICK, this, function () {
			// 	switch (this.type) {
			// 		case 0:
			// 			Main_Npc_stealitem.self.touchID = this.index;
			// 			break;
			// 		case 1:

			// 			break;
			// 		case 2:

			// 			break;
			// 		case 3:

			// 			break;
			// 	}
			// })
		}
	}
}