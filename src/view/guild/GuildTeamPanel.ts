/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildTeamPanel extends ui.guild.GuildTeamPanelUI {
		constructor() {
			super();
		}
		public bp_id;//帮派ID
		public setData(dwClanId): void {
			this.bp_id = dwClanId;
			this.panel_get.vScrollBarSkin = '';
			this.vbox_get['sortItem'] = (items) => { };
			this.tab_team.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_team.selectedIndex = index;
			}, null, false);
			this.initUI();
			this.addEvent();
		}

		public addEvent(): void {
			//入会设定
			this.img_guildIntoSet.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openGuildIntoConditionPanel();

			})
			//帮会实力排行
			this.img_guildRank.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openGuildRankPanel();
			})
			//帮会日志
			this.img_guildRecord.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openGuildRecordPanel();
			})
			//入帮申请
			this.img_guildApply.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openGuildApplyPanel();
			})
			//帮会福利
			this.img_guildFuliEnter.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openGuildFuliPanel();
			})
			//帮会仓库
			this.img_guildStoreEnter.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openGuildStorePanel();
			})
			//帮会支援
			this.img_guildHelpEnter.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openGuildHelpPanel();
			})
			//帮会成员
			this.btn_guildMember.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openGuildMemberPanel();
			})
			//帮会商店
			this.img_guildShopEnter.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openGuildShopPanel();
			})
			//帮会捐赠弹窗
			this.btn_donate.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.GuildDonateDialog().popup(true);
			})
			//帮会Buff弹窗
			this.box_guildBuff.on(Laya.UIEvent.CLICK, this, () => {
				new view.dialog.GuildBuffDialog().popup(true);
			})
			//帮会宝箱物品奖励
			this.img_baoxiang00.on(Laya.Event.MOUSE_DOWN, this, () => {
				new view.dialog.GuildBaoxiangDialog().show();
			})
		}

		public initUI(): void {   
			// 行会信息
			let pkt = new ProtoCmd.stGlobalGuildCurGuildInfo();
			pkt.setValue('dwGuildId', this.bp_id);
			pkt.setValue('btType', 0);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stGlobalGuildCurGuildInfoRet(data);
				let singleGuildinfo = cbpkt.singleGuildinfo;
				GameApp.MainPlayer.guildInfo.clone(singleGuildinfo.data);
				// 更新UI
				// 行会等级
				let guildLv = singleGuildinfo.dwLevel;
				this.lbl_guidlLv.text = 'Lv.' + guildLv;
				// 行会名字
				this.lbl_guildName.text = '' + singleGuildinfo.szName;
				// 行会经验/资金
				this.lbl_guildExp.text = '' + singleGuildinfo.dwCurExp + '/' + singleGuildinfo.dwLevelUpExp;
				// 帮主名字
				this.lbl_masterName.text = '' + singleGuildinfo.masterName;
				// 帮主职业
				this.lbl_masterJob.text = ['战士', '法师', '道士'][singleGuildinfo.btMasterJob]
				// 行会人数上限
				let countRoof = singleGuildinfo.dwMaxPlayerCount;
				// 行会当前人员数量
				let nowCount = singleGuildinfo.curPlayerCount;
				this.lbl_playerCount.text = '' + nowCount + '/' + countRoof;
				// 公会公告
				this.lbl_bpNotice.text = '' + singleGuildinfo.szNotice;
				// 招賢公告
				this.lbl_wantedNotice.text = '' + singleGuildinfo.szJoinNotice;
				cbpkt.clear();
				cbpkt = null;
			});
			// 行会内自己的信息
			let pkt1 = new ProtoCmd.stGlobalGuildSelfInfo();
			lcp.send(pkt1, this, (data) => {
				let cbpkt1 = new ProtoCmd.stGlobalGuildSelfInfoRet(data);
				let stPlayerInfo = cbpkt1.stPlayerInfo;
				let guildInfo: ProtoCmd.stSingleGuildinfoBase = GameApp.MainPlayer.guildInfo;
				// 同步数据
				// 公会职位
				guildInfo.playerGuildPowerLvl = stPlayerInfo.dwGuildPowerLvl;
				// 每日贡献
				guildInfo.playerDayGuildDedication = stPlayerInfo.dwDayGuildDedication;
				// 公会贡献
				guildInfo.playerGuildDedication = stPlayerInfo.dwGuildDedication;
				// 公会排名
				guildInfo.playerRank = stPlayerInfo.dwRank;
				// 公会内别称
				guildInfo.playerszAliaName = stPlayerInfo.szAliaName;
				// 更新UI
				// 行会职位
				this.lbl_zhiWei.text = ['成员', '长老', '副帮主', '帮主', '精英', '大将'][stPlayerInfo.dwGuildPowerLvl];
				// 行会贡献
				this.lbl_gongXian.text = '' + stPlayerInfo.dwGuildDedication;
				cbpkt1.clear();
				cbpkt1 = null;
			})

		}


	}
}