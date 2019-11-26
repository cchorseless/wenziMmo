/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenDailySourceItem extends ui.fuBen.FuBenDailySourceItemUI {
		constructor() {
			super();
		}
		public item: ProtoCmd.itf_FB_ZiYuanInfo;
		public setData(data: ProtoCmd.itf_FB_ZiYuanInfo): FuBenDailySourceItem {
			this.panel_ziyuan.hScrollBarSkin = '';
			this.item = data;
			//剩余副本次数
			let cout = data.leftcnt - data.caninto
			this.lbl_count.text = '' + cout;
			//副本名称
			this.lbl_name.text = '' + data.name;
			// this.lbl_detail.text = '' +;
			this.openFuBen(data.index);
			this.addEvent();
			return this;
		}
		public openFuBen(index): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_OpenNpc_CLFuben, [index], null, this, (jsonData: ProtoCmd.itf_FB_ZiYuanOneInfo) => {
				let keys = Object.keys(jsonData.jiangli);
				for (let key of keys) {
					let _itemData = new ProtoCmd.ItemBase();
					_itemData.dwBaseID = jsonData.jiangli[key].index;
					_itemData.dwCount = jsonData.jiangli[key].num;
					let _itemUI = new view.compart.DaoJuWithNameItem();
					_itemUI.setData(_itemData, EnumData.ItemInfoModel.SHOW_IN_MAIL);
					this.hbox_ziyuan.addChild(_itemUI);
				};


			})
			lcp.send(pkt);
		}

		public addEvent(): void {
			// 进入副本
			this.btn_into.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.QuestClientData();
				pkt.setString(ProtoCmd.FB_Into_CLFuben, [this.item.index]);
				lcp.send(pkt);
			})

		}
	}
}