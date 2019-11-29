/**Created by the LayaAirIDE*/
module view.friend {
	export class FriendSearchDialog extends ui.friend.FriendSearchDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.addEvent();
			this.updateNearbyList();
		}
		public addEvent(): void {
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			// 查找好友
			this.btn_findPlayer.on(Laya.UIEvent.CLICK, this, this.findPlayer);
		}

		/**
		 * 附近人
		 */
		public updateNearbyList(): void {
			this.vbox_nearby.removeChildren();
			let allKeys = Object.keys(GameApp.MainPlayer.allPlayer);
			for (let _key of allKeys) {
				this.vbox_nearby.addChild(new view.main.Main_FriendInfoItem().init_nearbyPerson(GameApp.MainPlayer.allPlayer[_key]));
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
				this.vbox_nearby.removeChildren();
				let cbpkt = new ProtoCmd.stRelationSearchFriendRet(data);
				for (let _item of cbpkt.results) {
					// let ui_item = new view.compart.FriendTeamItem();
					// let itemInfo = new ProtoCmd.stFindResultBase();
					// itemInfo.clone(_item.data);
					// ui_item.setFindPlayerInfo(itemInfo);
					// this.vbox_nearby.addChild(ui_item);
				}
				cbpkt.clear();
				cbpkt = null;
			})
		}

	}
}