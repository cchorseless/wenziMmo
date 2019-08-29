/**Created by the LayaAirIDE*/
module view.dialog {
	export class ShopBuyItemV0Dialog extends ui.dialog.ShopBuyItemV0DialogUI {
		constructor() {
			super();
		}

		public item: ProtoCmd.itf_Shop_ShopItem;
		public setData(item: ProtoCmd.itf_Shop_ShopItem, model: EnumData.ShopBuyPanelType): ShopBuyItemV0Dialog {
			this.item = item;
			// 道具ID
			let dwBaseID = '' + item.itemid;
			// 消耗货币描述
			this.lbl_coinDes.text = '' + '消耗' + ['', '元宝', '礼券', '金币', '荣誉', '帮贡'][item.pricetype];
			// 消耗货币ICON
			this.img_coinPic.skin = 'image/main/icon_coin_' + item.pricetype + '.png';
			this.img_coinPic1.skin = 'image/main/icon_coin_' + item.pricetype + '.png';
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
			// 花费总价
			this.lbl_coinPrice.text = '' + Math.ceil(item.price * item.discount / 10);
			switch (model) {
				case EnumData.ShopBuyPanelType.SHOP_BUY_HOT_PANEL:
					// 是否多个显示单价
					this.box_danJia.visible = false;
					// 是否多个显示滑竿
					this.box_count.visible = false;
					break;
				case EnumData.ShopBuyPanelType.SHOP_BUY_GUILD_PANEL:
					// 是否多个显示单价和滑竿
					// 购买次数==1不显示
					let maxLimit = Math.max(item.limitcnt - item.curcnt, 1);
					// 最大购买数量
					this.hsbar_count.max = maxLimit;
					this.hsbar_count.value = this.hsbar_count.min = 1;
					// 不限购
					if (item.limitcnt > 0) {
						this.box_count.visible = this.box_danJia.visible = true;
					}
					// 限购
					else {
						this.box_count.visible = this.box_danJia.visible = (maxLimit > 1);
					}
					// 单价
					this.lbl_price.text = '' + Math.ceil(item.price * item.discount / 10);
					// 滑竿数量
					this.hsbar_count.changeHandler = Laya.Handler.create(this, (value) => {
						this.lbl_countDes.text = '购买数量:' + value;
						// 更新总价格
						this.lbl_coinPrice.text = '' + Math.ceil(item.price * item.discount / 10) * value;
					}, null, false);
					break;
			}
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