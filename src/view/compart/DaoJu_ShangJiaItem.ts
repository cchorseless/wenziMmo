/**Created by the LayaAirIDE*/
module view.compart {
	export class DaoJu_ShangJiaItem extends ui.compart.DaoJu_ShangJiaItemUI {
		constructor() {
			super();
		}
		public setData(data: ProtoCmd.stAuctionItemBase): DaoJu_ShangJiaItem {
			let itemInfo = new ProtoCmd.ItemBase();
			itemInfo.dwBaseID = data.dwBaseID;
			itemInfo.dwCount = data.dwCount;
			itemInfo.dwBinding = data.dwBinding;
			this.ui_item.setData(itemInfo);
			//物品名称
			this.lbl_name.text = data.szName;
			this.lbl_prize.text = '' + data.dwConsignPrice;
			return this;
		}
	}
}