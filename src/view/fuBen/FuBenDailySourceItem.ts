/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenDailySourceItem extends ui.fuBen.FuBenDailySourceItemUI {
		constructor() {
			super();
		}
		public setData(data: ProtoCmd.itf_FB_ZiYuanInfo): FuBenDailySourceItem {
			this.panel_ziyuan.hScrollBarSkin = '';
			//剩余副本次数
			let cout = data.leftcnt - data.caninto
			this.lbl_count.text = '' + cout;
			//副本名称
			this.lbl_name.text = '' + data.name;
			// this.lbl_detail.text = '' +;
			console.log('========>心魔心魔data',  data.leftcnt,data.caninto)
			this.openFuBen(data.index);
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
					_itemUI.setData(_itemData);
					this.hbox_ziyuan.addChild(_itemUI);
				};


			})
			lcp.send(pkt);
		}
	}
}