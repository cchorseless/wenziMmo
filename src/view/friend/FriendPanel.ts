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
			let allKeys = Object.keys(GameApp.MainPlayer.allPlayer);
			for (let _key of allKeys) {
				this.vbox_friend01.addChild(new view.compart.FriendNearbyItem().setData(GameApp.MainPlayer.allPlayer[_key]));
				let _player = GameApp.MainPlayer.allPlayer[_key];
			}

			// this.initUI();
		}

		//获得好友列表
		public item: ProtoCmd.stRelationAddRet
		public initUI(item:ProtoCmd.stRelationAddRet): void {
			this.item=item;
			let pkt = new ProtoCmd.stRelationGetList();
			pkt.setValue('btType', 0);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stRelationGetListRet(data);
				for (let item of cbpkt.friendlist) {
					let friend_UI = new view.compart.FriendItem();
					let friendItem = new ProtoCmd.stRelationInfoBase();
					friendItem.clone(item.data);
					friend_UI.setData(friendItem);
					this.vbox_friend00.addChild(friend_UI);
				}
			})
		}
	}
}