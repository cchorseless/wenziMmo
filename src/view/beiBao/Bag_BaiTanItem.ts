/**Created by the LayaAirIDE*/
module view.beiBao {
	export class Bag_BaiTanItem extends ui.beiBao.Bag_BaiTanItemUI {
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
			this.updateTanWeiProfit();
			// 自己的获取摊位信息
			this.updateTanWeiUI();
			// 获取自己摊位日志
			this.updateTanWeiLog();
		}

		// 更新界面元宝信息
		public updateTanWeiProfit(): void {
			let pkt = new ProtoCmd.stAuctionChangePage();
			pkt.setValue('btType', 4);
			pkt.setValue('nPage', 0);
			pkt.cbPacket = ProtoCmd.stAuctionProfitRet;
			lcp.send(pkt, this, (data) => {
				let cbPkt = new ProtoCmd.stAuctionProfitRet(data);
				this.lbl_shouRu.text = '' + cbPkt.profit;
				cbPkt.clear();
				cbPkt = null;
			});
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
					let tanWeiItem = new view.beiBao.Bag_BaiTanSellItem();
					let new_stAuctionItemBase = new ProtoCmd.stAuctionItemBase();
					new_stAuctionItemBase.clone(_item.data);
					tanWeiItem.setData(new_stAuctionItemBase);
					this.vbox_sell.addChild(tanWeiItem);
				}
				this.lbl_tanWeiCount.text = '' + this.vbox_sell.numChildren + '/' + SheetConfig.canshuSheet.getInstance(null).DATA('JYH_MAXIMUM_SALES')[0];
				cbPkt1.clear();
				cbPkt1 = null;
			});
		}

		/**
		 * 更新摊位购买日志
		 */
		public updateTanWeiLog(): void {
			this.vbox_sellRecord.removeChildren();
			let pkt1 = new ProtoCmd.stAuctionChangePage();
			// 临时修改返回包
			pkt1.cbPacket = ProtoCmd.stConsignSellLogRet;
			// 7是拉取日志
			pkt1.setValue('btType', 7);
			pkt1.setValue('nPage', 0);
			lcp.send(pkt1, this, (data) => {
				this.vbox_sellRecord.removeChildren();
				let cbPkt1 = new ProtoCmd.stConsignSellLogRet(data);
				let alllog = cbPkt1.logs;
				for (let _log of alllog) {
					// let logItem = new view.beiBao.Bag_BaITanLogItem();
					let logItem = new Laya.Label();
					logItem.color = "#63491a";
					logItem.font = "fzhl";
					logItem.fontSize = 22;
					logItem.align = "left";
					logItem.wordWrap = true;
					logItem.bold = true;
					logItem.width = 120;
					let box = new Laya.Box();
					let line = new Laya.Label();
					line.color = "#000000";
					line.font = "fzhl";
					line.fontSize = 22;
					line.bold = true;
					line.stroke = 2;
					line.strokeColor = "#000000";
					line.text = "-------"
					box.width = line.width = 120;
					// logItem.text = '' + TimeUtils.getFormatBySecond(_log.optime * 1000, 2) + '  ' + _log.buyerName + '购买了' + _log.itemName + ',您获得了' + _log.money + '元宝';
					logItem.text = _log.buyerName + '购买了' + _log.itemName + ',您获得了' + _log.money + '元宝';
					box.addChild(logItem)
					logItem.x = logItem.y = 0;
					line.x = 0;
					line.y = logItem.height + 3;
					box.addChild(line)

					console.log(_log.optime);

					this.vbox_sellRecord.addChild(box);
				}
				cbPkt1.clear();
				cbPkt1 = null;
			});
		}

		public addEvent(): void {
			this.btn_lingQu.on(Laya.UIEvent.CLICK, this, () => {
				if (parseInt(this.lbl_shouRu.text) === 0) {
					TipsManage.showTips('无收入，请上架物品')
					return
				}
				let pkt = new ProtoCmd.stAuctionGetProfit();
				lcp.send(pkt, this, (data) => {
					let cbPkt = new ProtoCmd.stAuctionProfitRet(data);
					this.lbl_shouRu.text = '' + cbPkt.profit;
					cbPkt.clear();
					cbPkt = null;
				})
			});
			this.btn_jiaoYiHang.on(Laya.UIEvent.CLICK, this, () => {
				// PanelManage.BeiBao.showJiaoYiHang();
				let o = new Bag_AuctioneerDialog();
				o.setData();
				o.popup();

			});
		}
	}
}