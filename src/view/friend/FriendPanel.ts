/**Created by the LayaAirIDE*/
module view.friend {
	export class FriendPanel extends ui.friend.FriendPanelUI {
		constructor() {
			super();
		}

		public setData(): void {
			this.panel_friend0.vScrollBarSkin = '';
			this.panel_friend1.vScrollBarSkin = '';
			this.panel_friend2.vScrollBarSkin = '';
			this.vbox_friend0['sortItem'] = (items) => { };
			this.vbox_friend1['sortItem'] = (items) => { };
			this.vbox_friend2['sortItem'] = (items) => { };
			this.panel_apply.vScrollBarSkin = '';
			this.panel_findPlayer.vScrollBarSkin = '';
			this.panel_nearby.vScrollBarSkin = '';
			this.vbox_apply['sortItem'] = (items) => { };
			this.vbox_nearby['sortItem'] = (items) => { };
			this.vbox_findPlayer['sortItem'] = (items) => { };
			// 附近的人tab
			this.tab_1.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_1.selectedIndex = index;
			}, null, false);
			// 我的好友tab
			this.tab_0.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_0.selectedIndex = index;
				this.updateFriendList(index);
			}, null, false);
			// 界面底部tab
			this.tab_bottom.selectHandler = Laya.Handler.create(this, (index) => {
				this.viw_bottom.selectedIndex = index;
			}, null, false);
			this.updateFriendList();
			this.updateNearbyList();
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
			// NPC好感度
			// todo
			// 小说模式
			this.btn_modeChange.on(Laya.UIEvent.CLICK, this, () => {
				PanelManage.openJuQingModePanel();
			});
			// 查找好友
			this.btn_findPlayer.on(Laya.UIEvent.CLICK, this, this.findPlayer);
		}
		/**
		 * 拉取关系列表
		 */
		public updateFriendList(index = 0): void {
			let vbox: Laya.VBox = this['vbox_friend' + index];
			if (vbox.numChildren > 0) {
				return
			}
			let pkt = new ProtoCmd.stRelationGetList();
			// 0 好友 1 黑名单 2 仇人
			pkt.setValue('btType', index);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stRelationGetListRet(data);
				for (let item of cbpkt.friendlist) {
					let friend_UI = new view.compart.FriendInfoItem();
					let friendItem = new ProtoCmd.stRelationInfoBase();
					friendItem.clone(item.data);
					friend_UI.setData(friendItem);
					vbox.addChild(friend_UI);
				}
				cbpkt.clear();
				cbpkt = null;
			})
		}

		/**
		 * 附近人
		 */
		public updateNearbyList(): void {
			this.vbox_nearby.removeChildren();
			let allKeys = Object.keys(GameApp.MainPlayer.allPlayer);
			for (let _key of allKeys) {
				this.vbox_nearby.addChild(new view.compart.FriendNearbyItem().setNearbyPlayerInfo(GameApp.MainPlayer.allPlayer[_key]));
			}
		}

		/**
		 * 查找好友
		 */
		public findPlayer(): void {
			if (this.input_playName.text.length == 0) {
				TipsManage.showTips('请输入查找名字');
				return
			}
			let pkt = new ProtoCmd.stRelationSearchFriend();
			pkt.setValue('szName', this.input_playName.text);
			lcp.send(pkt, this, (data) => {
				this.vbox_findPlayer.removeChildren();
				let cbpkt = new ProtoCmd.stRelationSearchFriendRet(data);
				for (let _item of cbpkt.results) {
					let ui_item = new view.compart.FriendNearbyItem();
					let itemInfo = new ProtoCmd.stFindResultBase();
					itemInfo.clone(_item.data);
					ui_item.setFindPlayerInfo(itemInfo);
					this.vbox_findPlayer.addChild(ui_item);
				}
				cbpkt.clear();
				cbpkt = null;
			})
		}
	}
}