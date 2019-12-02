/**Created by the LayaAirIDE*/
module view.team {
	export class TeamPanel extends ui.team.TeamPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.btn_team.selected=true;
			this.addEvent();
			this.updateNearbyList();
			this.myTeam();

		}
		public addEvent(): void {
			// 返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openMainPanel()
			});
			// 离开队伍
			// this.btn_outTeam.on(Laya.UIEvent.CLICK, this, () => {
			// 	//判断是否是队长
			// 	let btGroupMaster = GameApp.MainPlayer.feature.btGroupMaster;
			// 	if (btGroupMaster) {

			// 	} else {
			// 		let pkt = new ProtoCmd.TeamQuitEncoder();
			// 		pkt.setValue('dwOnlyid',GameApp.MainPlayer.onlyId)
			// 		lcp.send(pkt,this,(data)=>{
			// 				let cbpkt = new ProtoCmd.TeamQuitDecoder(data);
			// 		})
			// 	}
			// });
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
			// 排行榜
			this.btn_paihang.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openRankMainPanel();
			})
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
				let pkt = new ProtoCmd.TeamInfomationDecoder();
				pkt.setValue('dwGroupId', btGroupId)
				lcp.send(pkt, this, (data) => {
					let cbpkt = new ProtoCmd.TeamInfomationDecoder(data);
					console.log('============>masterID', cbpkt.MasterId)
					//循环查询成员信息
					this.vbox_team00.removeChildren();
					for (let info of cbpkt.Members) {
						this.vbox_team00.addChild(new view.team.TeamItem().memberInfo(info, cbpkt.getValue('btMemberCount'), cbpkt.MasterId))
						console.log('============>MemberID', info.onlyid)
					}
				})
			}
			// 无队伍
			else {
				//创建队伍
				this.btn_buildTeam.on(Laya.UIEvent.CLICK, this, () => {
					let pkt = new ProtoCmd.TeamBuildEncoder();
					lcp.send(pkt, this, (data) => {
						let cbpkt = new ProtoCmd.TeamBuildDecoder(data);
						this.vbox_team00.addChild(new view.team.TeamItem().setData(GameApp.MainPlayer))
					})
				})
			}
		}
		/**
		 * 附近的人，与好友中附近的人共用一个item
		 */
		public updateNearbyList(): void {
			// this.vbox_team02.removeChildren();
			// let allKeys = Object.keys(GameApp.MainPlayer.allPlayer);
			// let groupIds = {}
			// for (let _key of allKeys) {
			// 	this.vbox_team02.addChild(new view.compart.FriendNearbyItem().setNearbyPlayerInfo(GameApp.MainPlayer.allPlayer[_key]));
			// 	//通过附近的人获取其队伍ID
			// 	let id = GameApp.MainPlayer.allPlayer[_key].feature.btGroupId;
			// 	if (id && !groupIds[id]) {
			// 		groupIds[id] = id;
			// 	}
		}
		//附近队伍
		// 通过队伍ID获取队长信息
		// let pkt = new ProtoCmd.TeamInfomationDecoder();
		// for (let a in groupIds) {
		// 	pkt.setValue('dwGroupId', a);
		// 	lcp.send(pkt, this, (data) => {
		// 		let cbpkt = new ProtoCmd.TeamInfomationDecoder(data);
		// 		for (let member of cbpkt.Members) {
		// 			let onlyId: ProtoCmd.Int64 = member.getValue('dwOnlyId');
		// 			let masterId: ProtoCmd.Int64 = cbpkt.getValue('dwMasterId');
		// 			if (onlyId.id == masterId.id) {
		// 				this.vbox_team01.addChild(new view.compart.TeamNearbyItem().setData(member, cbpkt.getValue('btMemberCount')));

		// }
		// }
		// })
		// }
		// }
	}
}