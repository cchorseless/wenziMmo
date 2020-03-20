/**Created by the LayaAirIDE*/
module view.rank {
	export class RankPrizeInfoDialog extends ui.rank.RankPrizeInfoDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): RankPrizeInfoDialog {
			this.panel_0.hScrollBarSkin = '';
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
					btType = 8;
					ui_rank_box = this.vbox_1;
					break;
				//战力榜
				case 1:
					btType = 1;
					ui_rank_box = this.vbox_2;
					break;
				//英雄战力榜
				case 2:
					btType = 2;
					ui_rank_box = this.vbox_3;
					break;
				//勋章榜
				case 3:
					btType = 3;
					ui_rank_box = this.vbox_4;
					break;
				//官印榜
				case 4:
					btType = 4;
					ui_rank_box = this.vbox_5;
					break;
				//龙魂榜
				case 5:
					btType = 5;
					ui_rank_box = this.vbox_6;
					break;
				//强化榜
				case 6:
					btType = 6;
					ui_rank_box = this.vbox_7;
					break;
				//威望榜
				case 7:
					btType = 7;
					ui_rank_box = this.vbox_8;
					break;
			}
			let rankData=GameConfigFunc.GETALLDATA(btType);
			let keys=Object.keys(rankData);
			ui_rank_box.removeChildren();
			for(let key of keys){
				ui_rank_box.addChild(new view.rank.RankGetItem().setData(rankData[key]));
			}
		}
	}
}