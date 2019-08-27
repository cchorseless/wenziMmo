/**Created by the LayaAirIDE*/
module view.dialog {
	export class ShopBuyItemV0Dialog extends ui.dialog.ShopBuyItemV0DialogUI {
		constructor() {
			super();
		}

		public item: ProtoCmd.itf_Shop_ShopItem;
		public setData(item: ProtoCmd.itf_Shop_ShopItem): ShopBuyItemV0Dialog {
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
			// 使用等级
			let zs_level = SheetConfig.mydb_item_base_tbl.getInstance(null).ZS_LEVEL(dwBaseID);
			this.lbl_useLevel.text = '使用等级：' + (zs_level == 0 ? '' : '' + zs_level + '转') + SheetConfig.mydb_item_base_tbl.getInstance(null).LVNEED(dwBaseID) + '级';
			// 使用职业
			this.lbl_jobNeed.text = '职业要求:' + ['通用', '战士', '法师', '道士'][SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMJOB(dwBaseID)];
			// 是否绑定
			this.ui_item.img_lock.visible = Boolean(item.binding);
			// 物品ICON
			this.ui_item.img_item.skin = 'image/common/daoju/itemicon_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ICONID(dwBaseID) + '.png';
			// 底图
			this.ui_item.img_bg.skin = 'image/common/daoju/quality_' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(dwBaseID) + '.png';
			// 物品数量
			this.ui_item.lbl_count.text = '' + item.num;
			// 是否多个显示单价
			this.box_danJia.visible = (item.num > 1);
			// 花费总价
			this.lbl_coinPrice.text = '' + Math.ceil(item.price * item.discount / 10);
			// 是否多个显示滑竿
			this.box_count.visible = (item.num > 1);
			// 滑竿数量
			// this.hsbar_count.changeHandler = Laya.Handler.create(this, (value) => {
			// 	this.lbl_countDes.text = '购买数量：' + value;
			// 	this.lbl_coinPrice.text = '' + item.p * value;
			// }, null, false)
			this.addEvent();
			return this;
		}

		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, this.close);
			this.btn_buy.on(Laya.UIEvent.CLICK, this, this.buyItem);
		}

		public buyItem(): void {
			let wealth = GameApp.MainPlayer.wealth
			let allcoin = ['', wealth.yuanBao, wealth.yuanBao_lock, wealth.gold, wealth.honorNum, wealth.guildDedication];
			if (allcoin[this.item.pricetype] < parseInt(this.lbl_coinPrice.text)) {
				TipsManage.showTips('货币不足');
				return;
			}
			this.close();
			let pkt = new ProtoCmd.QuestClientData();
			let data = [this.item.type, this.item.subtype, this.item.index, this.item.num];
			pkt.setString(ProtoCmd.SHOP_BuyItem, data);
			lcp.send(pkt);
		}
	}
}