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
			EventManage.onWithEffect(this.box_rankPrize, Laya.UIEvent.CLICK, this, () => {
				new view.dialog.RankPrizeInfoDialog().setData().popup(true);
			});


		}
	}
}