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
			this.btn_nearbyAddFriend.on(Laya.UIEvent.CLICK, this, this.changeRelationShip, [0]);
			//拉入黑名单   
			this.btn_nearbyIntoBlack.on(Laya.UIEvent.CLICK, this, this.changeRelationShip, [1]);
		}

		/**
		 * 添加好友 || 拉入黑名单
		 * @param type 
		 */
		public changeRelationShip(type): void {
			let tips: string;
			switch (type) {
				// 好友
				case 0:
					tips = '添加好友';
					break;
				// 黑名单
				case 1:
					tips = '拉入黑名单';
					break
			}
			let pkt = new ProtoCmd.stRelationAdd();
			pkt.setValue('btType', type);
			pkt.setValue('szName', this.item.objName);
			lcp.send(pkt, this, (data) => {
				let cbpkt = new ProtoCmd.stRelationAddRet(data);
				let errorcode = cbpkt.getValue('btErrorCode');
				switch (errorcode) {
					//成功
					case EnumData.emFRIENDErrorCode.RELATION_SUCCESS:
						TipsManage.showTips(tips + '成功');
						case EnumData.emFRIENDErrorCode.RELATION_FAIL_ALLREADY_FRIEND:
						TipsManage.showTips('好友已在列表中');
				}
				// if (EnumData.emFRIENDErrorCode.RELATION_SUCCESS) {
				// 	TipsManage.showTips(tips + '成功');
				// }
				// else {
				// 	TipsManage.showTips(tips + '失败');
				// }
			})
		}
	}
}