/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_IntegralSingleItem extends ui.luckDraw.LuckDraw_IntegralSingleItemUI {
		constructor() {
			super();
		}
		public lable;
		public id;
		public setData(singleInfo, score): LuckDraw_IntegralSingleItem {
			let wupin = singleInfo.split('=');
			this.lable = parseInt(wupin[0].split('&')[0]);
			let itemID1 = wupin[0].split('&')[1];
			this.id = parseInt(itemID1);
			let itemnum1 = wupin[1].split('&')[0];
			let itemID2 = parseInt(wupin[1].split('&')[1]);
			let itemnum2 = wupin[2].split('-')[0];
			let itemID3 = parseInt(wupin[2].split('-')[1]);
			let itemnum3 = wupin[3].split('+')[0];
			//可兑换的物品
			let itemInfo = new ProtoCmd.ItemBase;
			itemInfo.dwBaseID = itemID1;
			itemInfo.dwCount = itemnum1;
			this.ui_daoju.setData(itemInfo, EnumData.ItemInfoModel.SHOW_IN_MAIL)
			//可兑换物品名称
			let itemName1 = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + itemID1)
			this.lbl_name.text = '' + itemName1;
			//消耗的物品信息
			let itemName2 = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + itemID2)
			let itemName3 = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + itemID3)
			this.lbl_use.text = itemnum2 + itemName2 + '+' + itemnum3 + itemName3;
			let count1 = GameUtil.findItemInBag(itemID2, GameApp.GameEngine.bagItemDB)
			//判断是否满足兑换条件
			if (count1 >= parseInt(itemnum2) && parseInt(score) >= parseInt(itemnum3)) {
				this.btn_exchange.visible = true;
			}
			else {
				this.btn_exchange.visible = false;
			}
			this.addEvent();

			return this;
		}
		public addEvent(): void {
			this.btn_exchange.on(Laya.UIEvent.CLICK, this, () => {
				this.init_exchange();
			})
		}
		public init_exchange(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_BZ_DuiHuanSys,[this.id,this.lable])
			lcp.send(pkt)
		}
	}
}