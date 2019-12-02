/**Created by the LayaAirIDE*/
module view.main {
	export class Main_FriendInfoItem extends ui.main.Main_FriendInfoItemUI {
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
		public init_friendList(item: ProtoCmd.stRelationInfoBase, key): Main_FriendInfoItem {
			this.type = 1;
			this.item = item;
			this.key = key;
			//姓名
			this.lbl_name.text = '' + item.szName;
			//等级
			this.lbl_lvl.text = '' + item.level;
			//转生等级
			this.lbl_zslvl.text = '' + item.zslevel;
			//职业名称
			let job;
			switch (item.job) {
				case 0:
					job = '暂无';
					break;
				case 1:
					job = '隐门传人';
					break;
				case 2:
					job = '奇侠怪盗';
					break;
				case 2:
					job = '灭门孤儿';
					break;
			}
			this.lbl_jobNmae.text = job;
			//头像
			this.img_head.skin = LangConfig.getPlayerIconSkin(item.sex, item.job);
			//地点名称
			this.lbl_place.text = '' + item.mapname;
			//门派名称
			this.lbl_Sects.text = item.guildName;
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
		public init_nearbyPerson(item: GameObject.OtherPlayer): Main_FriendInfoItem {
			this.type = 2;
			this.item = item;
			//姓名
			this.lbl_name.text = '' + item.objName;
			//等级
			this.lbl_lvl.text = '' + item.level;
			//转生等级
			this.lbl_zslvl.text = '' + item.zslevel;
			//职业名称
			let job;
			switch (item.job) {
				case 0:
					job = '暂无';
					break;
				case 1:
					job = '隐门传人';
					break;
				case 2:
					job = '奇侠怪盗';
					break;
				case 2:
					job = '灭门孤儿';
					break;
			}
			this.lbl_jobNmae.text = job;
			//头像
			this.img_head.skin = LangConfig.getPlayerIconSkin(item.sex, item.job)
			//地点名称
			this.lbl_place.text = SheetConfig.mydb_mapinfo_tbl.getInstance(null).NAME('' + item.location.mapid);
			//门派名称
			if (item.feature.dwClanId == 0) {
				this.lbl_Sects.text = '暂未加入门派';
			} else {
				// this.lbl_Sects.text=SheetConfig.BaseMenPaiSheet.getInstance(null).NAME(''+item.feature.dwClanId);
			}
			return this;
		}
		/**
	  * 
	  * @param item 搜索的人
	  */
		public init_Search(item: ProtoCmd.stFindResultBase): Main_FriendInfoItem {
			this.type = 4;
			this.item = item;
			//姓名
			this.lbl_name.text = '' + item.szName;
			//等级
			this.lbl_lvl.text = '' + item.level;
			//转生等级
			this.lbl_zslvl.text = '' + item.zslevel;
			//职业名称
			let job;
			switch (item.job) {
				case 0:
					job = '暂无';
					break;
				case 1:
					job = '隐门传人';
					break;
				case 2:
					job = '奇侠怪盗';
					break;
				case 2:
					job = '灭门孤儿';
					break;
			}
			this.lbl_jobNmae.text = job;
			//头像
			this.img_head.skin = LangConfig.getPlayerIconSkin(item.sex, item.job)
			//地点名称不可见
			this.lbl_place.visible = false;
			//门派名称
			if (item.guileId == 0) {
				this.lbl_Sects.text = '暂未加入门派';
			} else {
				// this.lbl_Sects.text=SheetConfig.BaseMenPaiSheet.getInstance(null).NAME(''+item.guileId);
			}
			return this;
		}
		/**
		 * 3好友申请类型
		 */
		public init_friendApply(data: ProtoCmd.friendApply): Main_FriendInfoItem {
			this.type = 3;
			this.item = data;
			//姓名
			this.lbl_name.text = '' + data.playerName;
			//等级
			this.lbl_lvl.text = '' + data.level;
			//转生等级
			this.lbl_zslvl.text = '' + data.zslevel;
			//职业名称
			let job;
			switch (data.job) {
				case 0:
					job = '暂无';
					break;
				case 1:
					job = '隐门传人';
					break;
				case 2:
					job = '奇侠怪盗';
					break;
				case 2:
					job = '灭门孤儿';
					break;
			}
			this.lbl_jobNmae.text = job;
			//头像
			this.img_head.skin = LangConfig.getPlayerIconSkin(data.sex, data.job)
			//地点不可见
			this.lbl_place.visible = false;
			//门派名称
			if (data.guildId == 0) {
				this.lbl_Sects.text = '暂未加入门派';
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
						case 1: case 2:case 4:
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