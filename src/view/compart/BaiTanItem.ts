/**Created by the LayaAirIDE*/
module view.compart {
	export class BaiTanItem extends ui.compart.BaiTanItemUI {
		constructor() {
			super();
		}
		public hasInit = false;
		public setData(): void {
			if (this.hasInit) return;
			this.hasInit = true;
			this.initUI();
			this.addEvent();
		}

		public initUI(): void {
			this.panel_sell.vScrollBarSkin = this.panel_sellRecord.vScrollBarSkin = '';
			this.vbox_sell['sortItem'] = (items) => { };
			this.vbox_sellRecord['sortItem'] = (items) => { };
			this.vbox_sellRecord.removeChildren();
			// 元宝总收入
			let pkt = new ProtoCmd.stAuctionProfit();
			lcp.send(pkt, this, (data) => {
				let cbPkt = new ProtoCmd.stAuctionProfit(data);
				this.lbl_shouRu.text = '' + cbPkt.profit;
				cbPkt.clear();
				cbPkt = null;
			});
			// 自己的获取摊位信息
			this.updateTanWeiUI();
		}
		// 更新摊位信息
		public updateTanWeiUI(): void {
			this.vbox_sell.removeChildren();
			let pkt1 = new ProtoCmd.stAuctionChangePage();
			pkt1.setValue('btType', 3);
			pkt1.setValue('nPage', 0);
			lcp.send(pkt1, this, (data) => {
				let cbPkt1 = new ProtoCmd.stAuctionItemsRet(data);
				let allItem = cbPkt1.items;
				for (let _item of allItem) {
					let tanWeiItem = new view.compart.BaiTanSellItem();
					let new_stAuctionItemBase = new ProtoCmd.stAuctionItemBase();
					new_stAuctionItemBase.clone(_item.data);
					tanWeiItem.setData(new_stAuctionItemBase);
				}
				cbPkt1.clear();
				cbPkt1 = null;
			});
		}

		public addEvent(): void {

		}
	}
}