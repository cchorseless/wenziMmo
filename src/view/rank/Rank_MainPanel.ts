/**Created by the LayaAirIDE*/
module view.rank {
	export class Rank_MainPanel extends ui.rank.Rank_MainPanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.panel_top.hScrollBarSkin = '';
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
			}, null, false);
			this.panel_0.vScrollBarSkin = '';
			this.vbox_0['sortItem'] = (items) => { };
			this.panel_1.vScrollBarSkin = '';
			this.vbox_1['sortItem'] = (items) => { };
			this.panel_2.vScrollBarSkin = '';
			this.vbox_2['sortItem'] = (items) => { };
			this.panel_3.vScrollBarSkin = '';
			this.vbox_3['sortItem'] = (items) => { };
			this.panel_4.vScrollBarSkin = '';
			this.vbox_4['sortItem'] = (items) => { };
			this.panel_5.vScrollBarSkin = '';
			this.vbox_5['sortItem'] = (items) => { };
			this.panel_6.vScrollBarSkin = '';
			this.vbox_6['sortItem'] = (items) => { };
			this.panel_7.vScrollBarSkin = '';
			this.vbox_7['sortItem'] = (items) => { };
			// for (let i = 0; i < 15; i++) {
			// 	this.vbox_0.addChild(new view.compart.RankPlayerItem())
			// 	this.vbox_1.addChild(new view.compart.RankPlayerItem())
			// 	this.vbox_2.addChild(new view.compart.RankPlayerItem())
			// 	this.vbox_3.addChild(new view.compart.RankPlayerItem())
			// 	this.vbox_4.addChild(new view.compart.RankPlayerItem())
			// 	this.vbox_5.addChild(new view.compart.RankPlayerItem())
			// 	this.vbox_6.addChild(new view.compart.RankPlayerItem())
			// 	this.vbox_7.addChild(new view.compart.RankPlayerItem())
			// }
			let pkt = new ProtoCmd.stRankMsg(null);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stRankMsg(data);
				for (let item of data) {
					let ui_rank = new view.compart.RankPlayerItem();
					let TopInfos = new ProtoCmd.stRankInfo(data);
					// TopInfos.clone(item)
					this.vbox_0.addChild(ui_rank.setData(TopInfos));
				}

			})
			this.addEvent();
		}
		public addEvent(): void {
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PopUpManager.showPanel(PanelManage.JuQingMode);
			});
			EventManage.onWithEffect(this.btn_modeChange, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel();
			});

			EventManage.onWithEffect(this.btn_rank, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openRankMainPanel();
			});
			EventManage.onWithEffect(this.btn_yinDao, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openYinDaoPanel();
			});
			EventManage.onWithEffect(this.btn_zhiNan, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openZhiNanPanel();
			});
			EventManage.onWithEffect(this.btn_rankPrize, Laya.UIEvent.CLICK, this, () => {
				new view.dialog.RankPrizeInfoDialog().setData().popup(true);
			});


		}
	}
}