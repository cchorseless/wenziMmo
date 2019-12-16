/**Created by the LayaAirIDE*/
module view.luckDraw {
	export class LuckDraw_IntegralSingleItem extends ui.luckDraw.LuckDraw_IntegralSingleItemUI {
		constructor() {
			super();
		}
		public lable;
		public id;
		public setData(singleInfo, score, i): LuckDraw_IntegralSingleItem {
			if (i == 5) {
				let wupins = singleInfo.split('=');
				this.lable = parseInt(wupins[0].split('&')[0]);
				let itemIDs1 = wupins[0].split('&')[1];
				this.id = parseInt(itemIDs1);
				let itemnums1 = wupins[1].split('&')[0];
				let itemIDs2 = parseInt(wupins[1].split('&')[1]);
				let itemnums2 = wupins[2].split('-')[0];
				//可兑换的物品
				let itemInfos1 = new ProtoCmd.ItemBase();
				itemInfos1.dwBaseID = itemIDs1;
				itemInfos1.dwCount = itemnums1;
				this.ui_daoju.setData(itemInfos1, EnumData.ItemInfoModel.SHOW_IN_MAIL)
				//消耗的藏宝阁积分
				let itemNames2 = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + itemIDs2)
				this.lbl_use.text = '消耗' + itemnums2 + itemNames2;
				this.ui_use.visible = false;
				this.lbl_add.visible = false;
				this.lbl_dengyu.visible = false;
				if ( parseInt(score) >= parseInt(itemnums2)) {
					this.btn_exchange.visible = true;
					this.lbl_NoCondition.visible=false;
				}
				else {
					this.btn_exchange.visible = false;
					this.lbl_NoCondition.visible=true;
				}
			}
			else {
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
				let itemInfo1 = new ProtoCmd.ItemBase();
				itemInfo1.dwBaseID = itemID1;
				itemInfo1.dwCount = itemnum1;
				this.ui_daoju.setData(itemInfo1, EnumData.ItemInfoModel.SHOW_IN_MAIL)
				//消耗的物品
				let itemInfo2 = new ProtoCmd.ItemBase();
				itemInfo2.dwBaseID = itemID2;
				itemInfo2.dwCount = itemnum2;
				this.ui_use.visible = true;
				this.ui_use.setData(itemInfo2, EnumData.ItemInfoModel.SHOW_IN_MAIL)
				//消耗的藏宝阁积分
				let itemName3 = SheetConfig.mydb_item_base_tbl.getInstance(null).ITEMNAME('' + itemID3)
				this.lbl_use.text = itemnum3 + itemName3;
				let count1 = GameUtil.findItemInBag(itemID2, GameApp.GameEngine.bagItemDB)
				//判断是否满足兑换条件
				if (count1 >= parseInt(itemnum2) && parseInt(score) >= parseInt(itemnum3)) {
					this.btn_exchange.visible = true;
					this.lbl_NoCondition.visible=false;
				}
				else {
					this.btn_exchange.visible = false;
					this.lbl_NoCondition.visible=true;
				}
			}

			this.addEvent();

			return this;
		}
		public addEvent(): void {
			this.btn_exchange.on(Laya.UIEvent.CLICK, this, () => {
				this.init_exchange();
			})
		}
		/**
		 * 兑换
		 */
		public init_exchange(): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.LD_BZ_DuiHuanSys, [this.id, this.lable])
			lcp.send(pkt)
		}
	}
}