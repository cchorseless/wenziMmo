/**Created by the LayaAirIDE*/
module view.rank {
	export class RankPrizeInfoDialog extends ui.rank.RankPrizeInfoDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): RankPrizeInfoDialog {
			this.panel_0.vScrollBarSkin = '';
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_0.selectedIndex = index;
				this.RankGetItem();
			}, null, false);
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
			this.panel_8.vScrollBarSkin = '';
			this.vbox_8['sortItem'] = (items) => { };
			this.addEvent();
			this.RankGetItem();
			return this
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}
		public RankGetItem(): void {
			let rankMsg = this.tab_0.selectedIndex;
			let btType;
			let ui_rank_box;
			switch (rankMsg) {
				//等级榜
				case 0:
					btType = EnumData.emRankType.Cret_Level_Rank;
					ui_rank_box = this.vbox_1;
					break;
				//战力榜
				case 1:
					btType = EnumData.emRankType.Cret_EquipScore_Rank;

					ui_rank_box = this.vbox_2;
					break;
				//英雄战力榜
				case 2:
					btType = EnumData.emRankType.Cret_Hero_Warrior_Score_Rank;

					ui_rank_box = this.vbox_3;
					break;
				//勋章榜
				case 3:
					btType = EnumData.emRankType.Cret_Medal_Rank;

					ui_rank_box = this.vbox_4;
					break;
				//官印榜
				case 4:
					btType = EnumData.emRankType.Cret_GuanZhiLv_Rank;

					ui_rank_box = this.vbox_5;
					break;
				//龙魂榜
				case 5:
					btType = EnumData.emRankType.Cret_LongHunLv_Rank;


					ui_rank_box = this.vbox_6;
					break;
				//强化榜
				case 6:
					btType = EnumData.emRankType.Cret_Intensify_Rank;
					ui_rank_box = this.vbox_7;
					break;
				//威望榜
				case 7:
					btType = EnumData.emRankType.Cret_Fame_Rank;

					ui_rank_box = this.vbox_8;
					break;
			}
			
		}
	}
}