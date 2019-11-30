/**Created by the LayaAirIDE*/
module view.friend {
	export class Friend_OperationDialog extends ui.friend.Friend_OperationDialogUI {
		constructor() {
			super();
		}
		public item;
		public type;
		public name;
		public lvl;
		public job;
		public sex;
		public onlyId;
		//好友类型0好友1黑名单2仇人3非好友类型
		public key;
		public setData(item, type, key): Friend_OperationDialog {
			this.item = item;
			this.type = type;
			this.key = key;
			//type操作类型1好友列表2附近的人
			switch (type) {
				case 1:
					this.btn_friend.label = '删除好友';
					this.name = item.szName;
					//门派名称
					this.lbl_Sects.text = this.item.guildName;
					break;
				case 2:
					this.btn_friend.label = '添加好友';
					this.name = item.objName;
					//门派名称
					if (this.item.feature.dwClanId == 0) {
						this.lbl_Sects.text = '暂未加入门派';
					} else {
						// this.lbl_Sects.text=SheetConfig.BaseMenPaiSheet.getInstance(null).NAME(''+item.feature.dwClanId);
					}
					break;
			}
			//角色等级
			this.lvl = item.level;
			//角色职业
			this.job = item.job;
			//角色性别
			this.sex = item.sex;
			//角色onlyId
			this.onlyId = item.onlyId;
			//附近的人的昵称
			this.lbl_name.text = '' + this.name;
			//附近的人的等级
			this.lbl_level.text = item.zslevel + '转' + this.lvl + '级';
			//头像
			this.img_head.skin = LangConfig.getPlayerIconSkin(this.sex, this.job);
			this.addEvent();
			return this;
		}
		public addEvent(): void {
			this.btn_friendClose.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			this.btn_friend.on(Laya.UIEvent.CLICK, this, () => {
				//添加好友
				if (this.type == 2) {
					this.changeRelationShip(0);
				}
				//删除好友
				if (this.type == 1) {
					this.init_deleteFriend();
				}
			});
			// 拉入黑名单   
			this.btn_intoBlackList.on(Laya.UIEvent.CLICK, this, () => {
				this.changeRelationShip(1);
			});
			//邀请附近的人加入队伍
			this.btn_nearbyBuildTeam.on(Laya.UIEvent.CLICK, this, () => {
				this.init_addTeam();
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
				this.init_tips(errorcode);
			})
		}
		/**
		 * 删除好友
		 */
		public init_deleteFriend(): void {
			let pkt = new ProtoCmd.stRelationDelete(null);
			pkt.setValue('btType', this.key);
			pkt.setValue('dwOnlyId', this.onlyId);
			pkt.setValue('szName', this.name);
			lcp.send(pkt, this, (data) => {
				this.close();
				let cbpkt = new ProtoCmd.stRelationDeleteRet(data);
				let errorcode = cbpkt.ErrorCode;
				this.init_tips(errorcode);
			})
		}
		/**
		 * 邀请加入队伍
		 */
		public init_addTeam(): void {
			let pkt = new ProtoCmd.TeamInviteEnDecoder(null);
			pkt.setValue('szName', this.name);
			pkt.setValue('dwLevel', this.lvl);
			pkt.setValue('btJob', this.job);
			pkt.setValue('btSex', this.sex);
			lcp.send(pkt, this, (data) => {
				this.close();
				let cbpkt = new ProtoCmd.TeamAgreeInviteEnDecoder(data);
				let errorcode = cbpkt.getValue('btErrorCode');
				this.init_tips(errorcode);
			})
		}
		public init_tips(errorcode): void {
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
		}
	}
}