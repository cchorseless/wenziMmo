/**Created by the LayaAirIDE*/
module view.rank {
	export class Rank_MainPanel extends ui.rank.Rank_MainPanelUI {
		constructor() {
			super();
		}
		public page = 1;
		public maxpage;
		public setData(): void {
			this.panel_top.hScrollBarSkin = '';
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
				this.rankList();
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
			this.addEvent();
			this.rankList();

		}
		public addEvent(): void {
			// 返回
			EventManage.onWithEffect(this.btn_back, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel()
			});
			// 小说模式
			EventManage.onWithEffect(this.btn_changeMode, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});
			// 队伍
			EventManage.onWithEffect(this.btn_team, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTeamPanel();
			});
			// 好友
			EventManage.onWithEffect(this.btn_friend, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFriendPanel();
			});
			// 帮会
			EventManage.onWithEffect(this.btn_guild, Laya.UIEvent.CLICK, this, () => {
				PanelManage.openGuildSelectPanel();
			});
			this.btn_nextPage.on(Laya.UIEvent.CLICK, this, () => {
				if (this.page < this.maxpage) {
					this.page = this.page + 1;
				} else {
					TipsManage.showTxt('当前页是最后一页');
				}
				this.rankList();
			})
			this.btn_lastPage.on(Laya.UIEvent.CLICK, this, () => {
				if (this.page > 1) {
					this.page = this.page - 1;
				}
				else {
					TipsManage.showTxt('当前页是第一页');
				}
				this.rankList();
			})

		}
		public rankList(): void {
			let rankMsg = this.tab_0.selectedIndex;
			let btType;
			let ui_rank_box;
			let myLevel;
			switch (rankMsg) {
				//等级榜
				case 0:
					btType = EnumData.emRankType.Cret_Level_Rank;
					myLevel = 'dwLevel';
					this.lbl_rankTitle.text = '等级';
					this.lbl_title.text = '等级';
					ui_rank_box = this.vbox_0;
					break;
				//战力榜
				case 1:
					btType = EnumData.emRankType.Cret_EquipScore_Rank;
					myLevel = 'nEquipScore';
					this.lbl_rankTitle.text = '角色战力';
					this.lbl_title.text = '角色战力';
					ui_rank_box = this.vbox_1;
					break;
				//英雄战力榜
				case 2:
					btType = EnumData.emRankType.Cret_Hero_Warrior_Score_Rank;
					myLevel = 'heroPower1';
					this.lbl_rankTitle.text = '英雄战力';
					this.lbl_title.text = '英雄战力';
					ui_rank_box = this.vbox_2;
					break;
				//勋章榜
				case 3:
					btType = EnumData.emRankType.Cret_Medal_Rank;
					myLevel = 'dwMedalRank';
					this.lbl_rankTitle.text = '勋章等级';
					this.lbl_title.text = '勋章等级';
					ui_rank_box = this.vbox_3;
					break;
				//官印榜
				case 4:
					btType = EnumData.emRankType.Cret_GuanZhiLv_Rank;
					myLevel = 'dwGuanZhilv';
					this.lbl_rankTitle.text = '官印等级';
					this.lbl_title.text = '官印等级';
					ui_rank_box = this.vbox_4;
					break;
				//龙魂榜
				case 5:
					btType = EnumData.emRankType.Cret_LongHunLv_Rank;
					myLevel = 'dwLongHunlv';
					this.lbl_rankTitle.text = '龙魂等级';
					this.lbl_title.text = '龙魂等级';
					ui_rank_box = this.vbox_5;
					break;
				//强化榜
				case 6:
					btType = EnumData.emRankType.Cret_Intensify_Rank;
					myLevel = 'dwStrenTotalLvl';
					this.lbl_rankTitle.text = '强化等级';
					this.lbl_title.text = '强化等级';
					ui_rank_box = this.vbox_6;
					break;
				//威望榜
				case 7:
					btType = EnumData.emRankType.Cret_Fame_Rank;
					myLevel = 'dwFame';
					this.lbl_rankTitle.text = '威望等级';
					this.lbl_title.text = '威望等级';
					ui_rank_box = this.vbox_7;
					break;

			}
			let pkt = new ProtoCmd.stRankMsg(null);
			pkt.setValue('btErrorCode', 0);
			pkt.setValue('btType', btType);
			pkt.setValue('nPage', this.page);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stRankMsg(data);
				this.maxpage = cbpkt.maxPage;
				this.lbl_pageCount.text=''+cbpkt.curPage;
				this.lbl_maxPage.text=''+cbpkt.maxPage;
				console.log('=====>排行排行', cbpkt)
				ui_rank_box.removeChildren();
				for (let item of cbpkt.TopInfos) {
					let ui_rank = new view.rank.RankPlayerItem();
					let TopInfos = new ProtoCmd.stRankInfo(item);
					TopInfos.clone(item.data)
					ui_rank_box.addChild(ui_rank.setData(TopInfos));
					
				}
			})
			let mypkt = new ProtoCmd.stMyRankRequest();
			pkt.setValue('btType', btType);
			lcp.send(mypkt, this, (data) => {
				let mycbpkt = new ProtoCmd.stMyRankReturn(data);
				if (mycbpkt.rank >= 0) {
					this.lbl_myrank.text = (mycbpkt.rank + 1) + '';
					this.lbl_mylvl.text = '' + mycbpkt.myInfo.getValue(myLevel);
				} else {
					this.lbl_myrank.text = '未上榜';
					this.lbl_mylvl.text = '--';
				}
			})
		}
	}
}