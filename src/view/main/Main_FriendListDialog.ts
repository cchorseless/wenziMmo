/**Created by the LayaAirIDE*/
module view.main {
	export class Main_FriendListDialog extends ui.main.Main_FriendListDialogUI {
		constructor() {
			super();
			this.addEvent();
		}
		public list;
		public type;
		public setData(msg,Type): void {
			this.list=msg;
			this.type=Type;
			this.panel_all.vScrollBarSkin = '';
			this.panel_friend1.vScrollBarSkin = '';
			this.vbox_friend1['sortItem'] = (items) => { };
			this.panel_friend2.vScrollBarSkin = '';
			this.vbox_friend2['sortItem'] = (items) => { };
			this.panel_friend3.vScrollBarSkin = '';
			this.vbox_friend3['sortItem'] = (items) => { };
			for (let i = 1; i < 4; i++) {
				this['panel_friend' + i].y = this['btn_friend' + i].y + this['btn_friend' + i].height;
			}
			this.updateFriendList();
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
		}
		/**
  * 拉取关系列表
  */
		public updateFriendList(): void {
				let j = this.type + 1;
				//0好1黑2仇3所有
					let online = 0;
					for (let item of this.list.friendlist) {
						if (item.state == 1) {
							online += 1;
						}
						let friend_UI = new view.main.Main_FriendInfoItem();
						let friendItem = new ProtoCmd.stRelationInfoBase();
						friendItem.clone(item.data);
						friend_UI.init_friendList(friendItem);
						this['vbox_friend' + j].addChild(friend_UI);
					}
					this['panel_friend' + j].height = this['vbox_friend' + j].height * this['vbox_friend' + j]._childs.length;
					this['lbl_num' + j].text = '(' + online + '/' + this.list.friendlist.length + ')';
			}
		/**
		 * 好友列表伸缩状态
		 * @param select 点击状态
		 * @param index 索引1好友2黑名单3仇人
		 */
		public init_selected(select: boolean, index): void {
			if (index == 1) {
				this['panel_friend' + index].y = this['btn_friend' + index].y + this['btn_friend' + index].height;
			} else {
				if (this['panel_friend' + (index - 1)].scaleY == 1) {
					this['btn_friend' + index].y = this['panel_friend' + (index - 1)].y + this['panel_friend' + (index - 1)].height;
				} else {
					this['btn_friend' + index].y = this['btn_friend' + (index - 1)].y + this['btn_friend' + (index - 1)].height;
				}
			}
			if (select) {
				Laya.Tween.to(this['btn_arrow' + index], { rotation: 90, x: 43, y: 16 }, 300);
				Laya.Tween.to(this['panel_friend' + index], { scaleY: 1 }, 200);
				if (index < 3) {
					this['btn_friend' + (index + 1)].y = this['panel_friend' + index].y + this['panel_friend' + index].height;
					if (this['panel_friend' + index].height > 540) {
						this['btn_friend' + (index + 1)].y = 600;
					}
					if (index < 2) {
						this['btn_friend' + (index + 2)].y = this['btn_friend' + (index + 1)].y + this['btn_friend' + (index + 1)].height;
						if (this['panel_friend' + index].height > 540) {
							this['btn_friend' + (index + 2)].y = 648;
						}
					}
				}
			}
			else {
				Laya.Tween.to(this['btn_arrow' + index], { rotation: 0, x: 17, y: 6 }, 300);
				Laya.Tween.to(this['panel_friend' + index], { scaleY: 0 }, 200);
				if (index < 3) {
					this['btn_friend' + (index + 1)].y = this['btn_friend' + index].y + this['btn_friend' + index].height;
					if (index < 2) {
						this['btn_friend' + (index + 2)].y = this['btn_friend' + (index + 1)].y + this['btn_friend' + (index + 1)].height;
					}
				}
			}
		}
	}
}