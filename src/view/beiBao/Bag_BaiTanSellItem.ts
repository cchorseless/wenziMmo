/**Created by the LayaAirIDE*/
module view.beiBao {
	export class Bag_BaiTanSellItem extends ui.beiBao.Bag_BaiTanSellItemUI {
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
			let color = "";
			let itemquality = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMQUALITY(item.dwBaseID.toString());
			switch (itemquality) {
				case 0:
					color = "#ffffff";
					break;
				case 1:
					color = "#b5e9c9";
					break;
				case 2:
					color = "#bfd7f5";
					break;
				case 3:
					color = "#c6a5eb";
					break;
				case 4:
					color = "#f57b7b";
					break;
				case 6:
					color = "#f5dd7b";
					break;
			}
			this.lbl_itemName.color = color;
			// 售价
			this.lbl_price.text = '' + item.dwConsignPrice;
			// 剩余时间
			let leftsec = TimeUtils.getFormatBySecond(item.overTime - new Date().getTime() / 1000, 7);
			this.lbl_timeLeft.text = leftsec;
			// 物品ICON
			this.ui_item.setData(item, EnumData.ItemInfoModel.SHOW_IN_MAIL);
		}
		public addEvent(): void {
			// 道具下架
			this.btn_off.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.stAuctionTakeMyItem();
				pkt.setValue('dwIndex', this.item.dwIndex);
				pkt.setValue('btType', 3);
				lcp.send(pkt, this, (data) => {
					let cbpkt = new ProtoCmd.stStallRet(data);
					if (cbpkt.result === 1) {
						// TipsManage.showTips('下架成功');
						PanelManage.BeiBao && PanelManage.BeiBao.updateTanWei();
					}
					else {
						TipsManage.showTips('下架失败');
					}
					cbpkt.clear();
					cbpkt = null;
				})

			})
		}
	}
}