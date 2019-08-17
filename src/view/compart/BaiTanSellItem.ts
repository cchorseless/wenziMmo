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
			this.lbl_timeLeft.text = '' + TimeUtils.getFormatBySecond(item.overTime - new Date().getTime() / 1000, 6);
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