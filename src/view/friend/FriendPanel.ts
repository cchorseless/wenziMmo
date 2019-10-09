/**Created by the LayaAirIDE*/
module view.friend {
	export class FriendPanel extends ui.friend.FriendPanelUI {
		constructor() {
			super();
		}
		public setData(): void {
			this.panel_friend0.vScrollBarSkin = '';
			this.vbox_friend0['sortItem'] = (items) => { };
			this.updateFriendList();
			this.addEvent();
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
			});
			// 组队
			this.btn_team.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTeamPanel();
			});
			// 排行榜
			this.btn_paihang.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openRankMainPanel();
			})
			// todo
			// 小说模式
			this.btn_modeChange.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});

			//黑名单
			this.btn_black.on(Laya.UIEvent.CLICK, this, () => {
				new view.friend.FriendBlackListDialog().popup();

			});
			//好友申请
			this.btn_apply.on(Laya.UIEvent.CLICK, this, () => {
				new view.friend.FriendApplyDialog().popup();
			});
			//好友搜寻
			this.btn_search.on(Laya.UIEvent.CLICK, this, () => {
				new view.friend.FriendSearchDialog().popup();
			});
		}
		/**
		 * 拉取关系列表
		 */
		public updateFriendList(): void {
			let pkt = new ProtoCmd.stRelationGetList();
			// 0 好友 
			pkt.setValue('btType', 0);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stRelationGetListRet(data);
				for (let item of cbpkt.friendlist) {
					let friend_UI = new view.friend.FriendInfoItem();
					let friendItem = new ProtoCmd.stRelationInfoBase();
					friendItem.clone(item.data);
					friend_UI.setData(friendItem);
					this.vbox_friend0.addChild(friend_UI);
				}

				cbpkt.clear();
				cbpkt = null;
			})
		}



	}
}