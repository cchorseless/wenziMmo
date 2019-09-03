/**Created by the LayaAirIDE*/
module view.team {
	export class TeamPanel extends ui.team.TeamPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_team01.vScrollBarSkin = '';
			this.panel_team02.vScrollBarSkin = '';
			this.vbox_team01['sortItem'] = (items) => { };
			this.vbox_team02['sortItem'] = (items) => { };
			this.tab_team.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstask_team.selectedIndex = index;
				this.myTeam();
			}, null, false);
			this.addEvent();
			this.updateNearbyList();
		}
		public addEvent(): void {
			// 返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel()
			});
			// 工会
			this.btn_guild.on(Laya.UIEvent.CLICK, this, () => {
				// 判定 有无公会
				let dwClanId = GameApp.MainPlayer.feature.dwClanId;
				// 有工会
				if (dwClanId) {
					PanelManage.openGuildTeamPanel(dwClanId);
				}
				// 无工会
				else {
					PanelManage.openGuildSelectPanel();
				}
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
		/**
		  * 我的队伍
		  */
		public myTeam(): void {
			// 判定 有无队伍
			let btGroupId = GameApp.MainPlayer.feature.btGroupId;
			// 有队伍
			if (btGroupId) {
				console.log('========================>>>>>>haveTeam', btGroupId)
				let pkt = new ProtoCmd.TeamInfomationDecoder();
				pkt.setValue('dwGroupId', btGroupId)
				lcp.send(pkt, this, (data) => {
					let cbpkt = new ProtoCmd.TeamInfomationDecoder(data);
					//循环查询成员信息
					let a;
					a.clear();
					for (let info of cbpkt.Members) {

						// this.vbox_team00.addChild(new view.compart.TeamItem().memberInfo(info))
						console.log(info);
						a.push(info)
					}
				})
			}
			// 无队伍
			else {
				console.log('===========>noneTeam')
				//创建队伍
				this.btn_buildTeam.on(Laya.UIEvent.CLICK, this, () => {
					let pkt = new ProtoCmd.TeamBuildEncoder();
					lcp.send(pkt, this, (data) => {
						let cbpkt = new ProtoCmd.TeamBuildDecoder(data);
						this.vbox_team00.addChild(new view.compart.TeamItem().setData(GameApp.MainPlayer))
					})
				})
			}
		}
		/**
		 * 附近的人，与好友中附近的人共用一个item
		 */
		public updateNearbyList(): void {
			this.vbox_team02.removeChildren();
			let allKeys = Object.keys(GameApp.MainPlayer.allPlayer);
			let groupIds = {}
			for (let _key of allKeys) {
				this.vbox_team02.addChild(new view.compart.FriendNearbyItem().setNearbyPlayerInfo(GameApp.MainPlayer.allPlayer[_key]));
				//通过附近的人获取其队伍ID
				let id = GameApp.MainPlayer.allPlayer[_key].feature.btGroupId;
				if (id && !groupIds[id]) {
					groupIds[id] = id;
				}
			}
			//附近队伍
			// 通过队伍ID获取队长信息
			let pkt = new ProtoCmd.TeamInfomationDecoder();
			for (let a in groupIds) {
				pkt.setValue('dwGroupId', a);
				lcp.send(pkt, this, (data) => {
					let cbpkt = new ProtoCmd.TeamInfomationDecoder(data);
					for (let member of cbpkt.Members) {
						let onlyId: ProtoCmd.Int64 = member.getValue('dwOnlyId');
						let masterId: ProtoCmd.Int64 = cbpkt.getValue('dwMasterId');
						console.log('=============>', onlyId.id)
						console.log('=============>', masterId.id)
						if (onlyId.id == masterId.id) {
						
							this.vbox_team01.addChild(new view.compart.TeamNearbyItem().setData(member,cbpkt.getValue('btMemberCount')));

						}
					}
				})
			}
		}
	}
}