/**Created by the LayaAirIDE*/
module view.friend {
	export class FriendBlackListDialog extends ui.friend.FriendBlackListDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			let pkt = new ProtoCmd.stRelationGetList();
			// 1 黑名单 
			pkt.setValue('btType', 1);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stRelationGetListRet(data);
				for (let item of cbpkt.friendlist) {
					// let black_UI = new view.compart.FriendBlackListItem();
					// let blackItem = new ProtoCmd.stRelationInfoBase();
					// blackItem.clone(item.data);
					// black_UI.setData(blackItem);
					// this.vbox_black.addChild(black_UI);
				}

				cbpkt.clear();
				cbpkt = null;
			})
			this.addEvent();
		}
		public addEvent(): void {
			this.btn_blackListClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
		}

	}
}