/**Created by the LayaAirIDE*/
module view.fuBen {
	export class FuBenDailySourceItem extends ui.fuBen.FuBenDailySourceItemUI {
		constructor() {
			super();
		}
		public setData(data: ProtoCmd.itf_FB_ZiYuanInfo): FuBenDailySourceItem {
			// this.panel_ziyuan.hScrollBarSkin = '';
			//剩余副本次数
			let cout = data.leftcnt - data.caninto
			this.lbl_count.text = '' + cout;
			//副本名称
			this.lbl_name.text = '' + data.name;
			// this.lbl_detail.text = '' +;
			this.openFuBen(data.index);
			return this;
		}
		public openFuBen(index): void {
			let pkt = new ProtoCmd.QuestClientData();
			pkt.setString(ProtoCmd.FB_OpenNpc_CLFuben, [index], null, this, (jsonData: ProtoCmd.itf_FB_ZiYuanOneInfo) => {
				// //副本奖励01
				// this.ui_item0.img_item.skin = 'image/common/daoju/itemicon_' + jsonData.jiangli[1].index + '.png';
				// //副本奖励01的数量
				// this.ui_item0.lbl_count.text = '' + jsonData.jiangli[1].num + '.png';
				// //副本奖励02
				// this.ui_item1.img_item.skin = 'image/common/daoju/itemicon_' + jsonData.jiangli[2].index + '.png';
				// //副本奖励02的数量
				// this.ui_item1.lbl_count.text = '' + jsonData.jiangli[2].num + '.png';
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