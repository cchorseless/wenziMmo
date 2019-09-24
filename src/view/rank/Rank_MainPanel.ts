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
		public rankList(): void {
			let rankMsg = this.tab_0.selectedIndex;
			let btType;
			let ui_rank_box;
			let myLevel;
			switch (rankMsg) {
				//等级榜
				case 0:
					btType = EnumData.emRankType.Cret_Level_Rank;
					myLevel = 'dwLevel'
					ui_rank_box = this.vbox_0;
					break;
				//战力榜
				case 1:
					btType = EnumData.emRankType.Cret_EquipScore_Rank;
					myLevel = 'nEquipScore'
					this.lbl_title.text = '角色战力';
					ui_rank_box = this.vbox_1;
					break;
				//英雄战力榜
				case 2:
					btType = EnumData.emRankType.Cret_Hero_Warrior_Score_Rank;
					myLevel = 'heroPower1'
					this.lbl_title.text = '英雄战力';
					ui_rank_box = this.vbox_2;
					break;
				//勋章榜
				case 3:
					btType = EnumData.emRankType.Cret_Medal_Rank;
					myLevel = 'dwMedalRank'
					this.lbl_title.text = '勋章等级';
					ui_rank_box = this.vbox_3;
					break;
				//官印榜
				case 4:
					btType = EnumData.emRankType.Cret_GuanZhiLv_Rank;
					myLevel = 'dwGuanZhilv'
					this.lbl_title.text = '官印等级';
					ui_rank_box = this.vbox_4;
					break;
				//龙魂榜
				case 5:
					btType = EnumData.emRankType.Cret_LongHunLv_Rank;
					myLevel = 'dwLongHunlv'
					this.lbl_title.text = '龙魂等级';
					ui_rank_box = this.vbox_5;
					break;
				//强化榜
				case 6:
					btType = EnumData.emRankType.Cret_Intensify_Rank;
					myLevel = 'dwStrenTotalLvl'
					this.lbl_title.text = '强化等级';
					ui_rank_box = this.vbox_6;
					break;
				//威望榜
				case 7:
					btType = EnumData.emRankType.Cret_Fame_Rank;
					myLevel = 'dwFame'
					this.lbl_title.text = '威望等级';
					ui_rank_box = this.vbox_7;
					break;

			}
			let pkt = new ProtoCmd.stRankMsg(null);
			pkt.setValue('btErrorCode', 0);
			pkt.setValue('btType', btType);
			pkt.setValue('nPage', 1);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stRankMsg(data);
				ui_rank_box.removeChildren();
				for (let item of cbpkt.TopInfos) {
					let ui_rank = new view.compart.RankPlayerItem();
					let TopInfos = new ProtoCmd.stRankInfo(item);
					TopInfos.clone(item.data)
					ui_rank_box.addChild(ui_rank.setData(TopInfos));
				}
			})
			let mypkt = new ProtoCmd.stMyRankRequest();
			pkt.setValue('btType', btType);
			lcp.send(mypkt, this, (data) => {
				let mycbpkt = new ProtoCmd.stMyRankReturn(data);
				this.lbl_myrank.text = '' + mycbpkt.rank;
				this.lbl_mylvl.text = '' + mycbpkt.myInfo.getValue(myLevel);
			})
		}
	}
}