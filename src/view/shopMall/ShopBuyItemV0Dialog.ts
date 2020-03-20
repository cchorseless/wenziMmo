/**Created by the LayaAirIDE*/
module view.shopMall {
	export class ShopBuyItemV0Dialog extends ui.shopMall.ShopBuyItemV0DialogUI {
		constructor() {
			super();
		}

		public item: ProtoCmd.itf_Shop_ShopItem;
		public setData(item: ProtoCmd.itf_Shop_ShopItem, model: EnumData.ShopBuyPanelType): ShopBuyItemV0Dialog {
			this.lab_Name.text = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME("" + item.itemid)
			console.log('---------', item);
			this.item = item;
			let _itemBase = new ProtoCmd.ItemBase();
			_itemBase.dwBaseID = item.itemid;
			_itemBase.dwCount = item.num;
			_itemBase.dwBinding = item.binding;
			this.ui_item.setData(_itemBase);
			//物品描述
			this.html_des.style.fontSize = 25;
			this.html_des.style.wordWrap = true;
			// this.html_des.style.
			this.html_des.innerHTML = '' + SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMDES(item.itemid);
			// this.img_bg.height = this.html_des.y + this.html_des.contextHeight + 5;
			// 道具ID
			let dwBaseID = '' + item.itemid;
			// 消耗货币描述
			this.lbl_coinDes.text = '' + '消耗' + LangConfig.CoinTypeDes[EnumData.CoinType[item.pricetype]];
			// 消耗货币ICON
			this.img_coinPic1.skin = this.img_coinPic.skin = LangConfig.getCoinImagePicSkin(item.pricetype);
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
					console.log('---------', maxLimit);
					this.hsbar_count.value = this.hsbar_count.min = 1;
					// 不限购
					if (item.limitcnt <= 0) {
						this.box_count.visible = this.box_danJia.visible = true;
						// 最大购买数量
						// this.hsbar_count.max = 999;
						this.hsbar_count.max = Math.floor(GameApp.MainPlayer.wealth.gold / Math.ceil(item.price * item.discount / 10))
					}
					// 限购
					else {
						this.box_count.visible = this.box_danJia.visible = (maxLimit > 1);
						this.hsbar_count.max = maxLimit;
					}
					// 单价
					this.lbl_price.text = '' + Math.ceil(item.price * item.discount / 10);
					// 滑竿数量
					this.hsbar_count.changeHandler = Laya.Handler.create(this, (value) => {
						if (value == this.hsbar_count.max) {
							this.lab_isMax.visible = true;
						}else{
							this.lab_isMax.visible = false;
						}
						this.lbl_countDes.text = value;
						// 更新总价格
						this.lbl_coinPrice.text = '' + Math.ceil(item.price * item.discount / 10) * value;
					}, null, false);
					break;
			}
			if (!this.box_count.visible) {
				this.height -= this.box_count.height
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