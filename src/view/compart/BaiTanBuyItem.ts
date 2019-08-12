/**Created by the LayaAirIDE*/
module view.compart {
	export class BaiTanBuyItem extends ui.compart.BaiTanBuyItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.stAuctionItemBase;

		public setData(item: ProtoCmd.stAuctionItemBase): void {
			this.item = item;
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
			this.ui_item.setData(item, EnumData.ItemInfoModel.SHOW_IN_SHOP)
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
			new view.dialog.SureOrCanelDialog().setData('确定花费' + price + '元宝购买该道具吗？', EnumData.SureCanelModel.JYH_BUY_ITEM, this.item).popup(true);
		}


	}
}