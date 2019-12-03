/**Created by the LayaAirIDE*/
module view.main {
	export class Main_FriendListDialog extends ui.main.Main_FriendListDialogUI {
		constructor() {
			super();
			this.setData();
		}
		public setData(): void {
			this.panel_all.vScrollBarSkin = '';
			this.vbox_friend1['sortItem'] = (items) => { };
			this.vbox_friend2['sortItem'] = (items) => { };
			this.vbox_friend3['sortItem'] = (items) => { };
			this.init_friendList();
			this.updateFriendList();
			this.addEvent();
		}
		public addEvent(): void {
			//好友展开||收起
			for (let i = 1; i < 4; i++) {
				this['btn_friend' + i].on(Laya.UIEvent.CLICK, this, () => {
					this['btn_friend' + i].selected = !this['btn_friend' + i].selected;
					this['btn_arrow' + i].selected = this['btn_friend' + i].selected;
					this.init_selected(this['btn_arrow' + i].selected, i)
				})
			}
			this.btn_close.on(Laya.UIEvent.CLICK, this, () => {
				this.close();
			})
			this.btn_search.on(Laya.UIEvent.CLICK, this, () => {
				new view.friend.FriendSearchDialog().popup()
			})
			this.btn_myApply.on(Laya.UIEvent.CLICK, this, () => {
				new view.friend.FriendApplyDialog().popup()
			})
		}
		/**
		 * 拉取关系列表
		 */
		public init_friendList(): void {
			let friendInfo = GameApp.MainPlayer.friendInfo;
			let keys = Object.keys(friendInfo);
			for (let key of keys) {
				let j = friendInfo[key].type + 1;
				this['vbox_friend' + j].removeChildren();
				let data = friendInfo[key].info
				//0好1黑2仇3所有
				let online = 0;
				for (let item of data) {
					if (item.state == 1) {
						online += 1;
					}
					let friend_UI = new view.main.Main_FriendInfoItem();
					let friendItem = new ProtoCmd.stRelationInfoBase();
					friendItem.clone(item.data);
					friend_UI.init_friendList(friendItem, parseInt(key));
					this['vbox_friend' + j].addChild(friend_UI);
				}
				this['lbl_num' + j].text = '(' + online + '/' + data.length + ')';
				this.init_InitializationPos(j);
			}
		}
		/**
       * 更新关系列表
       */
		public updateFriendList(): void {
			GameApp.LListener.on(ProtoCmd.FD_UPDATA, this, (data) => {
				this.init_friendList();
			})
		}
		/**
		 * 初始化位置
		 */
		public init_InitializationPos(index): void {
			// this['panel_friend' + index].height = this['vbox_friend' + index].height * this['vbox_friend' + index]._childs.length;
			if (index != 1) {
				let height = this['btn_friend' + (index - 1)].y + this['btn_friend' + (index - 1)].height;
				//好友列表位置
				if (this['vbox_friend' + (index - 1)].scaleY == 1) {
					this['btn_friend' + index].y = height + this['vbox_friend' + (index - 1)].height * this['vbox_friend' + (index - 1)]._childs.length;
				} else {
					this['btn_friend' + index].y = height;
				}
			}
		}
		/**
		 * 好友列表伸缩状态
		 * @param select 点击状态
		 * @param index 索引1好友2黑名单3仇人
		 */
		public init_selected(select: boolean, index): void {
			let height1 = this['btn_friend' + index].y + this['btn_friend' + index].height;
			if (select) {
				Laya.Tween.to(this['btn_arrow' + index], { rotation: 90, x: 43, y: 16 }, 300);
				Laya.Tween.to(this['vbox_friend' + index], { scaleY: 1 }, 200);
				switch (index) {
					case 1:
						this.btn_friend2.y = height1 + this.vbox_friend1.height * this.vbox_friend1._childs.length;
						let height21 = this.btn_friend2.y + this.btn_friend2.height;
						if (this.vbox_friend2.scaleY == 0) {
							this.btn_friend3.y = height21;
						} else {
							this.btn_friend3.y = height21 + this.vbox_friend2.height * this.vbox_friend2._childs.length
						}
						break;
					case 2:
						let height22 = this.btn_friend2.y + this.btn_friend2.height;
						this.btn_friend3.y = height22 + this.vbox_friend2.height * this.vbox_friend2._childs.length
						break;
				}
			}
			else {
				Laya.Tween.to(this['btn_arrow' + index], { rotation: 0, x: 17, y: 6 }, 300);
				Laya.Tween.to(this['vbox_friend' + index], { scaleY: 0 }, 200);
				switch (index) {
					case 1:
						this.btn_friend2.y = height1;
						let height31 = this.btn_friend2.y + this.btn_friend2.height;
						if (this.vbox_friend2.scaleY == 0) {
							this.btn_friend3.y = height31;
						} else {
							this.btn_friend3.y = height31 + this.vbox_friend2.height * this.vbox_friend2._childs.length
						}
						break;
					case 2:
						let height32 = this.btn_friend2.y + this.btn_friend2.height;
						this.btn_friend3.y = height32;
						break;
				}
			}
		}
	}
}