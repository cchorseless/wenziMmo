/**Created by the LayaAirIDE*/
module view.beiBao {
	export class Bag_BaiTanBuyItem extends ui.beiBao.Bag_BaiTanBuyItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.stAuctionItemBase;

		public setData(item: ProtoCmd.stAuctionItemBase): void {
			this.item = item;
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
					color = "#cfd7f5";
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
			this.lbl_itemName.text = '' + this.item.szName;
			this.lbl_leftTime.text = '' + TimeUtils.getFormatBySecond(this.item.overTime - new Date().getTime() / 1000, 7);
			// 等级
			if (item.dwZSLevel == null || item.dwZSLevel == 0) {
				this.lbl_level.text = '' + item.dwWearLevel + '级';
			}
			else {
				this.lbl_level.text = '' + item.dwZSLevel + '转' + item.dwWearLevel + '级';
			}
			// 价格
			this.lbl_price.text = '' + item.dwConsignPrice;
			// ui
			this.ui_item.setData(item, EnumData.ItemInfoModel.SHOW_IN_MAIL)
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_buy.on(Laya.UIEvent.CLICK, this, this.buySomeThing)
		}

		public buySomeThing(): void {
			// 检查货币数量
			let price = this.item.dwConsignPrice;
			if (GameApp.MainPlayer.wealth.yuanBao < price) {
				TipsManage.showTips('元宝不足，无法购买');
				return
			}
			// 元宝消耗确认框
			let sureHander = Laya.Handler.create(this, () => {
				let pkt = new ProtoCmd.stAuctionBuyItem();
				pkt.dwIndex = this.item.dwIndex;
				lcp.send(pkt);
			});
			new view.dialog.SureOrCanelDialog().setData('确定花费' + price + '元宝购买该道具吗？', sureHander).popup(true);
		}


	}
}