/**Created by the LayaAirIDE*/
module view.shopMall {
	export class ShopBuyItemV1Dialog extends ui.shopMall.ShopBuyItemV1DialogUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.itf_Shop_ShopItem;
		public setData(item: ProtoCmd.itf_Shop_ShopItem, model: EnumData.ShopBuyPanelType): ShopBuyItemV1Dialog {
			this.item = item;
			let _itemBase = new ProtoCmd.ItemBase();
			_itemBase.dwBaseID = item.itemid;
			_itemBase.dwCount = item.num;
			_itemBase.dwBinding = item.binding;
			this.ui_item.setData(_itemBase);
			// 道具ID
			let dwBaseID = '' + item.itemid;
			// 消耗货币描述
			this.lbl_coinDes.text = '' + '消耗' + LangConfig.CoinTypeDes[EnumData.CoinType[item.pricetype]];
			// 消耗货币ICON
			this.img_coinPic.skin = LangConfig.getCoinImagePicSkin(item.pricetype);
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