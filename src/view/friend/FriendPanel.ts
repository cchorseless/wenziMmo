/**Created by the LayaAirIDE*/
module view.friend {
	export class FriendPanel extends ui.friend.FriendPanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.panel_friend00.vScrollBarSkin = '';
			this.panel_friend01.vScrollBarSkin = '';
			this.panel_friend02.vScrollBarSkin = '';
			this.vbox_friend00['sortItem'] = (items) => { };
			this.vbox_friend01['sortItem'] = (items) => { };
			this.vbox_friend02['sortItem'] = (items) => { };
			this.tab_friend.selectHandler = Laya.Handler.create(this, (index) => {
				this.vstack_friend.selectedIndex = index;
			}, null, false);
			// this.updateFriendList();
			// this.updateNearbyList();
			this.addEvent();
		}

		public addEvent(): void {
			// 返回
			this.btn_back.on(Laya.UIEvent.CLICK, this, () => { PopUpManager.Dispose(this) });
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
			// 组队
			this.btn_team.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openTeamPanel();
			})
			// NPC好感度
			// todo
			// 小说模式
			this.btn_modeChange.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});
		}
		//获得好友列表
		public updateFriendList(): void {
			this.vbox_friend00.removeChildren();
			let pkt = new ProtoCmd.stRelationGetList();
			pkt.setValue('btType', 0);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stRelationGetListRet(data);
				for (let item of cbpkt.friendlist) {
					let friend_UI = new view.compart.FriendItem();
					let friendItem = new ProtoCmd.stRelationInfoBase();
					friendItem.clone(item.data);
					// GameApp.GameEngine.friendDB
					friend_UI.setData(friendItem);
					this.vbox_friend00.addChild(friend_UI);
				}
				cbpkt.clear();
				cbpkt = null;
				// 更新黑名单
				this.updateHMDList();
			})
		}
		/**
		 * 附近人
		 */
		public updateNearbyList(): void {
			this.vbox_friend01.removeChildren();
			let allKeys = Object.keys(GameApp.MainPlayer.allPlayer);
			for (let _key of allKeys) {
				this.vbox_friend01.addChild(new view.compart.FriendNearbyItem().setData(GameApp.MainPlayer.allPlayer[_key]));
			}
		}
		/**
		 * 黑名单
		 */
		public updateHMDList(): void {

		}
	}
}