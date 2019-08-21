/**Created by the LayaAirIDE*/
module view.dialog {
	export class FriendNearbyDialog extends ui.dialog.FriendNearbyDialogUI {
		constructor() {
			super();
		}
		public item: GameObject.Player;
		public setData(item: GameObject.Player): FriendNearbyDialog {
			this.item = item;
			//附近的人的昵称
			this.lbl_name.text = '' + this.item.objName;
			//附近的人的等级
			this.lbl_rank.text = '' + this.item.level;
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_nearbyClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			//添加好友
			this.btn_nearbyAddFriend.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.stRelationAdd();
				pkt.setValue('btType', 0);
				pkt.setValue('szName', this.item.objName);
				lcp.send(pkt, this, (data) => {
					let cbpkt = new ProtoCmd.stRelationAddRet(data);
				})
			})
			//拉入黑名单   
			this.btn_nearbyIntoBlack.on(Laya.UIEvent.CLICK, this, () => {
				let pkt = new ProtoCmd.stRelationAdd();
				pkt.setValue('btType', 1);
				pkt.setValue('szName', this.item.objName);
				lcp.send(pkt, this, (data) => {
					let cbpkt = new ProtoCmd.stRelationAddRet(data);
				})
			})
		}
	}
}