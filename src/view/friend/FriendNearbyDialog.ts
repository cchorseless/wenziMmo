/**Created by the LayaAirIDE*/
module view.friend {
	export class FriendNearbyDialog extends ui.friend.FriendNearbyDialogUI {
		constructor() {
			super();
		}
		public item: GameObject.Player;
		public setData(item: GameObject.Player): FriendNearbyDialog {
			this.item = item;
			//附近的人的昵称
			this.lbl_name.text = '' + this.item.objName;
			//附近的人的等级
			this.lbl_lvl.text = '' + this.item.level;
			
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_nearbyClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			//添加好友
			this.btn_nearbyAddFriend.on(Laya.UIEvent.CLICK, this, this.changeRelationShip, [0]);
			// 拉入黑名单   
			this.btn_nearbyIntoBlack.on(Laya.UIEvent.CLICK, this, this.changeRelationShip, [1]);
			//邀请附近的人加入队伍
			this.btn_nearbyBuildTeam.on(Laya.UIEvent.CLICK, this, () => {
				let pkt=new ProtoCmd.TeamInviteEnDecoder(null);
				pkt.setValue('szName', this.item.objName);
				pkt.setValue('dwLevel', this.item.level);
				pkt.setValue('btJob', this.item.job);
				pkt.setValue('btSex', this.item.sex);
				lcp.send(pkt, this, (data) => {
					let cbpkt = new ProtoCmd.TeamAgreeInviteEnDecoder(data);
				})
			})
		}

		/**
		 * 添加好友 || 拉入黑名单
		 * @param type 
		 */
		public changeRelationShip(type): void {
			let pkt = new ProtoCmd.stRelationAdd();
			pkt.setValue('btType', type);
			pkt.setValue('szName', this.lbl_name.text);
			lcp.send(pkt, this, (data) => {
				this.close();
				let cbpkt = new ProtoCmd.stRelationAddRet(data);
				let errorcode = cbpkt.getValue('btErrorCode');
				switch (errorcode) {
					//成功
					case EnumData.emFriendErrorCode.RELATION_SUCCESS:
						TipsManage.showTips('操作成功');
						break;
					// 好友已在列表中
					case EnumData.emFriendErrorCode.RELATION_FAIL_ALLREADY_FRIEND:
						TipsManage.showTips('对方已在好友列表中');
						break;
					//不在线
					case EnumData.emFriendErrorCode.RELATION_FAIL_NOT_ONLINE:
						TipsManage.showTips('对方不在线');
						break;
					//在黑名单中
					case EnumData.emFriendErrorCode.RELATION_FAIL_IN_BLOCK:
						TipsManage.showTips('对方已在黑名单列表中');
						break;
					//拒绝操作
					case EnumData.emFriendErrorCode.RELATION_FAIL_REFUSE:
						TipsManage.showTips('对方拒绝操作');
						break;
					//好友名单满了
					case EnumData.emFriendErrorCode.RELATION_FAIL_FRIENDLIST_FULL:
						break;
					//黑名单满了
					case EnumData.emFriendErrorCode.RELATION_FAIL_BLOCKLIST_FULL:
						break;
					//名字错误
					case EnumData.emFriendErrorCode.RELATION_FAIL_ERRORNAME:
						break;
					//没有这个用户
					case EnumData.emFriendErrorCode.RELATION_FAIL_NO_USER:
						break;
					case EnumData.emFriendErrorCode.RELATION_FAIL_WAIT_TO_ANSWER: break;  //
					case EnumData.emFriendErrorCode.RELATION_FAIL_CLOSE_INVITE: break;  //关闭邀请
					case EnumData.emFriendErrorCode.RELATION_FAIL_NOSELF: break;  	//不能添加自己
					case EnumData.emFriendErrorCode.RELATION_FAIL_ENEMYLIST_FULL: break;  	//仇人名单满了
					case EnumData.emFriendErrorCode.RELATION_FAIL_ALLREADY_ENEMY: break;  	//已经在仇人了
					case EnumData.emFriendErrorCode.RELATION_FAIL_SERVERERROR: break;  		//系统错误
					case EnumData.emFriendErrorCode.RELATION_FAIL_NOT_FRIEND: break;  //没有这好友
					case EnumData.emFriendErrorCode.RELATION_FAIL_NOT_ENEMY: break;  //没有这敌人
					case EnumData.emFriendErrorCode.RELATION_FAIL_LOCATION_QUERY: break;   //探查令不够
					case EnumData.emFriendErrorCode.RELATION_FAIL_ENEMY_CANT_BE_FRIEND: break;  //仇人不是
					case EnumData.emFriendErrorCode.RELATION_FAIL_NEED_VERIFY: break;  		//需要验证
					case EnumData.emFriendErrorCode.RELATION_FAIL_REFUSEALL: break;  		//设置了拒绝加好友
				}
			})
		}
	}
}