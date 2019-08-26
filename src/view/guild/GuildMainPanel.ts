/**Created by the LayaAirIDE*/
module view.guild {
	export class GuildMainPanel extends ui.guild.GuildMainPanelUI {
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
			// 添加属性监听事件
			this.addLcpEvent();
			//入会设定
			this.img_guildIntoSet.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openGuildIntoConditionPanel();
			})
			// 外交界面
			this.btn_relationManage.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openGuildWaiJiaoPanel();
			});
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
			// for (let i = 0; i < 4; i++) {
			// 	this['btn_baoxiang' + i].on(Laya.Event.MOUSE_DOWN, this, () => {

			// 		new view.dialog.GuildBaoxiangDialog().show();
			// 	});
			// 	this['btn_baoxiang' + i].on(Laya.Event.MOUSE_UP, this, () => {
			// 		Laya.Dialog.closeByGroup('GuildBaoxiangDialog');
			// 	});
			// }

			// 返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => { PopUpManager.Dispose(this) });
			// 队伍
			this.btn_team.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTeamPanel();
			})
			// 好友
			this.btn_friend.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openFriendPanel();
			})
			// NPC好感度
			// todo
			// 小说模式
			this.btn_modeChange.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});
		}

		public addLcpEvent(): void {
			// 更新公会贡献
			GameApp.LListener.on(LcpEvent.UPDATE_UI_GUILDSCORE, this, () => { this.lbl_gongXian.text = '' + GameApp.MainPlayer.wealth.guildDedication });
		}

		public Dispose(): void {
			GameApp.LListener.offCaller(LcpEvent.UPDATE_UI_GUILDSCORE, this);
			PopUpManager.Dispose(this);
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
				// 行会等级排名
				this.lbl_guildRank.text = '' + singleGuildinfo.dwRank;
				// 行会人数上限
				let countRoof = singleGuildinfo.dwMaxPlayerCount;
				// 行会当前人员数量
				let nowCount = singleGuildinfo.curPlayerCount;
				this.lbl_playerCount.text = '' + nowCount + '/' + countRoof;
				// 公会公告
				this.lbl_bpNotice.text = '' + singleGuildinfo.szNotice;
				// 招賢公告
				this.lbl_wantedNotice.text = '' + singleGuildinfo.szJoinNotice;
				// 会长名字
				this.lbl_masterName.text = '' + singleGuildinfo.masterName;
				this.lbl_mastername.text = '' + singleGuildinfo.masterName;
				cbpkt.clear();
				cbpkt = null;
				// 更新行会会长信息
				// 行会内会长的信息
				let pkt2 = new ProtoCmd.stGlobalGuildSelfInfo();
				pkt2.setValue('szName', this.lbl_masterName.text);
				lcp.send(pkt2, this, (data) => {
					let cbpkt2 = new ProtoCmd.stGlobalGuildSelfInfoRet(data);
					let stPlayerInfo = cbpkt2.stPlayerInfo;
					// 更新UI
					// 会长等级
					let lvdes = '' + stPlayerInfo.dwLevel;
					if (stPlayerInfo.zsLevel > 0) {
						lvdes = '' + stPlayerInfo.zsLevel + '转' + lvdes;
					}
					this.lbl_masterLv.text = lvdes;
					// 会长贡献
					this.lbl_masterGongXian.text = '' + stPlayerInfo.dwGuildDedication;
					// 会长VIP等级
					this.lbl_vipLv.text = 'VIP.' + stPlayerInfo.vipLevel;
					// 会长战力
					this.lbl_fight.text = '' + stPlayerInfo.dwFightNum;
					// 会长状态
					this.lbl_materState.text = stPlayerInfo.boOnline ? '在线' : '离线';
					// todo 等级排行
					// TODO 战力排行
					cbpkt2.clear();
					cbpkt2 = null;
					// 更新自己的行会信息
					this.updateSelfInfo()
				})
			});

		}

		/**
		 * 更新行会自己的信息
		 */
		public updateSelfInfo(): void {
			// 行会内自己的信息
			let pkt1 = new ProtoCmd.stGlobalGuildSelfInfo();
			pkt1.setValue('szName', GameApp.MainPlayer.objName);
			lcp.send(pkt1, this, (data) => {
				let cbpkt1 = new ProtoCmd.stGlobalGuildSelfInfoRet(data);
				let stPlayerInfo = cbpkt1.stPlayerInfo;
				let guildInfo: ProtoCmd.stSingleGuildinfoBase = GameApp.MainPlayer.guildInfo;
				// 同步数据
				// 公会职位
				guildInfo.playerGuildPowerLvl = stPlayerInfo.dwGuildPowerLvl;
				// 每日贡献
				guildInfo.playerDayGuildDedication = stPlayerInfo.dwDayGuildDedication;
				// 行会贡献
				GameApp.MainPlayer.changeGuildDedication(stPlayerInfo.dwGuildDedication);
				// 公会排名
				guildInfo.playerRank = stPlayerInfo.dwRank;
				// 公会内别称
				guildInfo.playerszAliaName = stPlayerInfo.szAliaName;
				// 更新UI
				// 行会职位
				this.lbl_zhiWei.text = ['帮会成员', '长老', '副帮主', '帮主', '精英', '大将'][stPlayerInfo.dwGuildPowerLvl];
				// 行会贡献
				this.lbl_gongXian.text = '' + stPlayerInfo.dwGuildDedication;
				cbpkt1.clear();
				cbpkt1 = null;
			})
		}

	}
}