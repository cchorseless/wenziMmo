/**Created by the LayaAirIDE*/
module view.compart {
	export class BaiTanSellItem extends ui.compart.BaiTanSellItemUI {
		constructor() {
			super();
		}

		public item: ProtoCmd.stAuctionItemBase;
		public setData(item: ProtoCmd.stAuctionItemBase): void {
			this.item = item;
			this.initUI(this.item);
			this.addEvent();
		}

		public initUI(item: ProtoCmd.stAuctionItemBase): void {
			// 道具名称
			this.lbl_itemName.text = item.szName;
			// 售价
			this.lbl_price.text = '' + item.dwConsignPrice;
			// 剩余时间
			this.lbl_timeLeft.text = '' + item.tLeftTime;
			// 物品ICON
			this.ui_item.setData(item, EnumData.ItemInfoModel.SHOW_IN_SHOP);
		}
		public addEvent(): void {
			// 道具下架
			this.btn_off.on(Laya.UIEvent.CLICK, this, () => {
				let pkt=new ProtoCmd.stAuctionTakeMyItem();
				// pkt.setValue()
			})
		}
	}
}