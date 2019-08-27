/**Created by the LayaAirIDE*/
module view.dialog {
	export class ShopBuyItemV1Dialog extends ui.dialog.ShopBuyItemV1DialogUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.itf_Shop_ShopItem;
		public setData(item: ProtoCmd.itf_Shop_ShopItem): ShopBuyItemV1Dialog {
			this.item = item;
			// 道具ID
			let dwBaseID = '' + item.itemid;
			// 消耗货币描述
			this.lbl_coinDes.text = '' + '消耗' + ['', '元宝', '礼券', '金币', '荣誉', '帮贡'][item.pricetype];
			// 消耗货币ICON
			// let coinPicList=
			// 是否绑定
			this.lbl_isLock.visible = Boolean(item.binding);
			// 物品名称
			this.lbl_itemName.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME(dwBaseID);
			// 物品描述
			this.div_itemDes.innerHTML = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES(dwBaseID);
			// 玩家回收经验
			this.lbl_playerRecover.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).RECOVEREXP(dwBaseID);
			// 帮会回收贡献值
			this.lbl_guildRecover.text = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).CONTRIBUTIONVALUE(dwBaseID);
			// 道具类型
			this.lbl_type.text = '部位:' + ['头盔', '项链', '衣服', '武器', '手镯', '手镯', '戒指', '戒指', '鞋字', '腰带'][SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMPOSITION(dwBaseID)];
			// 道具职业
			this.lbl_job.text = '职业:' + ['通用', '战士', '法师', '道士'][SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB(dwBaseID)];
			// 道具等级，使用等级
			let zs_level = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(dwBaseID);
			this.lbl_level.text = '等级:' + (zs_level == 0 ? '' : '' + zs_level + '转') + SheetConfig.mydb_item_base_tbl.getInstance(null).LVNEED(dwBaseID) + '级';
			// 道具性别
			this.lbl_sex.text = '性别:' + ['通用', '男', '女'][SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMSEX(dwBaseID)];
			// 是否绑定
			this.ui_item.img_lock.visible = Boolean(item.binding);
			// 物品ICON
			this.ui_item.img_item.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(dwBaseID) + '.png';
			// 底图
			this.ui_item.img_bg.skin = 'image/common/daoju/quality_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(dwBaseID) + '.png';
			// 物品数量
			this.ui_item.lbl_count.text = '' + item.num;
			// 花费总价
			this.lbl_coinPrice.text = '' + Math.ceil(item.price * item.discount / 10);

			this.addEvent();
			return this;
		}

		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close);
			this.btn_buy.on(Laya.UIEvent.CLICK, this, this.buyItem);
		}

		public buyItem(): void {

		}
	}
}