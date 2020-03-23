/**Created by the LayaAirIDE*/
module view.friend {
	export class FriendInfoItem extends ui.friend.FriendInfoItemUI {
		constructor() {
			super();
			this.addEvent()
		}
		//操作类型1好友列表2附近的人3好友申请4搜索的人
		public type: number;
		public item: any;
		//好友类型0好友1黑名单2仇人3非好友类型
		public key = 3;
		/**
		 * 
		 * @param item 好友列表
		 */
		public init_friendList(item: ProtoCmd.stRelationInfoBase, key): FriendInfoItem {
			this.type = 1;
			this.item = item;
			this.key = key;
			//姓名
			this.lbl_name.text = '' + item.szName;
			//等级
			this.lbl_lvl.text = item.zslevel + '转' + item.level;
			//头像
			this.img_head.skin = LangConfig.getPlayerIconSkin(item.sex, item.job);
			//门派名称
			this.lbl_Sects.text = item.guildName;
			// let icon = SheetConfig.BaseMenPaiSheet.getInstance(null).ICON(menpaiID);
			// this.img_menpai.skin = 'image/fuben/icon_' + icon + '.png'
			this.img_menpai.visible = false;
			this.lab_roomName.text = SheetConfig.mapRoomSheet.getInstance(null).ROOMNAME(item.mapname);
			if (item.state == 0) {
				this.box_friend.gray = true;
			} else {
				this.box_friend.gray = false;
			}
			return this;
		}
		/**
		 * 
		 * @param item 附近d的人
		 */
		public init_nearbyPerson(item: GameObject.OtherPlayer): FriendInfoItem {
			this.type = 2;
			this.item = item;
			//姓名
			this.lbl_name.text = '' + item.objName;
			//等级
			this.lbl_lvl.text = item.zslevel + '转' + item.level;
			//头像
			this.img_head.skin = LangConfig.getPlayerIconSkin(item.sex, item.job)
			//门派名称
			if (item.feature.dwClanId == 0) {
				this.lbl_Sects.text = '无门无派';
			} else {
				// this.lbl_Sects.text=SheetConfig.BaseMenPaiSheet.getInstance(null).NAME(''+item.feature.dwClanId);
			}
			return this;
		}
		/**
	  * 
	  * @param item 搜索的人
	  */
		public init_Search(item: ProtoCmd.stFindResultBase): FriendInfoItem {
			this.type = 4;
			this.item = item;
			//姓名
			this.lbl_name.text = '' + item.szName;
			//等级
			this.lbl_lvl.text = item.zslevel + '转' + item.level;
			//头像
			this.img_head.skin = LangConfig.getPlayerIconSkin(item.sex, item.job)
			//门派名称
			if (item.guileId == 0) {
				this.lbl_Sects.text = '无门无派';
			} else {
				// this.lbl_Sects.text=SheetConfig.BaseMenPaiSheet.getInstance(null).NAME(''+item.guileId);
			}
			return this;
		}
		/**
		 * 3好友申请类型
		 */
		public init_friendApply(data: ProtoCmd.friendApply): FriendInfoItem {
			this.type = 3;
			this.item = data;
			//姓名
			this.lbl_name.text = '' + data.playerName;
			//等级
			this.lbl_lvl.text = data.zslevel + '转' + data.level;
			//头像
			this.img_head.skin = LangConfig.getPlayerIconSkin(data.sex, data.job)
			//门派名称
			if (data.guildId == 0) {
				this.lbl_Sects.text = '无门无派';
			} else {
				// this.lbl_Sects.text=SheetConfig.BaseMenPaiSheet.getInstance(null).NAME(''+item.feature.dwClanId);
			}
			return this;
		}
		public addEvent(): void {
			//操作
			this.btn_operation.on(Laya.UIEvent.CLICK, this, () => {
				if (this.item) {
					switch (this.type) {
						case 1: case 2: case 4:
							new view.friend.Friend_OperationDialog().setData(this.item, this.type, this.key).popup();
							break;
						case 3:
							new view.friend.FriendCheckDialog().setData(this.item).popup();
							break;
					}
				}
			})
		}
	}
}